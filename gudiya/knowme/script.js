document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar menu
    function toggleMenu() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }
    window.toggleMenu = toggleMenu;

    // Form submission handler
    const form = document.getElementById('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        checkName();
    });

    // Google Apps Script URL (replace with your deployed URL)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzL84nzLxmgELrTo1tYCDGIfaNZMNTs4dXn0Z1Mu8aeRF6akUDK2k-N56vNFp307AYx/exec';

    async function checkName() {
        const nameInput = document.getElementById('nameInput');
        const resultDiv = document.getElementById('result');
        const name = nameInput.value.trim();

        if (!name) {
            resultDiv.textContent = "Please enter a name to search.";
            return;
        }

        resultDiv.textContent = "Thinking...";
        
        try {
            // First test with a simple GET request
            const testResponse = await fetch(scriptURL);
            if (!testResponse.ok) {
                throw new Error(`Server responded with status: ${testResponse.status}`);
            }
            
            // If basic test works, try with parameters
            const response = await fetch(`${scriptURL}?action=getData&name=${encodeURIComponent(name)}`);
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            if (data.length > 0) {
                const person = data[0];
                resultDiv.innerHTML = `
                    <strong>${person.name}</strong><br>
                    ${person.description || "No additional information available."}<br><br>
                    ${person.relationship ? `<b>Relationship:</b> ${person.relationship}<br>` : ''}
                    ${person.first_met ? `<b>First met:</b> ${person.first_met}<br>` : ''}
                    ${person.ravi_perception ? `<b>Ravi sees them as:</b> ${person.ravi_perception}` : ''}
                `;
            } else {
                resultDiv.textContent = `Sorry, there is no information available about ${name}. Please make sure the spelling is correct or that a person named ${name} actually exists.`;
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = `
                Error: ${error.message}<br><br>
                Your messege did not get due to some issues. Please try again...
            `;
        }

        nameInput.value = '';
    }

    window.checkName = checkName;
});
