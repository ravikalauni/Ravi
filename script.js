// Simulate loading for 1 second
setTimeout(() => {
    document.body.classList.remove('loading');
}, 1000);

// Navigation functionality
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sideNav = document.getElementById('sideNav');
const overlay = document.getElementById('overlay');

// Toggle side navigation
menuBtn.addEventListener('click', () => {
    sideNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close side navigation
const closeNav = () => {
    sideNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
};

closeBtn.addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);

// Close nav when clicking on links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
});

// Add scroll effect for header
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate sections when they come into view
const animateOnScroll = () => {
    const sections = document.querySelectorAll('.featured-section, .project-showcase');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.featured-section, .project-showcase');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
    });
    
    // Initial check in case sections are already in view
    animateOnScroll();
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
