function toggleMobileNavState() {
    const a=document.querySelector("body");
    a.classList.toggle("nav--active")
}
function initBurger() {
    const a=document.querySelector(".burger");
    a.addEventListener("click",toggleMobileNavState)
}
initBurger();

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Accessibility: toggle menu with keyboard (Enter key)
document.querySelector('.hamburger-icon').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});
*/

