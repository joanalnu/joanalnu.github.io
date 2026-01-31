// Minimalist Research Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
});

function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Update URL without scrolling
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
}
