let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let xMoves = [];
let oMoves = [];

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

// Enable All Buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.classList.remove("fade-out");
    element.disabled = false;
  });
  popupRef.classList.add("hide");
  xMoves = [];
  oMoves = [];
};

// Function for Fading Out Moves
const fadeOutMove = (index) => {
  btnRef[index].classList.add("fade-out");
  setTimeout(() => {
    btnRef[index].innerText = "";
    btnRef[index].classList.remove("fade-out");
    btnRef[index].disabled = false;
  }, 500); // Adjust delay if needed
};

// Win Function
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Draw Function
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// Check if All Buttons Are Filled
const isBoardFull = () => {
  return Array.from(btnRef).every((button) => button.innerText !== "");
};

// New Game
newgameBtn.addEventListener("click", () => {
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  enableButtons();
});

// Win Checker
const winChecker = () => {
  for (let pattern of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[pattern[0]].innerText,
      btnRef[pattern[1]].innerText,
      btnRef[pattern[2]].innerText,
    ];
    if (element1 !== "" && element1 === element2 && element2 === element3) {
      winFunction(element1);
      return true;
    }
  }
  return false;
};

// Display X/O on Click
btnRef.forEach((element, index) => {
  element.addEventListener("click", () => {
    let currentPlayerMoves = xTurn ? xMoves : oMoves;
    
    if (xTurn) {
      element.innerText = "X";
      element.disabled = true;
      xMoves.push(index);
      if (xMoves.length > 3) {
        fadeOutMove(xMoves.shift());
      }
    } else {
      element.innerText = "O";
      element.disabled = true;
      oMoves.push(index);
      if (oMoves.length > 3) {
        fadeOutMove(oMoves.shift());
      }
    }

    xTurn = !xTurn;

    if (!winChecker() && isBoardFull()) {
      drawFunction();
    }
  });
});

// Enable Buttons on Page Load
window.onload = enableButtons;
