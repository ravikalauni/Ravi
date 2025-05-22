document.addEventListener('DOMContentLoaded', function() {
  const sheetID = "1y7fSHzNBGXmcrQ_BYtMPOXg9WxcE3V36uBuxp49eNeE";
  const sheetName = "Documents";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;
  
  let allStories = [];
  let currentSortOrder = 'newest';
  const modal = document.getElementById('share-modal');
  const closeModal = document.querySelector('.close-modal');
  const shareUrlInput = document.getElementById('share-url');
  const copyUrlBtn = document.getElementById('copy-url');

  // Show loading skeleton
  const container = document.getElementById("stories-container");
  container.innerHTML = `
    <div class="skeleton-loading">
      <div class="skeleton-story">
        <div class="skeleton-title"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content" style="width: 80%"></div>
        <div class="skeleton-content" style="width: 60%"></div>
        <div class="skeleton-footer"></div>
      </div>
      <div class="skeleton-story">
        <div class="skeleton-title"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content" style="width: 70%"></div>
        <div class="skeleton-footer"></div>
      </div>
    </div>
  `;

  // Check URL for story hash and scroll to it
 function checkForStoryHash() {
  const hash = window.location.hash;
  if (hash) {
    const storyElement = document.getElementById(hash.substring(1));
    if (storyElement) {
      setTimeout(() => {
        // Scroll to the element with some offset from top
        window.scrollTo({
          top: storyElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Add highlight class
        storyElement.classList.add('highlight-story');
        
        // Remove the class after animation completes
        setTimeout(() => {
          storyElement.classList.remove('highlight-story');
        }, 2000);
      }, 500);
    }
  }
}

  // Modal functionality
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  copyUrlBtn.addEventListener('click', () => {
    shareUrlInput.select();
    document.execCommand('copy');
    copyUrlBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyUrlBtn.textContent = 'Copy';
    }, 2000);
  });

  fetch(url)
    .then(res => res.text())
    .then(data => {
      const jsonData = JSON.parse(data.substr(47).slice(0, -2));
      const rows = jsonData.table.rows;
      
      allStories = rows
  .filter(row => row.c[1]?.v)
  .map((row) => {
    // Generate a stable ID from the title (convert to lowercase, replace spaces with dashes)
    const idFromTitle = row.c[0]?.v 
      ? row.c[0].v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : `story-${Date.now()}`;
    
    return {
      title: row.c[0]?.v || "Untitled",
      date: row.c[1]?.v || "",
      content: row.c[2]?.v || "",
      tags: row.c[3]?.v || "",
      id: idFromTitle
    };
  });
      
      renderStories(allStories, 'newest');
      checkForStoryHash();
      
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        if (searchTerm === '') {
          renderStories(allStories, currentSortOrder);
        } else {
          const filteredStories = allStories.filter(story => 
            story.title.toLowerCase().includes(searchTerm) ||
            (story.tags && story.tags.toLowerCase().includes(searchTerm))
          );
          renderStories(filteredStories, currentSortOrder);
        }
      });
      
      const sortToggle = document.getElementById('sort-toggle');
      sortToggle.addEventListener('click', function() {
        currentSortOrder = currentSortOrder === 'newest' ? 'oldest' : 'newest';
        const storiesToRender = currentSortOrder === 'newest' 
          ? [...allStories] 
          : [...allStories].reverse();
        
        renderStories(storiesToRender, currentSortOrder);
        
        if (currentSortOrder === 'newest') {
          this.innerHTML = '<i class="fas fa-sort-amount-down"></i> Newest First';
        } else {
          this.innerHTML = '<i class="fas fa-sort-amount-up"></i> Oldest First';
        }
      });
    })
    .catch(error => {
      console.error('Error loading stories:', error);
      container.innerHTML = 
        '<div class="story">Error loading stories. Please try again later.</div>';
    });
  
  function renderStories(stories, sortOrder) {
    const container = document.getElementById("stories-container");
    
    if (stories.length === 0) {
      container.innerHTML = '<div class="story">No stories found matching your search.</div>';
      return;
    }
    
    container.innerHTML = '';
    
    const sortedStories = [...stories].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    sortedStories.forEach((story) => {
      const storyElement = document.createElement('div');
      storyElement.className = 'story';
      storyElement.id = story.id;
      
      storyElement.innerHTML = `
        <div class="story-title">${story.title}</div>
        <div class="story-date">${story.date}</div>
        <div class="story-content">
          <div class="content-preview">${story.content.length > 200 ? story.content.substring(0, 200) + '...' : story.content}</div>
          ${story.content.length > 200 ? '<button class="toggle-content-btn">See more</button>' : ''}
        </div>
        <div class="story-footer">
          <button class="share-btn">
            <i class="fas fa-share-alt"></i> Share
          </button>
          <i class="far fa-heart like-btn"></i>
        </div>
      `;
      
      container.appendChild(storyElement);
      
      if (story.content.length > 200) {
        const button = storyElement.querySelector('.toggle-content-btn');
        const contentPreview = storyElement.querySelector('.content-preview');
        
        contentPreview.dataset.fullContent = story.content;
        
        button.addEventListener('click', function() {
          if (button.textContent === 'See more') {
            contentPreview.textContent = contentPreview.dataset.fullContent;
            button.textContent = 'See less';
          } else {
            contentPreview.textContent = contentPreview.dataset.fullContent.substring(0, 200) + '...';
            button.textContent = 'See more';
          }
        });
      }
      
      const likeBtn = storyElement.querySelector('.like-btn');
      likeBtn.addEventListener('click', function() {
        this.classList.toggle('far');
        this.classList.toggle('fas');
        this.classList.toggle('liked');
      });
      
      // Add share functionality
      const shareBtn = storyElement.querySelector('.share-btn');
      shareBtn.addEventListener('click', () => {
        const storyUrl = `${window.location.origin}${window.location.pathname}#${story.id}`;
        shareUrlInput.value = storyUrl;
        modal.style.display = 'block';
      });
    });
  }
});

// Add this near the top with your other DOM element selections
const goToTopBtn = document.getElementById('go-to-top');

// Add this scroll event listener (can go near the bottom with your other event listeners)
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    goToTopBtn.classList.add('visible');
  } else {
    goToTopBtn.classList.remove('visible');
  }
});

// Add click handler for the button
goToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
