// Intersection Observer for section animations
const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Add pulse animation to CTA button periodically
setInterval(() => {
    const cta = document.querySelector('.cta');
    if (cta) {
        cta.style.animation = 'pulse 2s infinite';
        setTimeout(() => {
            cta.style.animation = '';
        }, 2000);
    }
}, 10000);









// Function to check and set the appropriate CV image
function updateCVImageBasedOnTheme() {
    const cvImage = document.getElementById('cv-image');
    if (!cvImage) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        cvImage.src = 'images/cv_first_page_dark.png';
    } else {
        cvImage.src = 'images/cv_first_page.jpg';
    }
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', updateCVImageBasedOnTheme);

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateCVImageBasedOnTheme);