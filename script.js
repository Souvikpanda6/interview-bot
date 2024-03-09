const chatHistory = document.getElementById('chat-history');
const recordAudioButton = document.getElementById('record-audio');

recordAudioButton.addEventListener('click', async () => {
  // Request microphone access
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Create a MediaRecorder instance
  const recorder = new MediaRecorder(stream);

  // Define chunks array to store audio data
  const chunks = [];

  recorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  recorder.onstop = async () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });

    // Convert blob to base64 (optional)
    // const reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = () => {
    //   const base64Audio = reader.result;
    //   // Send base64 audio to backend (adapt based on your backend)
    // };

    // Send audio data to backend (adapt based on your backend)
    const formData = new FormData();
    formData.append('audio', blob);

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
  };

  // Start recording
  recorder.start();

  // Stop recording after a set duration (optional)
  // setTimeout(() => recorder.stop(), 5000); // Record for 5 seconds
});

function displayMessage(message, role) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(role);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
}