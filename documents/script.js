document.addEventListener('DOMContentLoaded', function() {
    const sheetID = "1y7fSHzNBGXmcrQ_BYtMPOXg9WxcE3V36uBuxp49eNeE";
    const sheetName = "Documents";
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

    fetch(url)
      .then(res => res.text())
      .then(data => {
        const jsonData = JSON.parse(data.substr(47).slice(0, -2));
        const rows = jsonData.table.rows;
        const container = document.getElementById("stories-container");

        // 1. First filter out rows with empty dates
        // 2. Then sort by date (newest first)
        // 3. Then process the sorted array
        const sortedRows = rows
          .filter(row => row.c[1]?.v) // Filter rows with dates
          .sort((a, b) => {
            const dateA = new Date(a.c[1].v);
            const dateB = new Date(b.c[1].v);
            return dateB - dateA; // Sort newest first
          });

        // Now process the sorted rows
        sortedRows.forEach((row, index) => {
          const title = row.c[0]?.v || "Untitled";
          const date = row.c[1]?.v || "";
          const content = row.c[2]?.v || "";
          const storyId = `story-${index}`;

          const storyElement = document.createElement('div');
          storyElement.className = 'story';
          storyElement.id = storyId;
          
          storyElement.innerHTML = `
            <div class="story-title">${title}</div>
            <div class="story-date">${date}</div>
            <div class="story-content">
              <div class="content-preview">${content.length > 200 ? content.substring(0, 200) + '...' : content}</div>
              ${content.length > 200 ? '<button class="toggle-content-btn">See more</button>' : ''}
            </div>
            <div class="story-footer">
              <i class="far fa-heart like-btn"></i>
            </div>
          `;

          container.appendChild(storyElement);

          // Rest of your event listener code remains the same...
          if (content.length > 200) {
            const button = storyElement.querySelector('.toggle-content-btn');
            const contentPreview = storyElement.querySelector('.content-preview');
            
            contentPreview.dataset.fullContent = content;
            
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
        });
      })
      .catch(error => {
        console.error('Error loading stories:', error);
        document.getElementById("stories-container").innerHTML = 
          '<div class="story">Error loading stories. Please try again later.</div>';
      });
});