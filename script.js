const nameInput = document.getElementById('name-input');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    sessionStorage.setItem('name', name);
    window.location.href = 'game.html';
});

// Game page

const generateBtn = document.getElementById('generate-btn');
const result = document.getElementById('result');
const indexList = document.getElementById('index-list');
const name = sessionStorage.getItem('name');
const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';

generateBtn.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    result.textContent = `Your random number is: ${randomNumber}`;
    const indexItem = indexList.children[randomNumber - 1];
    indexItem.style.backgroundColor = 'green';
    checkGameCompletion();
});

function checkGameCompletion() {
    let allGreen = true;
    for (let i = 0; i < indexList.children.length; i++) {
        const item = indexList.children[i];
        if (item.style.backgroundColor !== 'green') {
            allGreen = false;
            break;
        }
    }
    if (allGreen) {
        sendWebhookMessage(`${name} has completed the game!`);
    }
}

function sendWebhookMessage(message) {
    const data = { content: message };
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// Initialize index list

const indexItems = [];
for (let i = 1; i <= 1000; i++) {
    const item = document.createElement('li');
    indexItems.push(item);
}
indexList.append(...indexItems);
