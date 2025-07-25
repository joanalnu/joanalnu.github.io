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
        cvImage.src = 'images/cv_first_page.png';
    }
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', updateCVImageBasedOnTheme);

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateCVImageBasedOnTheme);


// Horizontal scrolling for highlights
document.addEventListener('DOMContentLoaded', function() {
    const scroller = document.querySelector('.highlights-scroller');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const cardWidth = document.querySelector('.card').offsetWidth + 32; // card width + gap

        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        // Hide/show buttons based on scroll position
        scroller.addEventListener('scroll', () => {
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;

            if (scroller.scrollLeft <= 10) {
                scrollLeftBtn.style.opacity = '0.3';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '0.8';
                scrollLeftBtn.style.pointerEvents = 'auto';
            }

            if (scroller.scrollLeft >= maxScroll - 10) {
                scrollRightBtn.style.opacity = '0.3';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '0.8';
                scrollRightBtn.style.pointerEvents = 'auto';
            }
        });
    }
});

// adding keyboard navigation of horizontal scrolls for accessibility
document.addEventListener('keydown', (e) => {
    const scroller = document.querySelector('.highlights-scroller');
    if (!scroller) return;

    const cardWidth = document.querySelector('.card').offsetWidth + 32;

    if (e.key === 'ArrowLeft') {
        scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        e.preventDefault();
    }
});

// Add touch event handlers
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.highlights-scroller').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

document.querySelector('.highlights-scroller').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    const scroller = document.querySelector('.highlights-scroller');
    if (Math.abs(touchEndX - touchStartX) < 50) return; // Ignore small movements

    if (touchEndX < touchStartX) {
        // Swipe left
        scroller.scrollBy({ left: 300, behavior: 'smooth' });
    } else {
        // Swipe right
        scroller.scrollBy({ left: -300, behavior: 'smooth' });
    }
}