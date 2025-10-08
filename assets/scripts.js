// Modern Academic Portfolio - Enhanced Interactivity
class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
        // Inject shared keyframes / global styles needed by multiple components (ripple, particles, small animations)
        this.injectGlobalStyles();

        this.setupScrollEffects();
        this.setupUpdateCards();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupParticles();
        this.setupModals();
        this.setupObserver();
        this.setupUpdatesSlider();

        // Initialize theme
        this.loadTheme();

        // Setup event listeners
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        // note: scroll effects already add passive scroll listeners inside setupScrollEffects
    }

    injectGlobalStyles() {
        // Only add once
        if (document.getElementById('modern-portfolio-styles')) return;

        const style = document.createElement('style');
        style.id = 'modern-portfolio-styles';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) rotate(0deg);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-10vh) rotate(360deg);
                }
            }

            @keyframes floatParticle {
                0% {
                    opacity: 0.7;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px);
                }
            }

            /* ripple scale matches JS transform target (scale(20)) but we keep a smaller end scale in keyframes to prevent extreme layout issues */
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollY = window.scrollY || window.pageYOffset;

            // Navigation effects
            const nav = document.querySelector('.glass-nav');
            if (nav) {
                if (scrollY > 100) {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.8)';
                    nav.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.3)';
                }
            }

            // Parallax effects
            this.updateParallaxElements(scrollY);

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    updateParallaxElements(scrollY) {
        // Animate hero particles
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        // Animate cosmic background
        const cosmicBg = document.querySelector('.cosmic-bg');
        if (cosmicBg) {
            cosmicBg.style.transform = `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`;
        }
    }

    setupUpdateCards() {
        const cards = document.querySelectorAll('.update-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card, true), { passive: true });
            card.addEventListener('mouseleave', () => this.handleCardHover(card, false), { passive: true });
            card.addEventListener('click', () => this.handleCardClick(card));
        });
    }

    handleCardHover(card, isEntering) {
        const image = card.querySelector('.card-image');
        const overlay = card.querySelector('.card-overlay');
        const badge = card.querySelector('.card-badge');

        if (isEntering) {
            if (image) image.style.transform = 'scale(1.05)';
            if (overlay) overlay.style.background = 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%)';
            if (badge) badge.style.transform = 'scale(1.1)';

            // Create floating particles
            this.createFloatingParticles(card);
        } else {
            if (image) image.style.transform = 'scale(1)';
            if (overlay) overlay.style.background = 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)';
            if (badge) badge.style.transform = 'scale(1)';
        }
    }

    handleCardClick(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            width: 20px;
            height: 20px;
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
            transform: scale(0);
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;

        // Ensure the card is positioned relative so absolute ripple is placed correctly
        const computed = window.getComputedStyle(card);
        if (computed.position === 'static' || !computed.position) {
            card.style.position = 'relative';
        }
        card.appendChild(ripple);

        // Subtle card animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple && ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 700);
    }

    createFloatingParticles(card) {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-primary, #6366f1);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                animation: floatParticle 2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;

            const computed = window.getComputedStyle(card);
            if (computed.position === 'static' || !computed.position) {
                card.style.position = 'relative';
            }
            card.appendChild(particle);

            setTimeout(() => {
                if (particle && particle.parentNode) particle.parentNode.removeChild(particle);
            }, 2000);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme;

            if (currentTheme === 'dark') {
                newTheme = 'light';
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (themeText) themeText.textContent = 'Light';
            } else if (currentTheme === 'light') {
                newTheme = null; // Auto
                if (themeIcon) themeIcon.className = 'fas fa-adjust';
                if (themeText) themeText.textContent = 'Auto';
            } else {
                newTheme = 'dark';
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (themeText) themeText.textContent = 'Dark';
            }

            if (newTheme) {
                document.documentElement.setAttribute('data-theme', newTheme);
                try {
                    localStorage.setItem('theme', newTheme);
                } catch (e) {
                    // localStorage might be disabled in some environments
                    console.warn('Unable to save theme to localStorage', e);
                }
            } else {
                document.documentElement.removeAttribute('data-theme');
                try {
                    localStorage.removeItem('theme');
                } catch (e) {
                    console.warn('Unable to remove theme from localStorage', e);
                }
            }

            // Animate theme transition
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        }, { passive: true });
    }

    loadTheme() {
        let savedTheme = null;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            // ignore
        }
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (themeText) themeText.textContent = 'Dark';
            } else {
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (themeText) themeText.textContent = 'Light';
            }
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-adjust';
            if (themeText) themeText.textContent = 'Auto';
        }
    }

    setupNavigation() {
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinksContainer = document.getElementById('nav-links');

        // Mobile menu toggle functionality
        if (mobileMenuToggle && navLinksContainer) {
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenuToggle.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
            });
        }

        // Smooth scroll and close mobile menu when clicking on a nav link
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        const target = document.querySelector(href);
                        if (target) {
                            e.preventDefault();
                            const offsetTop = Math.max(0, target.offsetTop - 100);
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }

                    if (mobileMenuToggle && navLinksContainer) {
                        mobileMenuToggle.classList.remove('active');
                        navLinksContainer.classList.remove('active');
                    }
                }, { passive: false });
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenuToggle && navLinksContainer) {
                if (!mobileMenuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                }
            }
        }, { passive: true });

        // Close mobile menu on window resize to larger screen
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenuToggle && navLinksContainer) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        }, { passive: true });

        // Initialize active link based on current scroll position
        this.updateActiveNavLink();
    }

    setupParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        // Clear previously created particles to avoid duplicates on re-init
        heroParticles.innerHTML = '';

        // Create animated particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.5);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatUp ${5 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroParticles.appendChild(particle);
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        // Run once to set initial state, then update on scroll
        const refresh = () => {
            let current = '';
            const scrollY = (window.scrollY || window.pageYOffset) + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href') || '';
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        refresh();
        window.addEventListener('scroll', refresh, { passive: true });
    }

    setupModals() {
        // Modal functionality
        window.openModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'translateY(-50px)';
                    modalContent.style.opacity = '0';

                    setTimeout(() => {
                        modalContent.style.transition = 'all 0.3s ease-out';
                        modalContent.style.transform = 'translateY(0)';
                        modalContent.style.opacity = '1';
                    }, 10);
                }
            }
        };

        window.closeModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.transform = 'translateY(-50px)';
                    modalContent.style.opacity = '0';
                }

                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        };

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                if (modalId) window.closeModal(modalId);
            }
        }, { passive: true });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal[style*="display: block"], .modal[style*="display:block"]');
                if (openModal && openModal.id) {
                    window.closeModal(openModal.id);
                }
            }
        });
    }

    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate stats numbers
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => this.animateNumber(stat));
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.section, .update-card, .list-item, .stat-item');
        elementsToObserve.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    animateNumber(element) {
        if (!element || element.classList.contains('animated')) return;
        element.classList.add('animated');

        const finalText = element.textContent || '';
        const number = parseInt(finalText.replace(/\D/g, ''), 10);
        const suffix = finalText.replace(/[0-9]/g, '');

        if (isNaN(number)) return;

        let current = 0;
        const steps = 30;
        const increment = Math.max(1, number / steps);
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = number + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    }

    setupUpdatesSlider() {
        const leftArrow = document.querySelector('.updates-arrow-left');
        const rightArrow = document.querySelector('.updates-arrow-right');
        const scroller = document.querySelector('.updates-scroller');

        if (!leftArrow || !rightArrow || !scroller) return;

        leftArrow.addEventListener('click', () => {
            scroller.scrollBy({
                left: -420,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            scroller.scrollBy({
                left: 420,
                behavior: 'smooth'
            });
        });

        // Auto-hide arrows based on scroll position
        scroller.addEventListener('scroll', () => {
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;
            leftArrow.style.opacity = scroller.scrollLeft > 0 ? '1' : '0.5';
            rightArrow.style.opacity = scroller.scrollLeft < maxScroll ? '1' : '0.5';
        }, { passive: true });
    }

    handleResize() {
        // Recalculate particle positions
        const particles = document.querySelectorAll('.hero-particles div');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
        });
    }

    handleScroll() {
        // This is handled by setupScrollEffects with throttling; kept for API completeness
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernPortfolio();
});

// Add some utility functions for enhanced interactivity
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Performance monitoring
if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfEntries = performance.getEntriesByType('navigation');
            const perfData = perfEntries && perfEntries[0];
            if (perfData && typeof perfData.loadEventEnd === 'number' && typeof perfData.loadEventStart === 'number') {
                console.log(`Modern Portfolio loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
            }
        }, 0);
    });
}
