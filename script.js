// get name form and input
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name");

// get game elements
const gameDiv = document.getElementById("game");
const playerName = document.getElementById("player-name");
const generateBtn = document.getElementById("generate-btn");
const generatedNum = document.getElementById("generated-num");
const numInfo = document.getElementById("num-info");

let playerNameValue;
let generatedNums = new Set();

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  playerNameValue = nameInput.value.trim();
  if (playerNameValue) {
    playerName.textContent = playerNameValue;
    nameForm.reset();
    showGame();
  }
});

function showGame() {
  document.getElementById("home").style.display = "none";
  gameDiv.style.display = "block";
}

function generateNumber() {
  let num = Math.floor(Math.random() * 1000) + 1;
  while (generatedNums.has(num)) {
    num = Math.floor(Math.random() * 1000) + 1;
  }
  generatedNums.add(num);
  return num;
}

generateBtn.addEventListener("click", () => {
  const num = generateNumber();
  generatedNum.textContent = `Generated Number: ${num}`;
  numInfo.textContent = `Number ${num} has been generated!`;
  document.getElementById(`num-${num}`).style.backgroundColor = "green";
  if (generatedNums.size === 1000) {
    const webhookUrl = "YOUR_WEBHOOK_URL";
    const message = `${playerNameValue} has completed the game!`;
    sendWebhook(webhookUrl, message);
  }
});

function sendWebhook(url, message) {
  const payload = {
    content: message
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
