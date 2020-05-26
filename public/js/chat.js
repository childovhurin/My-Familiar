const socket = io();
const chatSubmit = document.getElementById('chat-submit');
const chatInput = document.getElementById('chat-input');
const chatMessageDiv = document.querySelector('chat-message');
const usernameSubmit = document.getElementById('username-submit');

// Listener to send a message from client-side to the server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //scroll down to the current message
    // chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
});

// Submit the message
chatSubmit.addEventListener('click', (e) => {   
    e.preventDefault();
    
    // Gets message text
    let message = chatInput.value;
    
    // Emit message from client-side to the server
    socket.emit('chatMessage', message);
    chatInput.value = '';
});

// Gets the username
usernameSubmit.addEventListener('click', () => {
    console.log("clicked");
    const newUsername = document.getElementById('username-input').value;
    socket.emit('newUser', newUsername);
});

// This is the function for creating, formatting, and appending a message
function outputMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = `<p>${message.username} <span>${message.time}</span></p>
    <p class="message-text">
    ${message.text}
    </p>`;
    document.getElementById("chat-area").appendChild(messageDiv);
};

