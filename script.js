// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const tabs = document.querySelector('.tabs');

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    tabs.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.tabs') && !e.target.closest('.mobile-menu-btn')) {
        tabs.classList.remove('active');
    }
});

// Close menu when a tab is clicked (for mobile)
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            tabs.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});