// Get the necessary HTML elements
const homeScreen = document.querySelector('.home-screen');
const nameForm = document.querySelector('form');
const gameScreen = document.querySelector('.game-screen');
const generateButton = document.getElementById('generate-button');
const numberOutput = document.getElementById('number-output');
const numberIndex = document.getElementById('number-index');

// Initialize an empty array to keep track of generated numbers
let generatedNumbers = [];

// Function to generate a random number between 1 and 1000
function generateNumber() {
  let number = Math.floor(Math.random() * 1000) + 1;
  }
  // Add the number to the generatedNumbers array
  generatedNumbers.push(number);
  // Update the UI with the generated number and the number index
  numberOutput.innerText = number;
  const indexItem = numberIndex.children[number - 1];
  indexItem.style.backgroundColor = 'green';
  // If all 1000 numbers have been generated, send a message to the Discord webhook
  if (generatedNumbers.length === 1000) {
    const username = localStorage.getItem('username');
    const webhookUrl = 'https://discord.com/api/webhooks/1076179716337303593/O-o8ISaDgHsupAkcKKzlEjlLYtdSDkwRqb0uqtCDEDJ8nqJtOK5aZh999vUOS9SU7luA';
    const message = `${username} has completed the game!`;
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message })
    });
  }
}

// Event listener for the name form submission
nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();
  localStorage.setItem('username', name);
  homeScreen.style.display = 'none';
  gameScreen.style.display = 'block';
});

// Event listener for the generate button
generateButton.addEventListener('click', generateNumber);

// Populate the number index list with 1000 items
for (let i = 1; i <= 1000; i++) {
  const item = document.createElement('li');
  item.innerText = i;
  numberIndex.appendChild(item);
}
