// Enhanced Theme System with 3-state cycling
class ThemeManager {
    constructor() {
        this.themes = ['auto', 'light', 'dark'];
        this.currentTheme = localStorage.getItem('theme') || 'auto';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.themeText = document.getElementById('theme-text');

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.cycleTheme());

        // Listen for system theme changes when in auto mode
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.updateThemeDisplay();
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.currentTheme = this.themes[nextIndex];

        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        const root = document.documentElement;

        if (theme === 'auto') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }

        this.updateThemeDisplay();
    }

    updateThemeDisplay() {
        const icons = {
            auto: 'fas fa-adjust',
            light: 'fas fa-sun',
            dark: 'fas fa-moon'
        };

        const texts = {
            auto: 'Auto',
            light: 'Light',
            dark: 'Dark'
        };

        this.themeIcon.className = icons[this.currentTheme];
        this.themeText.textContent = texts[this.currentTheme];
    }
}

// Enhanced navbar scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

const highlightNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavLink);
highlightNavLink(); // Initial call

// Enhanced mobile menu functionality
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.getElementById('nav-links');
let isMenuOpen = false;

mobileToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinksContainer.classList.toggle('active');

    // Animate hamburger menu
    mobileToggle.style.transform = isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    mobileToggle.innerHTML = isMenuOpen ? '✕' : '☰';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            navLinksContainer.classList.remove('active');
            mobileToggle.style.transform = 'rotate(0deg)';
            mobileToggle.innerHTML = '☰';
            isMenuOpen = false;
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.navbar')) {
        navLinksContainer.classList.remove('active');
        mobileToggle.style.transform = 'rotate(0deg)';
        mobileToggle.innerHTML = '☰';
        isMenuOpen = false;
    }
});

// Mobile Timeline Toggle Functionality
const timelineToggle = document.getElementById('timeline-toggle');
const timeline = document.getElementById('timeline');
let timelineExpanded = false;

if (timelineToggle && timeline) {
    timelineToggle.addEventListener('click', () => {
        timelineExpanded = !timelineExpanded;

        if (timelineExpanded) {
            timeline.classList.add('expanded');
            timelineToggle.classList.add('expanded');
            timelineToggle.querySelector('span').textContent = 'Hide Timeline';
        } else {
            timeline.classList.remove('expanded');
            timelineToggle.classList.remove('expanded');
            timelineToggle.querySelector('span').textContent = 'View Timeline';
        }
    });
}

// Horizontal scrolling for news
function setupHighlightsScroller() {
    const scroller = document.querySelector('.news-scroller');
    if (scroller) {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.news-scroller')) {
                const cardWidth = 320; // approximate card width + gap

                if (e.key === 'ArrowLeft') {
                    scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                    e.preventDefault();
                } else if (e.key === 'ArrowRight') {
                    scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    e.preventDefault();
                }
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        scroller.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        scroller.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            if (Math.abs(touchEndX - touchStartX) < 50) return;

            if (touchEndX < touchStartX) {
                scroller.scrollBy({ left: 300, behavior: 'smooth' });
            } else {
                scroller.scrollBy({ left: -300, behavior: 'smooth' });
            }
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .engagement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 120; // Account for navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    new ThemeManager();

    // Setup news scroller
    setupHighlightsScroller();

    // Initial highlight of nav links
    highlightNavLink();
});