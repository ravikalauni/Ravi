
const sheetID = "1-BUGnu2jkfh8mhV9DF5cbfm4KkBOMzqHAusOREjS010";
const sheetName = "insights";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    const jsonData = JSON.parse(data.substr(47).slice(0, -2));
    const rows = jsonData.table.rows;

    let html = `
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>INSIGHTS</th>
            <th>VISUALS</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Reverse the rows to show latest first
    const reversedRows = [...rows].reverse();

    reversedRows.forEach(row => {
      const date = row.c[0]?.v || "";
      const insight = row.c[1]?.v || "";
      const visual = row.c[2]?.v || "";
      
      let visualContent = 'No Visual';
      if (visual.toLowerCase().includes("http") || visual.toLowerCase().includes("image")) {
        visualContent = `<button class="view-visual-btn" data-img="${visual}">View Visual</button>`;
      }

      html += `
        <tr>
          <td>${date}</td>
          <td>${insight}</td>
          <td>${visualContent}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    document.getElementById("sheet-data").innerHTML = html;

    // Add event listeners to all view buttons
    document.querySelectorAll('.view-visual-btn').forEach(button => {
      button.addEventListener('click', () => {
        const imgUrl = button.getAttribute('data-img');
        const modal = document.createElement('div');
        modal.className = 'visual-modal';
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imgUrl}" alt="Visual Insight">
          </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
          modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      });
    });
  });
