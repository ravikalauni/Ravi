<?php
// No processing needed at this point, just display the HTML
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ravi's something</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
</head>
<style>
    .search-container {
        display: none;
        

    }
    body {
        background-color:rgb(0, 10, 2);
        padding: 10px;
    }
    .header-icons {
        display: none;
    }
    .menu-button {
        color: white;
    }
    .featured-image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 20px;
    border: none;
    margin-bottom: 48px;
}
.collection-hero-subtitle {
    font-size: 20px;
    margin-bottom: 16px;
    display: none;
}
.collection-hero-title {
    font-family: arial;
    font-size: 36px;
    color:rgb(255, 255, 255);
    margin-bottom: 0px;
    text-align: center;
    background-color: rgb(0, 75, 25);
}
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
    
}
div {
    display: block;
    unicode-bidi: isolate;
    padding: 4px;
}
.collection-content h1 {
    font-family: arial;
    font-size: 30px;
    color: #f0c14b;
    margin-bottom: 16px;
    text-align: center;
}
.collection-content h2 {
    font-family: arial;
    font-size: 24px;
    color:rgb(233, 229, 220);
    margin-bottom: 0px;
    
}
.collection-content p {
    color: #ccc;
    margin: 1px;
    font-size: 18px;
    text-align: justify;
}
.admin-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 48px;
    height: 48px;
    background-color: #1a472a;
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 50;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s;
}
</style>

<body>
    <div id="root">
        <!-- Header Section -->
        <header class="header">
            <div class="header-bg"></div>
            <div class="header-content">
                <div class="header-left">
                    <button id="menuButton" class="menu-button">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1 class="site-title"></h1>
                </div>
                <div class="header-right">
                    <div class="header-icons">
                        <a href="#" class="header-icon">
                            <i class="fas fa-bell"></i>
                            <span class="notification-badge">3</span>
                        </a>
                        <a href="#" class="header-icon">
                            <i class="fas fa-envelope"></i>
                            <span class="notification-badge">5</span>
                        </a>
                        <a href="#" class="header-icon">
                            <i class="fas fa-user-circle"></i>
                        </a>
                    </div>
                    <div class="search-container">
                        <input type="text" id="searchInput" placeholder="Search collections..." class="search-input">
                        <button id="searchButton" class="search-button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Side Navigation -->
        <div id="sideNav" class="side-nav">
            <div class="side-nav-header">
                <button id="closeNavButton" class="close-nav-button">
                    <i class="fas fa-times"></i>
                </button>
                <h2 class="side-nav-title">MENU</h2>
            </div>
            <nav class="side-nav-links">
            <a href="#" class="side-nav-link active">Home</a>
                
                <a href="gudiya/index.html" class="side-nav-link">Gudiya (Assistant)</a>
                <a href="personal-info/index.html" class="side-nav-link">Personal info</a>
                
                <a href="portfolio/index.html" class="side-nav-link">Portfolio</a>
                <a href="cv/index.html" class="side-nav-link">Curriculum Vitae (CV)</a>
                <a href="art/index.html" class="side-nav-link">Art Library</a>
                
                <a href="QnA/index.html" class="side-nav-link">Q & A</a>
                <a href="life-notes/index.html" class="side-nav-link" style="color: rgb(229, 255, 0);">Life Notes (Accessable)</a>

               
            </nav>
        </div>
        <div id="overlay" class="overlay"></div>

        <!-- Collection Detail -->
        <div id="collectionDetail" class="collection-detail">
            <!-- Content will be loaded dynamically -->
            <div class="loading">Loading collection...</div>
        </div>

        <!-- Admin Access Button -->
        <button id="adminButton" class="admin-button">
            <i class="fas fa-lock"></i>
        </button>

        <!-- Modals -->
        <div id="adminModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">ADMIN LOGIN</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="adminForm" class="admin-form">
                        <div>
                            <label for="adminPassword" class="form-label">Password</label>
                            <input type="password" id="adminPassword" class="form-input" placeholder="Enter admin password">
                            <p id="adminError" class="error-message"></p>
                        </div>
                        <div class="form-buttons">
                            <button type="button" class="button button-cancel modal-close-btn">Cancel</button>
                            <button type="submit" id="adminLoginButton" class="button button-green">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // DOM Elements
        const menuButton = document.getElementById('menuButton');
        const closeNavButton = document.getElementById('closeNavButton');
        const sideNav = document.getElementById('sideNav');
        const overlay = document.getElementById('overlay');
        const adminButton = document.getElementById('adminButton');
        const adminModal = document.getElementById('adminModal');
        const collectionDetail = document.getElementById('collectionDetail');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const adminForm = document.getElementById('adminForm');
        const adminPassword = document.getElementById('adminPassword');
        const adminError = document.getElementById('adminError');

        // Get collection ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const collectionId = urlParams.get('id');

        // Event Listeners
        document.addEventListener('DOMContentLoaded', loadCollectionDetail);
        menuButton.addEventListener('click', openSideNav);
        closeNavButton.addEventListener('click', closeSideNav);
        overlay.addEventListener('click', closeSideNav);
        adminButton.addEventListener('click', () => openModal(adminModal));
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

        // Load collection detail
        function loadCollectionDetail() {
            if (!collectionId) {
                showNotFound();
                return;
            }

            collectionDetail.innerHTML = '<div class="loading">Loading collection...</div>';
            collectionDetail.style.display = 'block';
            
            fetch(`api/collection.php?id=${collectionId}`)
                .then(response => response.json())
                .then(collection => {
                    if (collection.error) {
                        showNotFound();
                        return;
                    }
                    
                    renderCollectionDetail(collection);
                })
                .catch(error => {
                    console.error('Error fetching collection:', error);
                    showNotFound();
                });
        }

        function renderCollectionDetail(collection) {
            // Convert markdown content to HTML (basic implementation)
            const contentHtml = renderMarkdown(collection.content || '');
            
            collectionDetail.innerHTML = `
                <div class="max-w-7xl mx-auto">
                    <!-- Breadcrumb -->
                    <div class="breadcrumb">
                        <a href="index.html" class="breadcrumb-link">Home</a>
                        <span class="breadcrumb-separator">/</span>
                        <span class="breadcrumb-current">${collection.title}</span>
                    </div>
                    
                    <!-- Hero Section -->
                    <div class="collection-hero">
                        <h1 class="collection-hero-title">${collection.title}</h1>
                        <p class="collection-hero-subtitle">${collection.subtitle}</p>
                    </div>
                    
                    <!-- Featured Image -->
                    <img 
                        src="${collection.image}" 
                        alt="${collection.title}"
                        class="featured-image"
                    />
                    
                    <!-- Description -->
                    <div class="collection-description">
                        <p>${collection.description}</p>
                    </div>
                    
                    <!-- Content -->
                    ${collection.content ? `<div class="collection-content">${contentHtml}</div>` : ''}
                    
                    <!-- Back Button -->
                    <button onclick="window.location.href='index.html'" class="back-button">
                        <i class="fas fa-arrow-left"></i> Back to Collections
                    </button>
                </div>
            `;
        }

        function showNotFound() {
            collectionDetail.innerHTML = `
                <div class="not-found">
                    <h2 class="not-found-title">Collection Not Found</h2>
                    <p class="not-found-message">Sorry, the collection you're looking for doesn't exist.</p>
                    <button onclick="window.location.href='index.html'" class="back-button">
                        Return Home
                    </button>
                </div>
            `;
        }

        // Function to convert markdown to HTML (basic implementation)
        function renderMarkdown(markdown) {
            if (!markdown) return "";
            
            // Handle headers
            let html = markdown
                .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>');
            
            // Handle paragraphs
            html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
                return /\<(\/)?(h|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
            });
            
            // Handle bold and italic
            html = html
                .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gm, '<em>$1</em>');
            
            // Handle line breaks
            html = html.replace(/\n/gm, '<br>');
            
            return html;
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
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }

        function closeAllModals() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.classList.remove('open');
                modal.style.display = 'none';
            });
            document.body.style.overflow = '';
        }

        // Search function
        function handleSearch() {
            const query = searchInput.value.trim();
            if (!query) return;
            
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
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
                    window.location.href = 'admin.html';
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
    </script>
</body>
</html>