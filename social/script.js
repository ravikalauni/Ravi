// Navigation functionality
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sideNav = document.getElementById('sideNav');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    sideNav.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

overlay.addEventListener('click', () => {
    sideNav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close nav when clicking on links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideNav.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});