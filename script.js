const chatHistory = document.getElementById('chat-history');
const audioFile = document.getElementById('audio-file');
const sendAudioButton = document.getElementById('send-audio');

sendAudioButton.addEventListener('click', () => {
  const file = audioFile.files[0];
  if (!file) {
    alert('Please select an audio file.');
    return;
  }

  // Send audio file to backend using FormData and fetch API
  const formData = new FormData();
  formData.append('audio', file);

  fetch('/talk', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    displayMessage(data.message, 'assistant');
  })
  .catch(error => {
    console.error('Error sending audio:', error);
  });
});

function displayMessage(message, role) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(role);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
}