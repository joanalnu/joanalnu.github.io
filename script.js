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

// Modal features
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}