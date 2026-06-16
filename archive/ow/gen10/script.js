// Modern DOM Elements and State Management
class Gen10App {
    constructor() {
        this.elements = {
            loadingScreen: document.getElementById('loadingScreen'),
            nav: document.getElementById('mainNav'),
            navLinks: document.querySelector('.nav-links'),
            hamburger: document.querySelector('.hamburger'),
            sections: document.querySelectorAll('section'),
            contactForm: document.getElementById('contactForm'),
            languageSelect: document.getElementById('languageSelect'),
            scrollIndicator: document.querySelector('.scroll-indicator')
        };
        
        this.state = {
            isLoading: true,
            currentLanguage: 'en',
            isMenuOpen: false,
            scrollY: 0
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.handleLoading();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.loadInitialLanguage();
        this.initializeAnimations();
    }
    
    setupEventListeners() {
        // Loading completion
        window.addEventListener('load', () => this.handleLoadComplete());
        
        // Navigation
        this.elements.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Mobile menu link clicks
        this.elements.navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
        
        // Language selector
        this.elements.languageSelect?.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        
        // Contact form
        this.elements.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Resize events
        window.addEventListener('resize', () => this.handleResize(), { passive: true });
        
        // Feature cards interactions
        this.setupFeatureCards();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }
    
    handleLoading() {
        // Add loading text animation
        const loadingText = document.querySelectorAll('.loading-text span');
        loadingText.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    handleLoadComplete() {
        setTimeout(() => {
            this.elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                this.elements.loadingScreen.classList.add('hidden');
                this.elements.loadingScreen.style.display = 'none';
                this.state.isLoading = false;
                this.triggerEntranceAnimations();
            }, 500);
        }, 1500);
    }
    
    triggerEntranceAnimations() {
        // Animate hero content
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            this.state.scrollY = scrollY;
            
            // Navigation background effect
            if (scrollY > 100) {
                this.elements.nav?.classList.add('scrolled');
            } else {
                this.elements.nav?.classList.remove('scrolled');
            }
            
            // Parallax effects for orbs
            this.updateParallaxElements(scrollY);
            
            // Hide scroll indicator
            if (this.elements.scrollIndicator) {
                this.elements.scrollIndicator.style.opacity = scrollY > 200 ? '0' : '1';
            }
            
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
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            orb.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.1}deg)`;
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    this.animateCounters(entry.target);
                    this.animateFeatureCards(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections and cards
        this.elements.sections.forEach(section => observer.observe(section));
        document.querySelectorAll('.fade-in, .modern-card, .glass-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateCounters(target) {
        const counters = target.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                const finalValue = counter.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/\d/g, '');
                
                let currentValue = 0;
                const increment = numericValue / 30;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        counter.textContent = numericValue + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 50);
            }
        });
    }
    
    animateFeatureCards(target) {
        const cards = target.querySelectorAll('.modern-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }
    
    setupFeatureCards() {
        const cards = document.querySelectorAll('.modern-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
            card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
            card.addEventListener('click', () => this.handleCardClick(card));
        });
    }
    
    handleCardHover(card, isEntering) {
        const icon = card.querySelector('.feature-icon');
        const accent = card.querySelector('.feature-accent');
        
        if (isEntering) {
            icon?.style.setProperty('transform', 'scale(1.1) rotate(5deg)');
            accent?.style.setProperty('opacity', '0.2');
            this.createFloatingParticles(card);
        } else {
            icon?.style.setProperty('transform', 'scale(1) rotate(0deg)');
            accent?.style.setProperty('opacity', '0.1');
        }
    }
    
    handleCardClick(card) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            width: 20px;
            height: 20px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${-size / 2}px`;
        ripple.style.top = `${-size / 2}px`;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    createFloatingParticles(card) {
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                animation: float-particle 2s ease-out forwards;
            `;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            card.style.position = 'relative';
            card.appendChild(particle);
            
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    toggleMobileMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        this.elements.hamburger?.classList.toggle('active');
        this.elements.navLinks?.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.state.isMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        if (window.innerWidth <= 768 && this.state.isMenuOpen) {
            this.state.isMenuOpen = false;
            this.elements.hamburger?.classList.remove('active');
            this.elements.navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (!href.startsWith('#')) return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        this.closeMobileMenu();
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                this.showFormSuccess();
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            this.showFormError();
            console.error('Form submission error:', error);
        })
        .finally(() => {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
    }
    
    showFormSuccess() {
        this.showNotification('Message sent successfully! 🎉', 'success');
    }
    
    showFormError() {
        this.showNotification('Failed to send message. Please try again.', 'error');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-gradient)' : 'var(--secondary-gradient)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    handleScroll() {
        // Throttled scroll handler is set up in setupScrollEffects
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.state.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
    
    handleKeyboardNavigation(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && this.state.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }
    
    // Translation System
    async loadInitialLanguage() {
        const savedLanguage = localStorage.getItem('gen10-language') || 'en';
        this.elements.languageSelect.value = savedLanguage;
        await this.changeLanguage(savedLanguage);
    }
    
    async changeLanguage(lang) {
        try {
            this.state.currentLanguage = lang;
            localStorage.setItem('gen10-language', lang);
            
            const response = await fetch(`./translations/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            
            const translations = await response.json();
            this.applyTranslations(translations);
            
            // Update language selector
            this.elements.languageSelect.value = lang;
            
            // Trigger re-animation of translated content
            this.animateTranslatedContent();
            
        } catch (error) {
            console.error('Translation error:', error);
            if (lang !== 'en') {
                await this.changeLanguage('en');
            }
        }
    }
    
    applyTranslations(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedTranslation(translations, key);
            
            if (value !== undefined) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else {
                    element.innerHTML = value;
                }
            }
        });
    }
    
    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    animateTranslatedContent() {
        const translatedElements = document.querySelectorAll('[data-i18n]');
        translatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.3s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes float-particle {
                to {
                    transform: translateY(-50px);
                    opacity: 0;
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced utility functions
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
    },
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.gen10App = new Gen10App();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Gen10 loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
        }, 0);
    });
}

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}

export { Gen10App, utils };