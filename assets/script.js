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
    const leftArrow = document.querySelector('.news-arrow-left');
    const rightArrow = document.querySelector('.news-arrow-right');

    if (scroller && leftArrow && rightArrow) {

        // Function to update arrow visibility based on scroll position
        function updateArrowVisibility() {
            const scrollLeft = scroller.scrollLeft;
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;

            // Show/hide left arrow based on scroll position
            if (scrollLeft > 10) { // Small threshold to account for floating point precision
                leftArrow.classList.add('visible');
            } else {
                leftArrow.classList.remove('visible');
            }

            // Show/hide right arrow based on scroll position
            if (scrollLeft >= maxScroll - 10) {
                rightArrow.classList.add('hidden');
            } else {
                rightArrow.classList.remove('hidden');
            }
        }

        // Initial arrow visibility check
        updateArrowVisibility();

        // Listen for scroll events to update arrow visibility
        scroller.addEventListener('scroll', updateArrowVisibility);

        // Enhanced arrow button scroll with smooth animation
        leftArrow.addEventListener('click', () => {
            const cardWidth = 340; // card width + gap
            scroller.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            const cardWidth = 340; // card width + gap
            scroller.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        // Update arrow visibility on window resize
        window.addEventListener('resize', () => {
            setTimeout(updateArrowVisibility, 100); // Small delay to ensure layout is complete
        });

        // Add keyboard navigation
        scroller.addEventListener('keydown', (e) => {
            const cardWidth = 340; // approximate card width + gap

            if (e.key === 'ArrowLeft') {
                scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
                e.preventDefault();
            }
        });

        // Enhanced touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let isDragging = false;

        scroller.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isDragging = true;
        }, { passive: true });

        scroller.addEventListener('touchmove', (e) => {
            if (isDragging) {
                touchEndX = e.changedTouches[0].screenX;
            }
        }, { passive: true });

        scroller.addEventListener('touchend', (e) => {
            if (isDragging) {
                handleSwipe();
                isDragging = false;
            }
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 80;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) < swipeThreshold) return;

            if (swipeDistance < 0) {
                // Swipe left - scroll right
                scroller.scrollBy({ left: 340, behavior: 'smooth' });
            } else {
                // Swipe right - scroll left
                scroller.scrollBy({ left: -340, behavior: 'smooth' });
            }
        }

        // Add focus management for accessibility
        leftArrow.addEventListener('focus', () => {
            leftArrow.style.outline = '2px solid var(--accent-light)';
        });

        rightArrow.addEventListener('focus', () => {
            rightArrow.style.outline = '2px solid var(--accent-light)';
        });
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