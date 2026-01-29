// Minimalist Research Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
});

function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
