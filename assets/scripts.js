// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

let currentTheme = 'auto';

function updateTheme(theme) {
    currentTheme = theme;
    
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-adjust';
        themeText.textContent = 'Auto';
    }
}

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'auto') {
        updateTheme('light');
    } else if (currentTheme === 'light') {
        updateTheme('dark');
    } else {
        updateTheme('auto');
    }
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                block: 'start'
            });
        }
    });
});

// Updates section arrow scrolling
const updatesScroller = document.querySelector('.updates-scroller');
const leftArrow = document.querySelector('.updates-arrow-left');
const rightArrow = document.querySelector('.updates-arrow-right');
if (updatesScroller && leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
        updatesScroller.scrollBy({ left: -340, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
        updatesScroller.scrollBy({ left: 340, behavior: 'smooth' });
    });
}