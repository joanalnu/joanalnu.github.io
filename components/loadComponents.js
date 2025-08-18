// Load nav
fetch('components/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-container').innerHTML = data;
        setupBurgerMenu();
    });

// Load footer
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });

// Burger menu toggle
function setupBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navSocials = document.querySelector('.nav-socials');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        navSocials.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".navbar-links");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});





const navbarLogo = document.querySelector(".navbar-logo");

function updateLogoColor() {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    // Simple brightness detection
    const rgb = bgColor.match(/\d+/g).map(Number);
    const brightness = (rgb[0]*299 + rgb[1]*587 + rgb[2]*114) / 1000;

    navbarLogo.style.color = brightness > 125 ? "black" : "white";
}

window.addEventListener("scroll", updateLogoColor);
window.addEventListener("resize", updateLogoColor);
updateLogoColor();
