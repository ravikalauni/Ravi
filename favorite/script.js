function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  el.scrollIntoView({ behavior: 'smooth' });
}

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.classList.add('expanded');
  } else {
    header.classList.remove('expanded');
  }
});

// Optional: Add click effect to cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
});