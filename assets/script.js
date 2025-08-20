// Loading animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('fade-out');
    }, 1000);
});

// Enhanced navbar scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

const highlightNavLink = () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavLink);
highlightNavLink(); // Initial call

// Mobile menu functionality with enhanced animations
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksContainer = document.getElementById('nav-links');
let isMenuOpen = false;

mobileToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinksContainer.classList.toggle('active');

    // Animate hamburger menu
    mobileToggle.style.transform = isMenuOpen
        ? 'rotate(90deg)'
        : 'rotate(0deg)';

    // Change hamburger to X when open
    mobileToggle.innerHTML = isMenuOpen ? '✕' : '☰';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            navLinksContainer.classList.remove('active');
            mobileToggle.style.transform = 'rotate(0deg)';
            mobileToggle.innerHTML = '☰';
            isMenuOpen = false;
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.navbar')) {
        navLinksContainer.classList.remove('active');
        mobileToggle.style.transform = 'rotate(0deg)';
        mobileToggle.innerHTML = '☰';
        isMenuOpen = false;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items and project cards
document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// Add some interactive particles
function createParticles() {
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(99, 102, 241, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';

        // Random position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';

        // Random animation duration
        particle.style.animation = `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';

        document.body.appendChild(particle);
        particles.push(particle);
    }
}

// Particle animation keyframes
const style = document.createElement('style');
style.textContent = `
            @keyframes particle-float {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.5;
                }
                50% {
                    transform: translateY(-20px) translateX(10px);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        const speed = 0.2 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect for subtitle
const subtitle = document.querySelector('.hero .subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
};

setTimeout(typeWriter, 1500);

// Add interactive hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.1) 0%, rgba(26, 26, 46, 0.8) 100%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(26, 26, 46, 0.8)';
    });
});

// Add constellation lines effect
function createConstellation() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 100;

    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2
        });
    }

    function drawConstellation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${star.opacity})`;
            ctx.fill();

            // Twinkling effect
            star.opacity += (Math.random() - 0.5) * 0.1;
            star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;

        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(stars[i].x - stars[j].x, 2) +
                    Math.pow(stars[i].y - stars[j].y, 2)
                );

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.globalAlpha = 1 - (distance / 150);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }

        requestAnimationFrame(drawConstellation);
    }

    drawConstellation();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize constellation
setTimeout(createConstellation, 2000);

// Add smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 120; // Account for floating navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Remove old mobile menu creation function
// Mobile menu is now handled in the HTML structure

// Add scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .about-text, .skill-category');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        }

        el.style.transition = 'all 0.8s ease';
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial call

// Add performance optimization
let ticking = false;
const updateAnimations = () => {
    // Throttle animations for better performance
    if (!ticking) {
        requestAnimationFrame(() => {
            // Animation updates here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', updateAnimations);

// Add custom cursor effect (optional enhancement)
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.background = 'rgba(99, 102, 241, 0.5)';
cursor.style.borderRadius = '50%';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'all 0.1s ease';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Hide custom cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
}


// Horizontal scrolling for highlights
function setupHighlightsScroller() {
    const scroller = document.querySelector('.highlights-scroller');
    const container = document.querySelector('.highlights-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');
    let cardWidth = 0;

    function updateCardWidth() {
        const card = document.querySelector('.highlights-scroller .card');
        if (card) {
            cardWidth = card.offsetWidth + 32; // card width + gap
        }
    }

    function handleScroll() {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        const currentScroll = scroller.scrollLeft;
        if (currentScroll > 10) {
            container.classList.add('scrolled');
        } else {
            container.classList.remove('scrolled');
        }
        if (currentScroll >= maxScroll - 10) {
            scrollRightBtn.style.opacity = '0.3';
            scrollRightBtn.style.pointerEvents = 'none';
        } else {
            scrollRightBtn.style.opacity = '0.8';
            scrollRightBtn.style.pointerEvents = 'auto';
        }
    }

    if (scroller && scrollLeftBtn && scrollRightBtn) {
        updateCardWidth();
        scrollLeftBtn.addEventListener('click', () => {
            updateCardWidth();
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', () => {
            updateCardWidth();
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scroller.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            updateCardWidth();
            handleScroll();
        });
        // Recalculate after all images load
        const images = scroller.querySelectorAll('img');
        let loaded = 0;
        images.forEach(img => {
            if (img.complete) loaded++;
            else img.addEventListener('load', () => {
                loaded++;
                if (loaded === images.length) {
                    updateCardWidth();
                    handleScroll();
                }
            });
        });
        if (loaded === images.length) {
            updateCardWidth();
            handleScroll();
        }
        // Initial check
        setTimeout(() => {
            updateCardWidth();
            handleScroll();
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', setupHighlightsScroller);

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