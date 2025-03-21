


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Collections Platform</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
    <style>
        /* Additional admin-specific styles */
        .admin-dashboard {
            display: block;
        }
        
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        .admin-table th, .admin-table td {
            padding: 12px 16px;
            text-align: left;
            border: 1px solid #333;
        }
        
        .admin-table th {
            background-color: #222;
            color: #f0c14b;
            font-family: 'Anton', sans-serif;
        }
        
        .admin-table tr:hover {
            background-color: rgba(26, 71, 42, 0.1);
        }
        
        .admin-form {
            margin-top: 20px;
        }
        
        .form-row {
            margin-bottom: 16px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        .form-input, .form-textarea {
            width: 100%;
            padding: 10px;
            border: 2px solid #1a472a;
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
        }
        
        .form-textarea {
            min-height: 200px;
            resize: vertical;
        }
        
        .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #f0c14b;
        }
        
        .action-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            font-size: 16px;
        }
        
        .table-actions {
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        .search-container {
            position: inherit;
        }

        @media (max-width: 480px) {
    body {
      flex-direction: column;
      height: auto;
      
      
      
    }

    </style>
</head>
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
                    <h1 class="site-title">COLLECTIONS</h1>
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
                <a href="index.html" class="side-nav-link">Home</a>
                <a href="#" class="side-nav-link">About</a>
                <a href="#" class="side-nav-link">Contact</a>
                <a href="#" class="side-nav-link">Privacy Policy</a>
            </nav>
        </div>
        <div id="overlay" class="overlay"></div>

        <!-- Admin Dashboard -->
        <main>
            <div class="admin-dashboard" id="adminDashboard">
                <div class="admin-header">
                    <h2 class="admin-title">ADMIN DASHBOARD</h2>
                    <div class="admin-buttons">
                        <button id="newCollectionBtn" class="button button-green">
                            <i class="fas fa-plus"></i> New Collection
                        </button>
                        <button id="logoutBtn" class="button button-red">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
                
                <!-- Collections Table -->
                <div id="collectionsTableContainer">
                    <div class="loading">Loading collections...</div>
                </div>
                
                <!-- Create/Edit Form (initially hidden) -->
                <div id="collectionForm" style="display: none;">
                    <h3 id="formTitle" class="form-title">Create New Collection</h3>
                    <form id="collectionFormElement" class="admin-form">
                        <input type="hidden" id="collectionId" value="">
                        
                        <div class="form-row">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" id="title" name="title" class="form-input" required>
                        </div>
                        
                        <div class="form-row">
                            <label for="subtitle" class="form-label">Subtitle</label>
                            <input type="text" id="subtitle" name="subtitle" class="form-input" required>
                        </div>
                        
                        <div class="form-row">
                            <label for="description" class="form-label">Description</label>
                            <input type="text" id="description" name="description" class="form-input" required>
                        </div>
                        
                        <div class="form-row">
                            <label for="image" class="form-label">Image URL</label>
                            <input type="url" id="image" name="image" class="form-input" required>
                        </div>
                        
                        <div class="form-row">
                            <label for="content" class="form-label">Content (Markdown)</label>
                            <textarea id="content" name="content" class="form-textarea"></textarea>
                        </div>
                        
                        <div class="form-buttons">
                            <button type="button" id="cancelFormBtn" class="button button-cancel">Cancel</button>
                            <button type="submit" id="submitFormBtn" class="button button-green">Save Collection</button>
                        </div>
                    </form>
                </div>
                
                <!-- Delete Confirmation Modal -->
                <div id="deleteModal" class="modal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">CONFIRM DELETE</h2>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete <span id="deleteCollectionTitle" class="text-highlight"></span>?</p>
                            <p class="text-danger">This action cannot be undone.</p>
                            
                            <div class="form-buttons">
                                <button id="cancelDeleteBtn" class="button button-cancel">Cancel</button>
                                <button id="confirmDeleteBtn" class="button button-red">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // DOM Elements
        const menuButton = document.getElementById('menuButton');
        const closeNavButton = document.getElementById('closeNavButton');
        const sideNav = document.getElementById('sideNav');
        const overlay = document.getElementById('overlay');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const adminDashboard = document.getElementById('adminDashboard');
        const collectionsTableContainer = document.getElementById('collectionsTableContainer');
        const newCollectionBtn = document.getElementById('newCollectionBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const collectionForm = document.getElementById('collectionForm');
        const collectionFormElement = document.getElementById('collectionFormElement');
        const formTitle = document.getElementById('formTitle');
        const collectionId = document.getElementById('collectionId');
        const cancelFormBtn = document.getElementById('cancelFormBtn');
        const submitFormBtn = document.getElementById('submitFormBtn');
        const deleteModal = document.getElementById('deleteModal');
        const deleteCollectionTitle = document.getElementById('deleteCollectionTitle');
        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        
        // Form fields
        const titleField = document.getElementById('title');
        const subtitleField = document.getElementById('subtitle');
        const descriptionField = document.getElementById('description');
        const imageField = document.getElementById('image');
        const contentField = document.getElementById('content');
        
        // Collection data
        let collections = [];
        let selectedCollection = null;
        
        // Check authentication
        document.addEventListener('DOMContentLoaded', function() {
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            
            if (!isAdmin) {
                window.location.href = 'index.html';
                return;
            }
            
            // Initialize admin dashboard
            loadCollections();
            
            // Event listeners
            newCollectionBtn.addEventListener('click', showCreateForm);
            logoutBtn.addEventListener('click', logout);
            cancelFormBtn.addEventListener('click', hideForm);
            collectionFormElement.addEventListener('submit', handleFormSubmit);
            cancelDeleteBtn.addEventListener('click', () => hideModal(deleteModal));
            confirmDeleteBtn.addEventListener('click', handleDeleteConfirm);
            
            // Close modals when clicking close buttons
            const closeButtons = document.querySelectorAll('.modal-close');
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modal = button.closest('.modal');
                    hideModal(modal);
                });
            });
        });
        
        // Navigation
        menuButton.addEventListener('click', openSideNav);
        closeNavButton.addEventListener('click', closeSideNav);
        overlay.addEventListener('click', closeSideNav);
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', event => {
            if (event.key === 'Enter') handleSearch();
        });
        
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
        
        function handleSearch() {
            const query = searchInput.value.trim();
            if (!query) return;
            
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
        
        // Admin functions
        function loadCollections() {
            collectionsTableContainer.innerHTML = '<div class="loading">Loading collections...</div>';
            
            fetch('api/collections.php')
                .then(response => response.json())
                .then(data => {
                    collections = data;
                    renderCollectionsTable(collections);
                })
                .catch(error => {
                    console.error('Error loading collections:', error);
                    collectionsTableContainer.innerHTML = `
                        <div class="error-message">
                            <p>Failed to load collections. Please try again.</p>
                        </div>
                    `;
                });
        }
        
        function renderCollectionsTable(collections) {
            if (collections.length === 0) {
                collectionsTableContainer.innerHTML = `
                    <div class="no-collections">
                        <p>No collections found</p>
                        <button id="firstCollectionBtn" class="button button-green">
                            Create Your First Collection
                        </button>
                    </div>
                `;
                
                document.getElementById('firstCollectionBtn').addEventListener('click', showCreateForm);
                return;
            }
            
            // Create table
            const tableHtml = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Subtitle</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${collections.map(collection => `
                            <tr>
                                <td>${collection.title}</td>
                                <td>${collection.subtitle}</td>
                                <td>${collection.description.length > 50 ? collection.description.substring(0, 50) + '...' : collection.description}</td>
                                <td>
                                    <div class="table-actions">
                                        <button onclick="viewCollection(${collection.id})" class="action-button view-action" title="View">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="editCollection(${collection.id})" class="action-button edit-action" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="showDeleteConfirmation(${collection.id})" class="action-button delete-action" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            
            collectionsTableContainer.innerHTML = tableHtml;
        }
        
        function showCreateForm() {
            // Reset form
            collectionFormElement.reset();
            collectionId.value = '';
            formTitle.textContent = 'Create New Collection';
            submitFormBtn.textContent = 'Create Collection';
            
            // Show form, hide table
            collectionsTableContainer.style.display = 'none';
            collectionForm.style.display = 'block';
            
            // Focus first field
            titleField.focus();
        }
        
        function editCollection(id) {
            // Find collection
            selectedCollection = collections.find(c => c.id == id);
            
            if (!selectedCollection) {
                alert('Collection not found');
                return;
            }
            
            // Fill form fields
            titleField.value = selectedCollection.title;
            subtitleField.value = selectedCollection.subtitle;
            descriptionField.value = selectedCollection.description;
            imageField.value = selectedCollection.image;
            contentField.value = selectedCollection.content || '';
            collectionId.value = selectedCollection.id;
            
            // Update form title and button
            formTitle.textContent = 'Edit Collection';
            submitFormBtn.textContent = 'Save Changes';
            
            // Show form, hide table
            collectionsTableContainer.style.display = 'none';
            collectionForm.style.display = 'block';
        }
        
        function viewCollection(id) {
            window.open(`collection.php?id=${id}`, '_blank');
        }
        
        function showDeleteConfirmation(id) {
            // Find collection
            selectedCollection = collections.find(c => c.id == id);
            
            if (!selectedCollection) {
                alert('Collection not found');
                return;
            }
            
            // Set confirmation text
            deleteCollectionTitle.textContent = selectedCollection.title;
            
            // Show modal
            showModal(deleteModal);
        }
        
        function hideForm() {
            // Reset form state
            collectionFormElement.reset();
            collectionId.value = '';
            selectedCollection = null;
            
            // Show table, hide form
            collectionsTableContainer.style.display = 'block';
            collectionForm.style.display = 'none';
        }
        
        function handleFormSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                title: titleField.value.trim(),
                subtitle: subtitleField.value.trim(),
                description: descriptionField.value.trim(),
                image: imageField.value.trim(),
                content: contentField.value.trim(),
                password: 'admin123'  // This is just for the admin verification
            };
            
            // Validate form data
            if (!formData.title || !formData.subtitle || !formData.description || !formData.image) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Disable submit button
            submitFormBtn.disabled = true;
            submitFormBtn.textContent = collectionId.value ? 'Saving...' : 'Creating...';
            
            // Determine if creating new or updating
            const isUpdate = !!collectionId.value;
            const url = isUpdate ? `api/update_collection.php?id=${collectionId.value}` : 'api/create_collection.php';
            const method = isUpdate ? 'PUT' : 'POST';
            
            // Send request
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                
                // Success
                alert(isUpdate ? 'Collection updated successfully' : 'Collection created successfully');
                
                // Reload collections and hide form
                loadCollections();
                hideForm();
            })
            .catch(error => {
                console.error('Error saving collection:', error);
                alert(`Failed to save collection: ${error.message}`);
            })
            .finally(() => {
                // Re-enable submit button
                submitFormBtn.disabled = false;
                submitFormBtn.textContent = isUpdate ? 'Save Changes' : 'Create Collection';
            });
        }
        
        function handleDeleteConfirm() {
            if (!selectedCollection) return;
            
            // Disable button
            confirmDeleteBtn.disabled = true;
            confirmDeleteBtn.textContent = 'Deleting...';
            
            // Send request
            fetch(`api/delete_collection.php?id=${selectedCollection.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: 'admin123' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                
                // Success
                alert('Collection deleted successfully');
                
                // Hide modal and reload collections
                hideModal(deleteModal);
                loadCollections();
            })
            .catch(error => {
                console.error('Error deleting collection:', error);
                alert(`Failed to delete collection: ${error.message}`);
            })
            .finally(() => {
                // Re-enable button
                confirmDeleteBtn.disabled = false;
                confirmDeleteBtn.textContent = 'Delete';
            });
        }
        
        function logout() {
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        }
        
        // Modal functions
        function showModal(modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('open');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
        
        function hideModal(modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }
    </script>
</body>
</html>