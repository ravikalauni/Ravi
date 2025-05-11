// Profile picture modal functionality
const profilePic = document.getElementById('profilePic');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Open modal when profile picture is clicked
profilePic.addEventListener('click', () => {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal when X is clicked
closeModal.addEventListener('click', () => {
  modalOverlay.classList.add('closing');
  document.body.style.overflow = ''; // Re-enable scrolling
  
  setTimeout(() => {
    modalOverlay.classList.remove('active', 'closing');
  }, 300); // Match this with your animation duration
});

// Close modal when clicking outside the image
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.add('closing');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      modalOverlay.classList.remove('active', 'closing');
    }, 300);
  }
});

// Back arrow functionality
document.querySelector('.back-arrow').addEventListener('click', () => {
  window.history.back();
});

// Add post button functionality
document.querySelector('.add-icon').addEventListener('click', () => {
  alert("Create new post coming soon!");
});

// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // Here you would typically load different content based on the tab
  });
});