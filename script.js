// DOM Elements
const menuButton = document.getElementById('menuButton');
const closeNavButton = document.getElementById('closeNavButton');
const sideNav = document.getElementById('sideNav');
const overlay = document.getElementById('overlay');
const adminButton = document.getElementById('adminButton');
const adminModal = document.getElementById('adminModal');
const privacyButton = document.getElementById('privacyButton');
const privacyModal = document.getElementById('privacyModal');
const aboutButton = document.getElementById('aboutButton');
const aboutModal = document.getElementById('aboutModal');
const profileButton = document.getElementById('profileButton');
const profileModal = document.getElementById('profileModal');

const messageButton = document.getElementById('messageButton');
const messageModal = document.getElementById('messageModal');

const notificationButton = document.getElementById('notificationButton');
const notificationModal = document.getElementById('notificationModal');


const collectionsGrid = document.getElementById('collectionsGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const adminForm = document.getElementById('adminForm');
const adminPassword = document.getElementById('adminPassword');
const adminError = document.getElementById('adminError');

// Collection data
let collections = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
menuButton.addEventListener('click', openSideNav);
closeNavButton.addEventListener('click', closeSideNav);
overlay.addEventListener('click', closeSideNav);
adminButton.addEventListener('click', () => openModal(adminModal));
privacyButton.addEventListener('click', () => openModal(privacyModal));
aboutButton.addEventListener('click', () => openModal(aboutModal));
profileButton.addEventListener('click', () => openModal(profileModal));
messageButton.addEventListener('click', () => openModal(messageModal));
notificationButton.addEventListener('click', () => openModal(notificationModal));

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') handleSearch();
});

// Close all modals when clicking close buttons
const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

// Admin form submission
adminForm.addEventListener('submit', handleAdminLogin);

// Initialize app
function initApp() {
    fetchCollections();
    
    // Check if user is admin and redirect to admin page if needed
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const currentPath = window.location.pathname;
    
    if (isAdmin && currentPath.includes('admin.php')) {
        // Already on admin page, nothing to do
    } else if (isAdmin && !currentPath.includes('admin.php')) {
        // Redirect to admin page
        // window.location.href = 'admin.php';
    }
    
    // Handle Escape key to close modals and side nav
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSideNav();
            closeAllModals();
        }
    });
}

// Navigation functions
function openSideNav() {
    sideNav.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSideNav() {
    sideNav.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

// Modal functions
function openModal(modal) {
    closeAllModals();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('open');
    });
    document.body.style.overflow = '';
}

// Collections functions
function fetchCollections() {
    // Show loading state
    collectionsGrid.innerHTML = '<div class="loading">Loading collections...</div>';
    
    // Fetch collections from API
    fetch('api/collections.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            collections = data;
            renderCollections(collections);
        })
        .catch(error => {
            console.error('Error fetching collections:', error);
            collectionsGrid.innerHTML = `
                <div class="error-message">
                    <p>Failed to load collections. Please try again later.</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        });
}
function renderCollections(collections) {
    if (collections.length === 0) {
        collectionsGrid.innerHTML = `
            <div class="no-collections">
                <p>No collections found</p>
            </div>
        `;
        return;
    }
    
    collectionsGrid.innerHTML = '';
    
    collections.forEach(collection => {
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-item';
        collectionElement.dataset.id = collection.id;
        collectionElement.innerHTML = `
            <div class="collection-image-container">
                <img src="${collection.image}" alt="${collection.title}" class="collection-image">
                </div>
            </div>
            <div class="collection-content">
                <h3 class="collection-title">${collection.title}</h3>
                <p class="collection-subtitle">${collection.subtitle}</p>
                <p class="collection-description">${collection.description}</p>
                <div>
                    <span class="read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        `;
        
        // Add click event to navigate to collection detail
        collectionElement.addEventListener('click', () => {
            window.location.href = `collection.php?id=${collection.id}`;
        });
        
        collectionsGrid.appendChild(collectionElement);
    });
}

// Search function
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    window.location.href = `search.php?q=${encodeURIComponent(query)}`;
}

// Admin login
function handleAdminLogin(event) {
    event.preventDefault();
    
    const password = adminPassword.value.trim();
    
    if (!password) {
        showAdminError('Password is required');
        return;
    }
    
    // Disable button and show loading
    const loginButton = document.getElementById('adminLoginButton');
    const originalText = loginButton.textContent;
    loginButton.disabled = true;
    loginButton.textContent = 'Verifying...';
    
    // Send request to API
    fetch('api/admin_verify.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store admin session in localStorage
            localStorage.setItem('isAdmin', 'true');
            
            // Show success message
            alert('Admin access granted');
            
            // Redirect to admin page
            window.location.href = 'admin.php';
        } else {
            showAdminError('Invalid password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Admin login error:', error);
        showAdminError('Authentication failed. Please try again.');
    })
    .finally(() => {
        // Re-enable button
        loginButton.disabled = false;
        loginButton.textContent = originalText;
    });
}

function showAdminError(message) {
    adminError.textContent = message;
    adminError.style.display = 'block';
}

 
// Enhanced rendering of collections with animations
function renderCollections(collections) {
    if (collections.length === 0) {
        collectionsGrid.innerHTML = `
            <div class="no-collections">
                <p>No collections found</p>
            </div>
        `;
        return;
    }
    
    collectionsGrid.innerHTML = '';
    
    collections.forEach((collection, index) => {
        const collectionElement = document.createElement('div');
        collectionElement.className = 'collection-item';
        collectionElement.dataset.id = collection.id;
        // Add staggered animation
        collectionElement.style.animationDelay = `${index * 0.1}s`;
        collectionElement.classList.add('animate-fadeIn');
        
        collectionElement.innerHTML = `
            <div class="collection-image-container">
                <div class="connecting-line">
                    <img src="${collection.image}" alt="${collection.title}" class="collection-image">
                    <span class="dot"></span>
                </div>
            </div>
            <div class="collection-content">
                <h3 class="collection-title">${collection.title}</h3>
                <p class="collection-subtitle">${collection.subtitle}</p>
                <p class="collection-description">${collection.description}</p>
                <div>
                    <span class="read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        `;
        
        // Add click event to navigate to collection detail
        collectionElement.addEventListener('click', () => {
            window.location.href = `collection.php?id=${collection.id}`;
        });
        
        collectionsGrid.appendChild(collectionElement);
    });
}

// Add smooth scrolling and interface polish
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Notification badge hover effect
    document.querySelectorAll('.header-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.notification-badge');
            if (badge) {
                badge.style.transform = 'scale(1.2)';
                badge.style.transition = 'transform 0.2s';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.notification-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
});

// Enhanced modal animations
function openModal(modal) {
    closeAllModals();
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('open');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
    }
    setTimeout(() => {
        modal.classList.remove('open');
        modal.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}



const speed = 30; // Typing speed (milliseconds)
const eraseSpeed = 50; // Erasing speed
const delayBeforeErase = 1000; // Delay before erasing starts
let index = 0;
let textIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingText = document.getElementById("typing-text");
    const currentText = texts[textIndex];

    if (!isDeleting && index < currentText.length) {
        typingText.textContent += currentText.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    } else if (isDeleting && index > 0) {
        typingText.textContent = currentText.substring(0, index - 1);
        index--;
        setTimeout(typeEffect, eraseSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length; // Move to next text
        }
        setTimeout(typeEffect, delayBeforeErase);
    }
}

window.onload = typeEffect;
