// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const dropdowns = document.querySelectorAll('.dropdown');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const languageSelect = document.getElementById('languageSelect');

// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Dropdown menu for mobile
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');

    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});


// Translation functions
async function loadTranslations(lang) {
    try {
        const response = await fetch(`./translations/${lang}.json`);
        if (!response.ok) {
            throw new Error('Failed to load translations');
        }
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading translations:', error);
        if (lang !== 'en') {
            await loadTranslations('en');
        }
    }
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            value = value[k];
            if (value === undefined) break;
        }

        if (value !== undefined) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.innerHTML = value;
            }
        }
    });
}

// Language selector functionality
function setCurrentLanguage() {
    const currentLang = document.documentElement.lang;
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
}

function checkLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languageSelect) {
        languageSelect.value = savedLang;
        loadTranslations(savedLang);
        document.documentElement.lang = savedLang;
    } else {
        setCurrentLanguage();
    }
}

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    // Set up language selector event
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            loadTranslations(newLang);
            document.documentElement.lang = newLang;
            localStorage.setItem('preferredLanguage', newLang);
        });

        // Check for saved preference or browser language
        const savedLang = localStorage.getItem('preferredLanguage');
        const browserLang = navigator.language.split('-')[0];
        const supportedLangs = ['en', 'es', 'de', 'ca'];

        if (savedLang && supportedLangs.includes(savedLang)) {
            loadTranslations(savedLang);
        } else if (supportedLangs.includes(browserLang)) {
            languageSelect.value = browserLang;
            loadTranslations(browserLang);
            document.documentElement.lang = browserLang;
        } else {
            loadTranslations('en');
        }
    } else {
        loadTranslations('en');
    }
});