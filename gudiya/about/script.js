// Optional JavaScript features (e.g. scroll to section)
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: "smooth"
        });
      }
    });
  });
});
