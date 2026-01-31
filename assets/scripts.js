// Minimalist Research Portfolio Script

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupMobileExpandableItems();
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

function setupMobileExpandableItems() {
    // Check if device supports touch
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (isTouchDevice) {
        // Add click handlers for expandable items on touch devices
        const expandableItems = document.querySelectorAll('.research-item, .publication-item, .education-item, .recognition-item, .activity-item, .update-item');
        
        expandableItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't toggle if clicking on a link
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                // Toggle expanded state
                this.classList.toggle('expanded');
            });
            
            // Add visual indicator that item is tappable
            item.style.cursor = 'pointer';
        });
    }
}
