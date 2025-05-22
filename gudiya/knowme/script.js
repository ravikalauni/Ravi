document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzL84nzLxmgELrTo1tYCDGIfaNZMNTs4dXn0Z1Mu8aeRF6akUDK2k-N56vNFp307AYx/exec';
    
    // Conversation state
    let conversationId = generateId();
    let isTyping = false;
    
    // Initialize chat
    initChat();
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Menu toggle
    window.toggleMenu = function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    };
    
    // Initialize chat with welcome message
    function initChat() {
        // Load any saved messages from localStorage
        loadChatHistory();
        
        // If no history, show welcome message
        if (messagesContainer.children.length <= 1) {
            setTimeout(() => {
                addBotMessage(`Hi there! I'm Gudiya. I can help you analyze your connection with Ravi. 
                <br><br>Just tell me your name and I'll share what I know about your relationship with him.`);
                
                // Show quick reply suggestions after a delay
                setTimeout(() => {
                    showQuickReplies(['How does Ravi know me?', 'When did we meet?', 'What does Ravi think of me?']);
                }, 1000);
            }, 1000);
        }
    }
    
    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        messageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message after a short delay
        setTimeout(() => {
            processUserMessage(message);
        }, 500);
    }
    
    // Process user message and generate response
    async function processUserMessage(message) {
        hideTypingIndicator();
        
        try {
            // Check if it's a simple greeting
            if (isGreeting(message)) {
                addBotMessage(getRandomResponse([
                    "Hello again! How can I help you with Ravi today?",
                    "Hi there! What would you like to know about your connection with Ravi?",
                    "Nice to hear from you! Ask me anything about Ravi."
                ]));
                return;
            }
            
            // Check if it's a name (simple check for demonstration)
            if (message.split(' ').length <= 2 && /^[a-zA-Z ]+$/.test(message)) {
                // This is likely a name - process it
                const name = message.trim();
                
                // Show "Thinking..." message
                const thinkingMsg = addBotMessage("Let me think about that...", true);
                
                try {
                    // Fetch data from Google Apps Script
                    const response = await fetch(`${scriptURL}?action=getData&name=${encodeURIComponent(name)}`);
                    const data = await response.json();
                    
                    // Remove thinking message
                    thinkingMsg.remove();
                    
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    
                    if (data.length > 0) {
                        const person = data[0];
                        let responseHtml = `
                            <strong>About ${person.name}</strong><br><br>
                            ${person.description || "I have some information about this person."}`;
                        
                        if (person.relationship) {
                            responseHtml += `<br><br><b>Relationship:</b> ${person.relationship}`;
                        }
                        
                        if (person.first_met) {
                            responseHtml += `<br><b>First met:</b> ${person.first_met}`;
                        }
                        
                        if (person.ravi_perception) {
                            responseHtml += `<br><b>Ravi's perception:</b> ${person.ravi_perception}`;
                        }
                        
                        addBotMessage(responseHtml);
                        
                        // Show follow-up questions
                        showQuickReplies([
                            'Tell me more',
                            'How accurate is this?',
                            'What else do you know?'
                        ]);
                    } else {
                        addBotMessage(`I don't have any information about ${name}. Could you check the spelling or try a different name?`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    addBotMessage(`Sorry, I encountered an error while processing your request. Please try again later.`);
                }
            } else {
                // Not a name - generic response
                addBotMessage(`I specialize in analyzing connections with Ravi. To get started, please tell me your name.`);
            }
        } catch (error) {
            console.error('Error:', error);
            addBotMessage(`Sorry, I encountered an error. Please try again.`);
        }
    }
    
    // Helper functions
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            ${text}
            <div class="message-meta">
                <span class="message-time">${getCurrentTime()}</span>
                <span class="status-indicator"><i class="fas fa-check"></i></span>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        saveChatHistory();
    }
    
    function addBotMessage(text, isTemp = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            ${text}
            <div class="message-meta">${getCurrentTime()}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        
        if (!isTemp) {
            saveChatHistory();
        }
        
        return messageDiv;
    }
    
    function showTypingIndicator() {
        if (isTyping) return;
        
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }
    
    function hideTypingIndicator() {
        isTyping = false;
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }
    
    function showQuickReplies(replies) {
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'quick-replies';
        
        replies.forEach(reply => {
            const replyBtn = document.createElement('div');
            replyBtn.className = 'quick-reply';
            replyBtn.textContent = reply;
            replyBtn.addEventListener('click', () => {
                addUserMessage(reply);
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    processQuickReply(reply);
                }, 1000);
            });
            repliesContainer.appendChild(replyBtn);
        });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.appendChild(repliesContainer);
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        saveChatHistory();
    }
    
    function processQuickReply(reply) {
        // Simple processing for quick replies
        switch(reply) {
            case 'How does Ravi know me?':
                addBotMessage("Ravi knows you through mutual connections, work, or social events. I can give more details if you share your name.");
                break;
            case 'When did we meet?':
                addBotMessage("The exact time you met Ravi depends on your connection. Tell me your name and I can check!");
                break;
            case 'What does Ravi think of me?':
                addBotMessage("Ravi's perception varies based on the person. Share your name and I'll tell you what I know.");
                break;
            default:
                addBotMessage("Just enter your name, I analyse and answer it.");
        }
    }
    
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    function generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    function isGreeting(message) {
        const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        return greetings.includes(message.toLowerCase());
    }
    
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Chat history functions
    function saveChatHistory() {
        const messages = messagesContainer.innerHTML;
        localStorage.setItem(`gudiyaChat_${conversationId}`, messages);
    }
    
    function loadChatHistory() {
        const savedMessages = localStorage.getItem(`gudiyaChat_${conversationId}`);
        if (savedMessages) {
            messagesContainer.innerHTML = savedMessages;
            scrollToBottom();
        }
    }
    
    window.clearChat = function() {
        if (confirm('Are you sure you want to clear this chat?')) {
            messagesContainer.innerHTML = '';
            conversationId = generateId();
            localStorage.removeItem(`gudiyaChat_${conversationId}`);
            initChat();
        }
    };
});
