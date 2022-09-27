// Array Of Words
let words = [];

// Default Level And Seconds
let lvl = "normal";
let seconds = "3";

// Selectors
let myGame = document.querySelector(".game");
let startBtn = document.querySelector(".game .start");
let messageText = document.querySelector(".game .message");
let timeText = document.querySelector(".game .time");
let scoreText = document.querySelector(".game .score");
let levels = document.querySelectorAll(".game .message p");
let upcomingWords = document.querySelector(".game .upcoming-words");
let theWord = document.querySelector(".game .the-word");
let input = document.querySelector(".game input");
let finishText = document.querySelector(".game .finish");
let spanTimeLeft = document.querySelector(".game .control .time .seconds");
let spanScore = document.querySelector(".game .control .result .score");
let spanFrom = document.querySelector(".game .control .result .words");

// Disable Paste Event
input.onpaste = function() {
  return false;
}

// Choose Level
messageText.addEventListener("click",e => {
  if(e.target.dataset.seconds) {
    lvl = e.target.innerHTML;
    seconds = e.target.dataset.seconds;
    changeMessages(lvl, seconds);
  }
})

// Change Messages
function changeMessages(lvl, seconds) {
  // Array Of Words
  if(lvl.toLowerCase() === "easy") {
    words = [
      "Hello",
      "Code",
      "Town",
      "Task",
      "Rust",
      "Scala",
      "Funny",
      "Test",
      "Home",
      "Roles"
    ];
  }
  else if(lvl.toLowerCase() === "normal") {
    words = [
      "Roles",
      "Runner",
      "Playing",
      "Github",
      "Twitter",
      "Coding",
      "Working",
      "Youtube",
      "Cascade",
      "Python"
    ];
  }
  else if(lvl.toLowerCase() === "hard") {
    words = [
      "Programming",
      "Javascript",
      "Country",
      "Testing",
      "Linkedin",
      "Leetcode",
      "Destructuring",
      "Paradigm",
      "Documentation",
      "Dependencies"
    ];
  }
  messageText.innerHTML = `You are playing on <span class="lvl">${lvl}</span> level & you have <span class="seconds">${seconds}</span> seconds To type the world.`;
  spanTimeLeft.innerHTML = seconds;
  spanFrom.innerHTML = words.length;
}

// Start Game
startBtn.addEventListener("click", _ => {
  changeMessages(lvl, seconds);
  input.focus();
  startBtn.style.display = "none";
  // Generate Word
  generateWord();
  // Start Play
  let startFirstWord = true;
  startPlay(startFirstWord);
})

function generateWord() {
  let randWord = words[Math.floor(Math.random() * words.length)];
  let indexOfRandWord = words.indexOf(randWord);
  words.splice(indexOfRandWord, 1);
  theWord.innerHTML = randWord;
  upcomingWords.innerHTML = "";
  for(let i = 0; i < words.length; i++) {
    let p = document.createElement("p");
    let text = document.createTextNode(words[i]);
    p.appendChild(text);
    upcomingWords.appendChild(p);
  }
}

function startPlay(startFirstWord) {
  let extraSeconds = 2;
  spanTimeLeft.innerHTML = seconds;
  if(startFirstWord) {
    spanTimeLeft.innerHTML = +spanTimeLeft.innerHTML + extraSeconds;
    startFirstWord = false;
  }
  let start = setInterval(_ => {
  spanTimeLeft.innerHTML--;
  if(spanTimeLeft.innerHTML === "0") {
    clearInterval(start);
    if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
      input.value = "";
      spanScore.innerHTML++;
      if(words.length) {
        generateWord();
        startPlay();
      } else {
        finishText.classList.remove("bad");
        finishText.innerHTML = "You Pass!";
        again();
      }
    } else {
      finishText.classList.add("bad");
      finishText.innerHTML = "Game Over";
      again();
    }
  }
  }, 1000);
}

function again() {
  let div = document.createElement("div");
  let txt = document.createTextNode("Play again?");
  div.classList.add("again");
  div.appendChild(txt);
  myGame.appendChild(div);
};

myGame.addEventListener("click",e => {
  if(e.target.className === "again") {
    location.reload();
  }
});