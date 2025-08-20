// Global openModal function for project cards
function openModal(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (!overlay) return;
    const modal = overlay.querySelector('.modal');
    overlay.classList.add('active');
    modal.classList.add('slide-in');
    modal.classList.remove('slide-out');
    setTimeout(() => {
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }, 100);
}

// Generalized modal logic for all modals

document.addEventListener('DOMContentLoaded', function() {
    // Attach close event to all modal-close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const overlay = btn.closest('.modal-overlay');
            if (!overlay) return;
            const modal = overlay.querySelector('.modal');
            modal.classList.remove('slide-in');
            modal.classList.add('slide-out');
            setTimeout(() => {
                overlay.classList.remove('active');
                modal.classList.remove('slide-out');
            }, 320);
        });
    });

    // Attach overlay click to close modal for all overlays
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('mousedown', function(e) {
            if (e.target === overlay) {
                const modal = overlay.querySelector('.modal');
                modal.classList.remove('slide-in');
                modal.classList.add('slide-out');
                setTimeout(() => {
                    overlay.classList.remove('active');
                    modal.classList.remove('slide-out');
                }, 320);
            }
        });
    });

    // Attach ESC key to close any open modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(overlay => {
                const modal = overlay.querySelector('.modal');
                modal.classList.remove('slide-in');
                modal.classList.add('slide-out');
                setTimeout(() => {
                    overlay.classList.remove('active');
                    modal.classList.remove('slide-out');
                }, 320);
            });
        }
    });
});