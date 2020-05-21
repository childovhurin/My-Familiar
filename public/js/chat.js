const socket = io();
const chatSubmit = document.getElementById('chat-submit');
const chatInput = document.getElementById('chat-input');
const chatMessageDiv = document.querySelector('chat-message');
const usernameSubmit = document.getElementById('username-submit');

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    //scroll down to the current message
    // chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
});

//message submit 
chatSubmit.addEventListener('click', (e) => {   
    e.preventDefault();
    //get message text
    let message = chatInput.value;
    //emit message to server
    socket.emit('chatMessage', message);
    chatInput.value = '';
});

//get username
usernameSubmit.addEventListener('click', () => {
    console.log("clicked");
    const newUsername = document.getElementById('username-input').value;
    socket.emit('newUser', newUsername);
});

function outputMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = `<p>${message.username} <span>${message.time}</span></p>
    <p class="message-text">
    ${message.text}
    </p>`;
    document.getElementById("chat-area").appendChild(messageDiv);
};

