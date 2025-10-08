// Modern Academic Portfolio - Enhanced Interactivity
class ModernPortfolio {
    constructor() {
        this.init();
    }

    init() {
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
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            
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
            card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
            card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
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
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            transform: scale(0);
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transform = 'scale(20)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Subtle card animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    createFloatingParticles(card) {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                animation: floatParticle 2s ease-out forwards;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            card.style.position = 'relative';
            card.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        if (!themeToggle || !themeIcon || !themeText) {
            console.warn('Theme toggle elements not found');
            return;
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme;
            
            if (currentTheme === 'dark') {
                newTheme = 'light';
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light';
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else if (currentTheme === 'light') {
                newTheme = null; // Auto
                themeIcon.className = 'fas fa-adjust';
                themeText.textContent = 'Auto';
                document.documentElement.removeAttribute('data-theme');
                localStorage.removeItem('theme');
                // Apply system preference
                this.applySystemTheme();
            } else {
                // Currently auto or no theme set, switch to dark
                newTheme = 'dark';
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark';
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            
            // Animate theme transition
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    applySystemTheme() {
        // Apply system preference when in auto mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        if (!themeIcon || !themeText) {
            console.warn('Theme toggle elements not found');
            return;
        }
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark';
            } else if (savedTheme === 'light') {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light';
            }
        } else {
            // Auto mode - use system preference
            themeIcon.className = 'fas fa-adjust';
            themeText.textContent = 'Auto';
            this.applySystemTheme();
            
            // Listen for system theme changes
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    if (!localStorage.getItem('theme')) { // Only if in auto mode
                        this.applySystemTheme();
                    }
                });
            }
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinksContainer = document.getElementById('nav-links');
        
        // Mobile menu toggle functionality
        if (mobileMenuToggle && navLinksContainer) {
            // Handle mobile menu toggle
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const isActive = mobileMenuToggle.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
                
                // Update aria attributes for accessibility
                mobileMenuToggle.setAttribute('aria-expanded', isActive);
                
                // Prevent body scroll when menu is open on mobile
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = isActive ? 'hidden' : '';
                }
            });

            // Close mobile menu when clicking on a nav link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; // Restore scroll
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                const isClickInsideNav = navLinksContainer.contains(e.target) || 
                                       mobileMenuToggle.contains(e.target);
                
                if (!isClickInsideNav && navLinksContainer.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; // Restore scroll
                }
            });

            // Close mobile menu on window resize to larger screen
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; // Restore scroll
                }
            });

            // Handle escape key to close menu
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.focus(); // Return focus to toggle button
                    document.body.style.overflow = ''; // Restore scroll
                }
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });
        
        // Update active link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollY = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    setupParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
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
        
        // Add floating animation keyframes
        const style = document.createElement('style');
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
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupModals() {
        // Modal functionality
        window.openModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Animate modal appearance
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modalContent.style.transition = 'all 0.3s ease-out';
                    modalContent.style.transform = 'translateY(0)';
                    modalContent.style.opacity = '1';
                }, 10);
            }
        };
        
        window.closeModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 300);
            }
        };
        
        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                window.closeModal(modalId);
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
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
        if (element.classList.contains('animated')) return;
        element.classList.add('animated');
        
        const finalText = element.textContent;
        const number = parseInt(finalText.replace(/\D/g, ''));
        const suffix = finalText.replace(/\d/g, '');
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 30;
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
        });
    }

    handleResize() {
        // Recalculate particle positions
        const particles = document.querySelectorAll('.hero-particles div');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
        });
    }

    handleScroll() {
        // This is handled by setupScrollEffects with throttling
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
        return function() {
            const args = arguments;
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
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Modern Portfolio loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }, 0);
    });
}