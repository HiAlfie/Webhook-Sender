// get the DOM elements
const nameInput = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const generateBtn = document.getElementById("generateBtn");
const indexList = document.getElementById("indexList");

// create an array to keep track of generated numbers
let generatedNumbers = [];

// function to generate a random number between 1 and 1000
function generateNumber() {
  let number = Math.floor(Math.random() * 1000) + 1;
  return number;
}

// function to check if a number has already been generated
function hasGeneratedNumber(number) {
  return generatedNumbers.includes(number);
}

// function to mark a number as generated in the index list
function markAsGenerated(number) {
  let indexListItem = indexList.children[number - 1];
  indexListItem.classList.add("generated");
}

// function to handle the "generate number" button click
function onGenerateClick() {
  let number = generateNumber();
  generatedNumbers.push(number);
  markAsGenerated(number);
}

// function to handle the "submit" button click
function onSubmitClick() {
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Please enter your name to start the game.");
  } else {
    // store the name in local storage
    localStorage.setItem("name", name);
    // switch to the game page
    window.location.href = "game.html";
  }
}

// add event listeners
submitBtn.addEventListener("click", onSubmitClick);
generateBtn.addEventListener("click", onGenerateClick);
