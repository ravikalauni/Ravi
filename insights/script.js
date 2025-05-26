const sheetID = "1-BUGnu2jkfh8mhV9DF5cbfm4KkBOMzqHAusOREjS010";
const sheetName = "insights";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

let allImages = []; // Store all images for gallery navigation
let currentModal = null; // Track current modal for keyboard events

// Show loading spinner initially
document.getElementById("sheet-data").innerHTML = `
  <div style="text-align: center;">
    <div class="loading-spinner"></div>
    <p style="margin-top: 1rem; color: #555;">Loading insights...</p>
  </div>
`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    const jsonData = JSON.parse(data.substr(47).slice(0, -2));
    const rows = jsonData.table.rows;

    let html = `
      <table>
        <thead>
          <tr>
            <th><i class="far fa-calendar-alt"></i> DATE</th>
            <th><i class="far fa-lightbulb"></i> INSIGHTS</th>
            <th><i class="far fa-image"></i> VISUALS</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Reverse the rows to show latest first
    const reversedRows = [...rows].reverse();

    reversedRows.forEach((row, index) => {
      const date = row.c[0]?.v || "";
      const insight = row.c[1]?.v || "";
      const visual = row.c[2]?.v || "";
      
      let visualContent = '<div style="text-align: center; color: #999;"><i class="far fa-image fa-lg"></i><br>No Visual</div>';
      if (visual.toLowerCase().includes("http")) {
        // Store image data for gallery
        allImages.push({
          url: visual,
          date: date,
          insight: insight
        });
        
        // Create thumbnail preview
        visualContent = `
          <div class="thumbnail-container" data-index="${allImages.length - 1}">
            <img src="${visual}" alt="Visual Insight" class="thumbnail-img" loading="lazy">
            <div class="thumbnail-overlay">
              <i class="fas fa-expand"></i> View
            </div>
          </div>
        `;
      }

      html += `
        <tr>
          <td><strong>${date}</strong></td>
          <td>${insight}</td>
          <td>${visualContent}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    document.getElementById("sheet-data").innerHTML = html;

    // Add event listeners to all thumbnails
    document.querySelectorAll('.thumbnail-container').forEach(container => {
      container.addEventListener('click', (e) => {
        const index = parseInt(container.getAttribute('data-index'));
        openGallery(index);
      });
    });

    // Initialize search functionality
    initSearch(reversedRows);
    
    // Add animation to table rows
    animateTableRows();
  })
  .catch(error => {
    console.error('Error loading data:', error);
    document.getElementById("sheet-data").innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
        Failed to load data. Please try again later.
        <button onclick="window.location.reload()" style="margin-top: 10px; background: var(--primary-color); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
          <i class="fas fa-sync-alt"></i> Retry
        </button>
      </div>
    `;
  });

function animateTableRows() {
  const rows = document.querySelectorAll('tbody tr');
  rows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    row.style.transition = `all 0.3s ease ${index * 0.05}s`;
    
    // Trigger reflow to enable animation
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }, 10);
  });
}

function openGallery(index) {
  // Close any existing modal
  if (currentModal) {
    currentModal.remove();
    document.body.style.overflow = '';
  }
  
  const modal = document.createElement('div');
  modal.className = 'visual-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="gallery-nav prev" title="Previous (←)"><i class="fas fa-chevron-left"></i></div>
      <div class="gallery-nav next" title="Next (→)"><i class="fas fa-chevron-right"></i></div>
      <div class="gallery-counter">${index + 1} / ${allImages.length}</div>
      <div class="gallery-image-container">
        <img src="${allImages[index].url}" alt="Visual Insight" class="gallery-image">
      </div>
      <div class="gallery-info">
        <div class="gallery-date"><i class="far fa-calendar-alt"></i> ${allImages[index].date}</div>
        <div class="gallery-insight"><i class="far fa-lightbulb"></i> ${allImages[index].insight}</div>
      </div>
      <div class="zoom-controls">
        <button class="zoom-in" title="Zoom In (+)"><i class="fas fa-search-plus"></i></button>
        <button class="zoom-out" title="Zoom Out (-)"><i class="fas fa-search-minus"></i></button>
        <button class="zoom-reset" title="Reset Zoom (0)"><i class="fas fa-sync-alt"></i></button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  currentModal = modal;
  
  const imageContainer = modal.querySelector('.gallery-image-container');
  const image = modal.querySelector('.gallery-image');
  let currentIndex = index;
  let scale = 1;
  
  // Close modal
  modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
    currentModal = null;
  });
  
  // Close when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.style.overflow = '';
      currentModal = null;
    }
  });
  
  // Navigation
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const counter = modal.querySelector('.gallery-counter');
  
  function updateImage() {
    // Show loading state
    image.src = '';
    image.style.opacity = '0';
    
    const img = new Image();
    img.src = allImages[currentIndex].url;
    img.onload = () => {
      image.src = allImages[currentIndex].url;
      image.style.opacity = '1';
      modal.querySelector('.gallery-date').innerHTML = `<i class="far fa-calendar-alt"></i> ${allImages[currentIndex].date}`;
      modal.querySelector('.gallery-insight').innerHTML = `<i class="far fa-lightbulb"></i> ${allImages[currentIndex].insight}`;
      counter.textContent = `${currentIndex + 1} / ${allImages.length}`;
      
      // Reset zoom when changing images
      scale = 1;
      image.style.transform = `scale(${scale})`;
    };
    img.onerror = () => {
      image.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="%23ccc"><rect width="100" height="100"/><text x="50" y="50" font-family="Arial" font-size="12" fill="%23666" text-anchor="middle" dominant-baseline="middle">Image failed to load</text></svg>';
      image.style.opacity = '1';
    };
  }
  
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < allImages.length - 1) {
      currentIndex++;
      updateImage();
    }
  });
  
  // Zoom controls
  const zoomIn = modal.querySelector('.zoom-in');
  const zoomOut = modal.querySelector('.zoom-out');
  const zoomReset = modal.querySelector('.zoom-reset');
  
  zoomIn.addEventListener('click', (e) => {
    e.stopPropagation();
    scale += 0.2;
    image.style.transform = `scale(${scale})`;
  });
  
  zoomOut.addEventListener('click', (e) => {
    e.stopPropagation();
    if (scale > 0.3) {
      scale -= 0.2;
      image.style.transform = `scale(${scale})`;
    }
  });
  
  zoomReset.addEventListener('click', (e) => {
    e.stopPropagation();
    scale = 1;
    image.style.transform = `scale(${scale})`;
  });
  
  // Image zoom on click
  image.addEventListener('click', (e) => {
    e.stopPropagation();
    if (scale === 1) {
      scale = 2;
    } else {
      scale = 1;
    }
    image.style.transform = `scale(${scale})`;
  });
  
  // Keyboard navigation
  function handleKeyDown(e) {
    if (!modal) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          currentIndex--;
          updateImage();
        }
        break;
      case 'ArrowRight':
        if (currentIndex < allImages.length - 1) {
          currentIndex++;
          updateImage();
        }
        break;
      case '+':
      case '=':
        scale += 0.2;
        image.style.transform = `scale(${scale})`;
        break;
      case '-':
      case '_':
        if (scale > 0.3) {
          scale -= 0.2;
          image.style.transform = `scale(${scale})`;
        }
        break;
      case '0':
      case ')':
        scale = 1;
        image.style.transform = `scale(${scale})`;
        break;
      case 'Escape':
        modal.remove();
        document.body.style.overflow = '';
        currentModal = null;
        document.removeEventListener('keydown', handleKeyDown);
        break;
    }
  }
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Show modal with animation
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Preload next and previous images
  if (currentIndex > 0) {
    const prevImg = new Image();
    prevImg.src = allImages[currentIndex - 1].url;
  }
  if (currentIndex < allImages.length - 1) {
    const nextImg = new Image();
    nextImg.src = allImages[currentIndex + 1].url;
  }
}

function initSearch(rows) {
  const searchInput = document.getElementById('search-input');
  const suggestionsContainer = document.getElementById('search-suggestions');
  
  searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = '';
    
    if (query.length < 2) {
      suggestionsContainer.style.display = 'none';
      return;
    }
    
    const matches = rows.filter(row => {
      const date = row.c[0]?.v?.toString().toLowerCase() || '';
      const insight = row.c[1]?.v?.toString().toLowerCase() || '';
      return date.includes(query) || insight.includes(query);
    });
    
    if (matches.length > 0) {
      matches.slice(0, 5).forEach(match => {
        const date = match.c[0]?.v || '';
        const insight = match.c[1]?.v || '';
        const div = document.createElement('div');
        div.innerHTML = `
          <div style="font-weight: 600;">${date}</div>
          <div style="font-size: 0.875rem; color: #666; margin-top: 4px;">
            ${insight.substring(0, 60)}${insight.length > 60 ? '...' : ''}
          </div>
        `;
        div.addEventListener('click', () => {
          searchInput.value = date;
          suggestionsContainer.style.display = 'none';
          // Scroll to the row
          const table = document.querySelector('table');
          const rows = table.querySelectorAll('tbody tr');
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].textContent.trim() === date.trim()) {
              rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
              rows[i].style.backgroundColor = '#f1f8e9';
              rows[i].style.transition = 'background-color 1.5s ease';
              setTimeout(() => {
                rows[i].style.backgroundColor = '';
              }, 1500);
              break;
            }
          }
        });
        suggestionsContainer.appendChild(div);
      });
      suggestionsContainer.style.display = 'block';
    } else {
      suggestionsContainer.style.display = 'none';
    }
  }, 300));
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target !== searchInput && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = 'none';
    }
  });
  
  // Debounce function to limit how often a function is called
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}
