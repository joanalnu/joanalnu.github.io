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


// Select the burger button and the navbar links container
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.navbar-links');

// Toggle 'active' class on click
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Optional: animate burger lines
    burger.classList.toggle('open');
});
