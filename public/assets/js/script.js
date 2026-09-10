document.addEventListener('DOMContentLoaded', async () => {
    const basePath = document.body.dataset.basePath || "";
    await injectSharedLayout(basePath);
    initializeThemeToggle();
    const hasTagIndexSidebar = buildTagIndexSidebar();
    buildSidebarTableOfContents({ skip: hasTagIndexSidebar });
    setupTagFiltering();
});

async function injectSharedLayout(basePath) {
    const includeTargets = document.querySelectorAll('[data-include]');
    if (!includeTargets.length) {
        return;
    }

    await Promise.all(Array.from(includeTargets).map(async (target) => {
        const includeName = target.dataset.include;
        if (!includeName) {
            return;
        }
        const response = await fetch(`${basePath}${includeName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${includeName}.html`);
        }
        const template = await response.text();
        target.outerHTML = template.replace(/\{\{base\}\}/g, basePath);
    }));
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme") || (prefersDark.matches ? "dark" : "light");

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            return;
        }
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    });
}

function buildTagIndexSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const taggedEntries = Array.from(document.querySelectorAll('.entry[data-tags]'));

    if (!sidebar || sidebar.dataset.sidebarMode !== 'tag-index' || !taggedEntries.length) {
        return false;
    }

    const hasNonGeneratedBlocks = Boolean(sidebar.querySelector('.sidebar-block:not([data-generated="true"])'));
    if (hasNonGeneratedBlocks) {
        return false;
    }

    const topicMap = new Map();
    taggedEntries.forEach((entry) => {
        const tags = (entry.dataset.tags || '')
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        tags.forEach((tag) => {
            const normalized = normalizeTag(tag);
            if (!normalized) {
                return;
            }
            const current = topicMap.get(normalized);
            if (!current) {
                topicMap.set(normalized, { count: 1, label: `#${normalized}` });
                return;
            }
            current.count += 1;
        });
    });

    const topics = Array.from(topicMap.entries())
        .map(([tag, meta]) => ({ tag, ...meta }))
        .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag));

    if (topics.length) {
        const topicsHtml = topics
            .map(({ tag, count, label }) => (
                `<li><a class="tag-link" data-tag="${tag}" href="?tag=${encodeURIComponent(tag)}">${label}</a><span class="tag-count">${count}</span></li>`
            ))
            .join('');

        upsertGeneratedSidebarBlock(
            sidebar,
            'topics',
            'Topics',
            `<ul class="toc-list">${topicsHtml}</ul>`
        );
    } else {
        removeGeneratedSidebarBlock('topics');
    }

    const activeTag = normalizeTag(new URLSearchParams(window.location.search).get('tag') || '');
    const browseHtml = activeTag
        ? `<ul class="toc-list"><li><a href="index.html">Clear filter</a></li><li><a href="?tag=${encodeURIComponent(activeTag)}" aria-current="page">Current filter: #${activeTag}</a></li></ul>`
        : `<ul class="toc-list"><li><a href="index.html">All entries</a></li></ul>`;
    upsertGeneratedSidebarBlock(sidebar, 'browse', 'Browse', browseHtml, { prepend: true });

    removeGeneratedSidebarBlock('toc');
    return true;
}

function buildSidebarTableOfContents(options = {}) {
    if (options.skip) {
        removeGeneratedSidebarBlock('toc');
        return;
    }

    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (!sidebar || !mainContent) {
        return;
    }

    const headings = Array.from(mainContent.querySelectorAll('h1, h2, h3'))
        .filter((heading) => heading.textContent && heading.textContent.trim().length > 0);

    if (!headings.length) {
        removeGeneratedSidebarBlock('toc');
        return;
    }

    const usedIds = new Set();
    headings.forEach((heading, index) => {
        if (!heading.id) {
            const baseId = slugify(heading.textContent || "");
            heading.id = baseId ? `${baseId}-${index}` : `section-${index}`;
        }

        if (usedIds.has(heading.id)) {
            heading.id = `${heading.id}-${index}`;
        }
        usedIds.add(heading.id);
    });

    const tocItems = headings.map((heading) => {
        const itemClass = heading.tagName === 'H3' ? ' class="toc-subitem"' : '';
        return `<li${itemClass}><a href="#${heading.id}">${heading.textContent.trim()}</a></li>`;
    }).join('');

    upsertGeneratedSidebarBlock(
        sidebar,
        'toc',
        'On this page',
        `<ul class="toc-list">${tocItems}</ul>`,
        { prepend: true }
    );
}

function setupTagFiltering() {
    const taggedEntries = Array.from(document.querySelectorAll('[data-tags]'));
    if (!taggedEntries.length) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const activeTag = params.get('tag');
    if (!activeTag) {
        return;
    }

    const normalizedActiveTag = normalizeTag(activeTag);
    let visibleEntries = 0;

    taggedEntries.forEach((entry) => {
        const tags = (entry.dataset.tags || '')
            .split(',')
            .map((tag) => normalizeTag(tag))
            .filter(Boolean);
        const isMatch = tags.includes(normalizedActiveTag);
        entry.hidden = !isMatch;
        if (isMatch) {
            visibleEntries += 1;
        }
    });

    const tagLinks = document.querySelectorAll('[data-tag]');
    tagLinks.forEach((link) => {
        if (normalizeTag(link.dataset.tag || '') === normalizedActiveTag) {
            link.setAttribute('aria-current', 'page');
            return;
        }
        link.removeAttribute('aria-current');
    });

    const entryList = document.querySelector('.entry-list');
    if (entryList && visibleEntries === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'entry-body';
        emptyState.textContent = `No entries found for #${activeTag}.`;
        entryList.appendChild(emptyState);
    }
}

function upsertGeneratedSidebarBlock(sidebar, key, title, contentHtml, options = {}) {
    if (!sidebar) {
        return;
    }

    let block = sidebar.querySelector(`[data-generated-block="${key}"]`);
    if (!block) {
        block = document.createElement('div');
        block.className = 'sidebar-block';
        block.dataset.generated = 'true';
        block.dataset.generatedBlock = key;
        if (options.prepend) {
            sidebar.prepend(block);
        } else {
            sidebar.append(block);
        }
    }

    block.innerHTML = `<h3>${title}</h3>${contentHtml}`;
}

function removeGeneratedSidebarBlock(key) {
    const block = document.querySelector(`[data-generated-block="${key}"]`);
    if (block) {
        block.remove();
    }
}

function slugify(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function normalizeTag(value) {
    return slugify(String(value || ''));
}
