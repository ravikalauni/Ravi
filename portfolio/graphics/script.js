document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const alertBanner = document.getElementById('alert-banner');
    const closeAlertBtn = document.getElementById('close-alert');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const categoriesGrid = document.getElementById('categories-grid');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const galleryTitle = document.getElementById('gallery-title');
    const galleryGrid = document.getElementById('gallery-grid');
    const closeGalleryBtn = document.getElementById('close-gallery');
    const previewOverlay = document.getElementById('preview-overlay');
    const previewImage = document.getElementById('preview-image');
    const closePreviewBtn = document.getElementById('close-preview');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const imageTitle = document.getElementById('image-title');
    const imageDescription = document.getElementById('image-description');
    
    // Modal Elements
    const skillsModal = document.getElementById('skills-modal');
    const infoModal = document.getElementById('info-modal');
    const contactModal = document.getElementById('contact-modal');
    const closeSkillsBtn = document.getElementById('close-skills');
    const closeInfoBtn = document.getElementById('close-info');
    const closeContactBtn = document.getElementById('close-contact');

    // State
    let categories = [
        "YouTube Thumbnails", "Facebook/Instagram Graphics", "Logo Design", "Business Cards",
        "Packaging Design", "Brochures", "Movie Posters",
        "id cards", "Billboards", "Website Layouts", "Mobile App Interfaces",
        "Book Covers", "Product Packaging", "Labels & Stickers", "Billboards & Hoardings",
        "Font Creation", "Hand-drawn Illustrations", "Digital Painting", "T-Shirt Designs",
        "Wedding Invitations", "Event Posters", "Sport Scoreposts", "ID Cards"
    ];
    let currentGalleryImages = [];
    let currentImageIndex = 0;
    let currentZoomLevel = 1;

    // Initialize data
    renderCategories(categories);

    // Close alert banner
    closeAlertBtn.addEventListener('click', function() {
        alertBanner.style.animation = 'fade-out 0.5s forwards';
        setTimeout(() => {
            alertBanner.style.display = 'none';
        }, 500);
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filteredCategories = categories.filter(category => 
            category.toLowerCase().includes(query)
        );
        
        renderSearchResults(filteredCategories);
    });

    // Close gallery
    closeGalleryBtn.addEventListener('click', function() {
        galleryOverlay.style.animation = 'fade-out 0.3s forwards';
        setTimeout(() => {
            galleryOverlay.style.display = 'none';
            galleryOverlay.style.animation = ''; // Reset animation
            currentGalleryImages = []; // Reset gallery images
        }, 300);
    });

    // Close preview
    closePreviewBtn.addEventListener('click', function() {
        previewOverlay.style.animation = 'fade-out 0.3s forwards';
        setTimeout(() => {
            previewOverlay.style.display = 'none';
            previewOverlay.style.animation = ''; // Reset animation
            resetZoom();
            isDragging = false; // Reset drag state
        }, 300);
    });

    // Navigation in preview
    prevBtn.addEventListener('click', function() {
        navigateImages(-1);
    });

    nextBtn.addEventListener('click', function() {
        navigateImages(1);
    });

    // Zoom controls
    zoomInBtn.addEventListener('click', function() {
        updateZoom(0.2);
    });

    zoomOutBtn.addEventListener('click', function() {
        updateZoom(-0.2);
    });

    zoomResetBtn.addEventListener('click', function() {
        resetZoom();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (previewOverlay.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigateImages(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImages(1);
            } else if (e.key === 'Escape') {
                closePreviewBtn.click();
            } else if (e.key === '+') {
                updateZoom(0.2);
            } else if (e.key === '-') {
                updateZoom(-0.2);
            } else if (e.key === '0') {
                resetZoom();
            }
        } else if (galleryOverlay.style.display === 'flex' && e.key === 'Escape') {
            closeGalleryBtn.click();
        } else if (skillsModal && skillsModal.style.display === 'flex' && e.key === 'Escape') {
            closeSkillsBtn.click();
        } else if (infoModal && infoModal.style.display === 'flex' && e.key === 'Escape') {
            closeInfoBtn.click();
        } else if (contactModal && contactModal.style.display === 'flex' && e.key === 'Escape') {
            closeContactBtn.click();
        }
    });
    
    // Skills, Info, Contact modal handlers
    const skillsLink = document.querySelector('a[href="#skills"]');
    if (skillsLink) {
        skillsLink.addEventListener('click', function(e) {
            e.preventDefault();
            skillsModal.style.display = 'flex';
        });
    }
    
    const infoLink = document.querySelector('a[href="#info"]');
    if (infoLink) {
        infoLink.addEventListener('click', function(e) {
            e.preventDefault();
            infoModal.style.display = 'flex';
        });
    }
    
    const contactLink = document.querySelector('a[href="#contact"]');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.style.display = 'flex';
        });
    }
    
    if (closeSkillsBtn) {
        closeSkillsBtn.addEventListener('click', function() {
            skillsModal.style.animation = 'fade-out 0.3s forwards';
            setTimeout(() => {
                skillsModal.style.display = 'none';
                skillsModal.style.animation = '';
            }, 300);
        });
    }
    
    if (closeInfoBtn) {
        closeInfoBtn.addEventListener('click', function() {
            infoModal.style.animation = 'fade-out 0.3s forwards';
            setTimeout(() => {
                infoModal.style.display = 'none';
                infoModal.style.animation = '';
            }, 300);
        });
    }
    
    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', function() {
            contactModal.style.animation = 'fade-out 0.3s forwards';
            setTimeout(() => {
                contactModal.style.display = 'none';
                contactModal.style.animation = '';
            }, 300);
        });
    }
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully! (Demo only)');
            this.reset();
        });
    }

    // Render categories in the grid
    function renderCategories(categories) {
        categoriesGrid.innerHTML = '';
        
        categories.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.textContent = category;
            categoryCard.addEventListener('click', () => openGallery(category));
            
            categoriesGrid.appendChild(categoryCard);
        });
    }

    // Render search results
    function renderSearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No matching designs found';
            searchResults.appendChild(noResults);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = result;
                resultItem.addEventListener('click', () => {
                    searchInput.value = result;
                    searchResults.style.display = 'none';
                    openGallery(result);
                });
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.style.display = 'block';
    }

    // Open gallery for a category
    function openGallery(category) {
        galleryTitle.textContent = category;
        galleryGrid.innerHTML = `
        <div class="gallery-skeleton">
            ${Array(4).fill().map(() => `
                <div class="skeleton-item">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text long"></div>
                    <div class="skeleton-shimmer"></div>
                </div>
            `).join('')}
        </div>
    `;
    
    galleryOverlay.style.display = 'flex';

    
        
        // Different images for different categories
     
        if (category === "YouTube Thumbnails") {
            mockImages = [
                {
                    id: 1, 
                    title: "Elon Island", 
                    description: "Travelling Documentory video", 
                    thumbnail: "thumbnails/thumbnail1.jpg", 
                    fullsize: "thumbnails/thumbnail1.jpg"
                },
                {
                    id: 2, 
                    title: "Education is a Trap", 
                    description: "Social Awareness video", 
                    thumbnail: "thumbnails/thumbnail2.jpg", 
                    fullsize: "thumbnails/thumbnail2.jpg"
                },
                {
                    id: 1, 
                    title: "Total Gaming", 
                    description: "Free Fire gaming video", 
                    thumbnail: "thumbnails/thumbnail3.jpg", 
                    fullsize: "thumbnails/thumbnail3.jpg"
                },
                {
                    id: 1, 
                    title: "Mrbeast", 
                    description: "Mrbeast style video thumbnail", 
                    thumbnail: "thumbnails/thumbnail4.jpg", 
                    fullsize: "thumbnails/thumbnail4.jpg"
                },
                {
                    id: 1, 
                    title: "Fukra Insaan", 
                    description: "Fukra Insaan style challenge video thumbnail", 
                    thumbnail: "thumbnails/thumbnail5.jpg", 
                    fullsize: "thumbnails/thumbnail5.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail6.jpg", 
                    fullsize: "thumbnails/thumbnail6.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail7.jpg", 
                    fullsize: "thumbnails/thumbnail7.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail9.jpg", 
                    fullsize: "thumbnails/thumbnail9.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail8.jpg", 
                    fullsize: "thumbnails/thumbnail8.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail10.jpg", 
                    fullsize: "thumbnails/thumbnail10.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail11.jpg", 
                    fullsize: "thumbnails/thumbnail11.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail12.jpg", 
                    fullsize: "thumbnails/thumbnail12.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail13.jpg", 
                    fullsize: "thumbnails/thumbnail13.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail14.jpg", 
                    fullsize: "thumbnails/thumbnail14.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail15.jpg", 
                    fullsize: "thumbnails/thumbnail15.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail16.jpg", 
                    fullsize: "thumbnails/thumbnail16.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail17.jpg", 
                    fullsize: "thumbnails/thumbnail17.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail18.jpg", 
                    fullsize: "thumbnails/thumbnail18.jpg"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "thumbnails/thumbnail19.jpg", 
                    fullsize: "thumbnails/thumbnail19.jpg"
                },
            ];
        }
        else if (category === "Facebook/Instagram Graphics") {
            mockImages = [
                {
                    id: 1, 
                    title: "Burger Ad", 
                    description: "", 
                    thumbnail: "ads/1.jpg", 
                    fullsize: "ads/1.jpg"
                },
                {
                    id: 2, 
                    title: "Momo Ad", 
                    description: "", 
                    thumbnail: "ads/2.jpg", 
                    fullsize: "ads/2.jpg"
                },
                {
                    id: 3, 
                    title: "Samosa Ad", 
                    description: "", 
                    thumbnail: "ads/3.jpg", 
                    fullsize: "ads/3.jpg"
                },
                
                {
                    id: 4, 
                    title: "College Ad", 
                    description: "", 
                    thumbnail: "ads/4.jpg", 
                    fullsize: "ads/4.jpg"
                },
                {
                    id: 6, 
                    title: "Lays Ad", 
                    description: "", 
                    thumbnail: "ads/6.jpg", 
                    fullsize: "ads/6.jpg"
                },
                {
                    id: 7, 
                    title: "School Admition Ad", 
                    description: "", 
                    thumbnail: "ads/7.jpg", 
                    fullsize: "ads/7.jpg"
                },
                {
                    id: 8, 
                    title: "School Admition Ad", 
                    description: "", 
                    thumbnail: "ads/8.jpg", 
                    fullsize: "ads/8.jpg"
                },
                {
                    id: 9, 
                    title: "School Admition Ad", 
                    description: "", 
                    thumbnail: "ads/9.jpg", 
                    fullsize: "ads/9.jpg"
                },
                {
                    id: 10, 
                    title: "School Admition Ad", 
                    description: "", 
                    thumbnail: "ads/10.jpg", 
                    fullsize: "ads/10.jpg"
                }
            ];
        }
        else if (category === "Logo Design") {
            mockImages = [
                {
                    id: 16, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/16.png", 
                    fullsize: "logos/16.png"
                },
                {
                    id: 17, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/17.png", 
                    fullsize: "logos/17.png"
                },
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/1.png", 
                    fullsize: "logos/1.png"
                },
                {
                    id: 13, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/13.png", 
                    fullsize: "logos/13.png"
                },
                {
                    id: 19, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/19.png", 
                    fullsize: "logos/19.png"
                },
               
                {
                    id: 14, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/14.png", 
                    fullsize: "logos/14.png"
                },
                {
                    id: 18, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/18.png", 
                    fullsize: "logos/18.png"
                },
                {
                    id: 15, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/15.png", 
                    fullsize: "logos/15.png"
                },
                {
                    id: 3, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/3.png", 
                    fullsize: "logos/3.png"
                },
                {
                    id: 4, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/4.jpg", 
                    fullsize: "logos/4.jpg"
                },
                {
                    id: 5, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/5.png", 
                    fullsize: "logos/5.png"
                },
                
                {
                    id: 5, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/5.jpg", 
                    fullsize: "logos/5.jpg"
                },
                {
                    id: 6, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/6.png", 
                    fullsize: "logos/6.png"
                },
                
                {
                    id: 7, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/7.png", 
                    fullsize: "logos/7.png"
                },
                {
                    id: 8, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/8.jpg", 
                    fullsize: "logos/8.jpg"
                },
                {
                    id: 8, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/8.png", 
                    fullsize: "logos/8.png"
                },
                {
                    id: 9, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/9.png", 
                    fullsize: "logos/9.png"
                },
                {
                    id: 19, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/19.png", 
                    fullsize: "logos/19.png"
                },
                {
                    id: 10, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/10.png", 
                    fullsize: "logos/10.png"
                },
                {
                    id: 11, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/11.png", 
                    fullsize: "logos/11.png"
                },
                {
                    id: 12, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/12.png", 
                    fullsize: "logos/12.png"
                },
                {
                    id: 2, 
                    title: "", 
                    description: "", 
                    thumbnail: "logos/2.png", 
                    fullsize: "logos/2.png"
                },
                
                
            ];
        }

        /* Business Card */

        else if (category === "Business Cards") {
            mockImages = [
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/1.jpg", 
                    fullsize: "business card/1.jpg"
                },
                {
                    id: 2, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/2.jpg", 
                    fullsize: "business card/2.jpg"
                },
                {
                    id: 3, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/3.jpg", 
                    fullsize: "business card/3.jpg"
                },
                {
                    id: 4, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/4.jpg", 
                    fullsize: "business card/4.jpg"
                },
            ]

            }
         else if (category === "Business Cards") {
            mockImages = [
                {
                    id: 1, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/1.jpg", 
                    fullsize: "business card/1.jpg"
                },
                {
                    id: 2, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/2.jpg", 
                    fullsize: "business card/2.jpg"
                },
                {
                    id: 3, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/3.jpg", 
                    fullsize: "business card/3.jpg"
                },
                {
                    id: 4, 
                    title: "", 
                    description: "", 
                    thumbnail: "business card/4.jpg", 
                    fullsize: "business card/4.jpg"
                },
            ]

            }

       

            

           /* Packaging Design */

            else if (category === "Packaging Design") {
                mockImages = [
                    {
                        id: 1, 
                        title: "", 
                        description: "", 
                        thumbnail: "packaging/1.jpg", 
                        fullsize: "packaging/1.jpg"
                    },
                    {
                        id: 2, 
                        title: "", 
                        description: "", 
                        thumbnail: "packaging/2.jpg", 
                        fullsize: "packaging/2.jpg"
                    }
                ]
    
                }

                /* Brochures*/

            else if (category === "Brochures") {
                mockImages = [
                    {
                        id: 1, 
                        title: "", 
                        description: "", 
                        thumbnail: "Brochures/1.jpg", 
                        fullsize: "Brochures/1.jpg"
                    },
                ]
    
                }

                else if (category === "Movie Posters") {
                    mockImages = [
                        {
                            id: 1, 
                            title: "", 
                            description: "", 
                            thumbnail: "posters/1.jpg", 
                            fullsize: "posters/1.jpg"
                        },
                        {
                            id: 2, 
                            title: "", 
                            description: "", 
                            thumbnail: "posters/2.jpg", 
                            fullsize: "posters/2.jpg"
                        },
                        {
                            id: 3, 
                            title: "", 
                            description: "", 
                            thumbnail: "posters/3.jpg", 
                            fullsize: "posters/3.jpg"
                        },
                        {
                            id: 4, 
                            title: "", 
                            description: "", 
                            thumbnail: "posters/4.jpg", 
                            fullsize: "posters/4.jpg"
                        },
                    ]
        
                    }

                    else if (category === "id cards") {
                        mockImages = [
                            {
                                id: 1, 
                                title: "", 
                                description: "", 
                                thumbnail: "id cards/1.jpg", 
                                fullsize: "id cards/1.jpg"
                            },
                            {
                                id: 2, 
                                title: "", 
                                description: "", 
                                thumbnail: "id cards/2.jpg", 
                                fullsize: "id cards/2.jpg"
                            },
                            {
                                id: 3, 
                                title: "", 
                                description: "", 
                                thumbnail: "id cards/3.jpg", 
                                fullsize: "id cards/3.jpg"
                            },
                            
                        ]
            
                        }
                        else if (category === "Billboards") {
                            mockImages = [
                                {
                                    id: 1, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "Billboards/1.jpg", 
                                    fullsize: "Billboards/1.jpg"
                                },
                                {
                                    id: 2, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "Billboards/2.jpg", 
                                    fullsize: "Billboards/2.jpg"
                                },
                                {
                                    id: 3, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "Billboards/3.jpg", 
                                    fullsize: "Billboards/3.jpg"
                                },
                                {
                                    id: 4, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "Billboards/4.jpg", 
                                    fullsize: "Billboards/4.jpg"
                                },
                                
                            ]
                
                            }
                     else if (category === "Website Layouts") {
                            mockImages = [
                                {
                                    id: 1, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/1.jpg", 
                                    fullsize: "website/1.jpg"
                                },
                                {
                                    id: 2, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/2.jpg", 
                                    fullsize: "website/2.jpg"
                                },
                                {
                                    id: 3, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/3.jpg", 
                                    fullsize: "website/3.jpg"
                                },
                                {
                                    id: 4, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/4.jpg", 
                                    fullsize: "website/4.jpg"
                                },

                                {
                                    id: 5, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/5.jpg", 
                                    fullsize: "website/5.jpg"
                                },

                                {
                                    id: 4, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/6.jpg", 
                                    fullsize: "website/6.jpg"
                                },

                                {
                                    id: 4, 
                                    title: "", 
                                    description: "", 
                                    thumbnail: "website/7.jpg", 
                                    fullsize: "website/7.jpg"
                                },
                                
                            ]
                
                            }
                    
            
            





        else {
            // Default images for other categories
            mockImages = [
                {
                    id: 1, 
                    title: `${category} Design 1`, 
                    description: "Professional design work", 
                    thumbnail: "ads/default1.jpg", 
                    fullsize: "ads/default1.jpg"
                },
                {
                    id: 2, 
                    title: `${category} Design 2`, 
                    description: "Creative concept", 
                    thumbnail: "ads/default2.jpg", 
                    fullsize: "ads/default2.jpg"
                }
            ];
        }
        
        currentGalleryImages = mockImages;
        renderGalleryImages(mockImages);
    }
   // Render gallery images
function renderGalleryImages(images) {
    galleryGrid.innerHTML = '';
    
    if (images.length === 0) {
        galleryGrid.innerHTML = '<div class="no-images">No images available for this category</div>';
        return;
    }
    
    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.thumbnail;
        img.alt = image.title;
        
        // Create a container to maintain aspect ratio
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        imageContainer.style.position = 'relative';
        imageContainer.style.paddingBottom = '100%'; // Default square aspect
        
        // Load image to get its dimensions
        const tempImg = new Image();
        tempImg.src = image.thumbnail;
        tempImg.onload = function() {
            const aspectRatio = (this.height / this.width) * 100;
            imageContainer.style.paddingBottom = `${aspectRatio}%`;
        };
        
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        overlay.textContent = image.title;
        
        imageContainer.appendChild(img);
        galleryItem.appendChild(imageContainer);
        galleryItem.appendChild(overlay);
        
        galleryItem.addEventListener('click', () => openPreview(index));
        
        galleryGrid.appendChild(galleryItem);
    });
}
    // Open full-screen preview
    function openPreview(index) {
        currentImageIndex = index;
        const image = currentGalleryImages[index];
        const previewImage = document.getElementById('preview-image');
        
        previewImage.src = image.fullsize;
        imageTitle.textContent = image.title;
        imageDescription.textContent = image.description;
        
        // Set initial animation
        previewImage.style.animation = 'slide-in-right 0.3s forwards';
        
        resetZoom();
        previewOverlay.style.display = 'flex';
    }

    // Navigate between images in preview
    function navigateImages(direction) {
        const container = document.querySelector('.preview-image-container');
        const currentImage = document.getElementById('preview-image');
        
        // Create animation classes based on direction
        const outAnimation = direction > 0 ? 'slide-out-left' : 'slide-out-right';
        const inAnimation = direction > 0 ? 'slide-in-right' : 'slide-in-left';
        
        // Apply exit animation to current image
        currentImage.style.animation = `${outAnimation} 0.3s forwards`;
        
        // After exit animation completes, update the image and show new one
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
            const image = currentGalleryImages[currentImageIndex];
            
            // Update image source and details
            currentImage.src = image.fullsize;
            imageTitle.textContent = image.title;
            imageDescription.textContent = image.description;
            
            // Reset position and apply enter animation
            currentImage.style.transform = 'translateX(0)';
            currentImage.style.animation = `${inAnimation} 0.3s forwards`;
            
            resetZoom();
        }, 300);
    }
    

    // Update zoom level
    function updateZoom(change) {
        currentZoomLevel = Math.max(0.5, Math.min(3, currentZoomLevel + change));
        previewImage.style.transform = `scale(${currentZoomLevel})`;
    }

    // Reset zoom
    function resetZoom() {
        currentZoomLevel = 1;
        previewImage.style.transform = 'scale(1)';
    }

    // Handle touchscreen zoom
    let touchStartDistance = 0;
    previewOverlay.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            touchStartDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
        }
    });

    previewOverlay.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            
            const touchDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            
            const delta = (touchDistance - touchStartDistance) / 100;
            
            if (Math.abs(delta) > 0.1) {
                updateZoom(delta);
                touchStartDistance = touchDistance;
            }
        }
    });

    // Handle wheel zoom
    previewOverlay.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        updateZoom(delta);
    });

    // Make gallery item draggable for mobile
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    previewImage.addEventListener('mousedown', startDrag);
    previewImage.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            startDrag(e.touches[0]);
        }
    });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length === 1 && isDragging) {
            drag(e.touches[0]);
        }
    });
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        if (currentZoomLevel > 1) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const transform = window.getComputedStyle(previewImage).getPropertyValue('transform');
            const matrix = new DOMMatrix(transform);
            startLeft = matrix.m41;
            startTop = matrix.m42;
            
            e.preventDefault();
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        previewImage.style.transform = `scale(${currentZoomLevel}) translate(${startLeft + dx}px, ${startTop + dy}px)`;
    }
    
    function endDrag() {
        isDragging = false;
    }
});





