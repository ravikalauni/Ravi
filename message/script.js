// Configuration
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNbkeD9qLGCTeX3Wj5UjDA0FELIgYOZj-rTfF9U2FEiusGo8n5zinTnKCmPZRN3M4w/exec'; // Replace with your new URL
let currentIdentity = 'Anonymous';

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const identityToggle = document.getElementById('identityToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Create identity toggle if it doesn't exist in HTML
  if (!identityToggle) {
    createIdentityToggle();
  }
  loadMessages();
  setInterval(loadMessages, 3000);
});

function createIdentityToggle() {
  const messageContainer = document.querySelector('.message-container') || document.createElement('div');
  messageContainer.className = 'message-container';
  messageContainer.innerHTML = `
    <p class="message-info">
      Only your message will be visible to him. Your name stays private unless you decide to reveal it.
    </p>
    <div class="identity-toggle">
      <label class="toggle-switch">
        <input type="checkbox" id="identityToggle">
        <span class="toggle-slider"></span>
      </label>
      <span class="toggle-label">Let him know your identity</span>
    </div>
    <p class="privacy-note">
      When enabled, your profile name and photo will be visible to Ravi.
    </p>
  `;
  document.querySelector('.profile-section').after(messageContainer);
}

// Back button
document.querySelector('.back-arrow').addEventListener('click', () => {
  window.history.back();
});

// Identity toggle
document.addEventListener('change', function(e) {
  if (e.target.id === 'identityToggle') {
    currentIdentity = e.target.checked ? 'You' : 'Anonymous';
    const privacyNote = document.querySelector('.privacy-note');
    privacyNote.textContent = e.target.checked ? 
      'Your profile name and photo will be visible to Ravi.' : 
      'When enabled, your profile name and photo will be visible to Ravi.';
  }
});

// Message input
messageInput.addEventListener('input', function() {
  sendButton.disabled = this.value.trim() === '';
});

messageInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter' && !sendButton.disabled) {
    sendMessage();
  }
});

// Send button
sendButton.addEventListener('click', sendMessage);

// Functions
async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: currentIdentity,
        message: message
      })
    });

    const result = await response.json();
    if (result.success) {
      messageInput.value = '';
      sendButton.disabled = true;
      loadMessages();
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message. Please try again.');
  }
}

async function loadMessages() {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=getMessages`);
    const data = await response.json();
    
    chatContainer.innerHTML = '';
    
    if (Array.isArray(data)) {
      data.forEach(msg => {
        // User's messages (left side)
        if (msg.sender === currentIdentity || msg.sender === 'Anonymous') {
          addMessageToChat(msg.message, 'sent', msg.timestamp);
        }
        
        // Replies (right side)
        if (msg.reply) {
          addMessageToChat(msg.reply, 'received', msg.timestamp);
        }
      });
    }
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

function addMessageToChat(text, type, timestamp) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `
    <div>${text}</div>
    <div class="message-timestamp">${formatTime(timestamp)}</div>
  `;
  chatContainer.appendChild(messageDiv);
}

function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}