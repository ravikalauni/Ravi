document.addEventListener('DOMContentLoaded', function() {
  const sheetID = "1y7fSHzNBGXmcrQ_BYtMPOXg9WxcE3V36uBuxp49eNeE";
  const sheetName = "Documents";
  const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;
  
  let allStories = [];
  let currentSortOrder = 'newest'; // 'newest' or 'oldest'

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

  fetch(url)
    .then(res => res.text())
    .then(data => {
      const jsonData = JSON.parse(data.substr(47).slice(0, -2));
      const rows = jsonData.table.rows;
      
      // Process all rows - assuming structure: Title, Date, Content, Tags
      allStories = rows
        .filter(row => row.c[1]?.v) // Filter rows with dates
        .map((row, index) => {
          return {
            title: row.c[0]?.v || "Untitled",
            date: row.c[1]?.v || "",
            content: row.c[2]?.v || "",
            tags: row.c[3]?.v || "", // Hidden tags column
            id: `story-${index}`
          };
        });
      
      // Initial render with newest first
      renderStories(allStories, 'newest');
      
      // Set up search functionality (searches title and hidden tags)
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
      
      // Set up sort toggle
      const sortToggle = document.getElementById('sort-toggle');
      sortToggle.addEventListener('click', function() {
        currentSortOrder = currentSortOrder === 'newest' ? 'oldest' : 'newest';
        const storiesToRender = currentSortOrder === 'newest' 
          ? [...allStories] 
          : [...allStories].reverse();
        
        renderStories(storiesToRender, currentSortOrder);
        
        // Update button text and icon
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
    
    // Sort stories based on the current sort order
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
          <i class="far fa-heart like-btn"></i>
        </div>
      `;
      
      container.appendChild(storyElement);
      
      // Set up toggle content button if needed
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
      
      // Set up like button
      const likeBtn = storyElement.querySelector('.like-btn');
      likeBtn.addEventListener('click', function() {
        this.classList.toggle('far');
        this.classList.toggle('fas');
        this.classList.toggle('liked');
      });
    });
  }
});
