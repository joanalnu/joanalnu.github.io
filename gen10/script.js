// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const dropdowns = document.querySelectorAll('.dropdown');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

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

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        console.log({ name, email, message });

        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Internationalization
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('en');
});

async function loadTranslations(lang) {
    try {
        const response = await fetch(`../translations/${lang}.json`);
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading translations:', error);
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
                element.textContent = value;
            }
        }
    });
}


// Language selector functionality
const languageSelect = document.getElementById('languageSelect');

// Set current language in selector
function setCurrentLanguage() {
    const currentLang = document.documentElement.lang;
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
}

// Change language
if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        loadTranslations(newLang);
        document.documentElement.lang = newLang;

        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', newLang);
    });
}

// Check for saved language preference
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkLanguagePreference();

    // automatically detect browser language
    const userLang = navigator.language.split('-')[0];
    if (['en', 'es', 'de', 'ca'].includes(userLang) && !localStorage.getItem('preferredLanguage')) {
        languageSelect.value = userLang;
        loadTranslations(userLang);
        document.documentElement.lang = userLang;
    }
});