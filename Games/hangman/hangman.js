//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
    Characters: [
    { word: "Gojo", hint: "Jujutsu Kaisen" },
    { word: "Denji", hint: "Chainsaw-man" },
    { word: "Eren", hint: "Attack on Titan" },
    { word: "Izuku", hint: "My hero academia" },
    { word: "Sasuke", hint: "Naruto" },
    { word: "Saitama", hint: "One-punch man" },
    { word: "Izaya", hint: "Durarara!!" },
    { word: "Kazuma", hint: "KonoSuba" },
    { word: "Osamu", hint: "Bungo Stray Dogs" },
    { word: "Hyakkimaru", hint: "Dororo" },
    { word: "Kageyama", hint: "Mob Psycho 100" },
    { word: "Rudeus", hint: "Mushoku Tensei: Jobless Reincarnation" },
    { word: "Legoshi", hint: "Beastars" },
    { word: "Senku", hint: "Dr. Stone" },
    { word: "Kakashi", hint: "Naruto" },
    { word: "Norman", hint: "The Promised Neverland" },
    { word: "Zoro", hint: "One Piece" },
    { word: "Light", hint: "Death Note" },
    { word: "Liebert", hint: "Monster" },
    { word: "Lelouch", hint: "Code Geass" },
  ],
  Shows: [
    { word: "Spyfamily", hint: "Unprecedented Hype" },
    { word: "JujutsuKaisen", hint: "Gojo-Samaaa!!!" }, 
    { word: "Fate", hint: "Complicated" },
    { word: "DemonSlayer", hint: "Theres a budget?" }, 
    { word: "KillLaKill", hint: "Horniest Battles" },
    { word: "JoJO", hint: "Memes" },
    { word: "OnePunchMan", hint: "Ridiculous Power" },
    { word: "VinlandSaga", hint: "I have no enimies" },
    { word: "Berserk", hint: "You good Guts?" },
    { word: "FoodWars", hint: "Foodgasm" },
    { word: "KonoSuba", hint: "Isekai is fun again" },
    { word: "AttackonTitan", hint: "Death" },
    { word: "DressUpDarling", hint: "Cosplayer Waifu!" },
    { word: "Monster", hint: "True crime" },
    { word: "ReZero", hint: "Waifu Wars" },
    { word: "MobPsycho", hint: "Psychic Abilities" },
    { word: "DeathNote", hint: "Mind Games" },
    { word: "DragonBall", hint: "Can he beat Goku?" },
    { word: "OnePiece", hint: "Never-ending Story" },
],
  Studio: [
    { word: "Mappa", hint: "Jujutsu Kaisen" },
    { word: "DogaKobo", hint: "Oshi no ko" },
    { word: "ufotable", hint: "Demon-slayer" },
    { word: "AonePictures", hint: "Mashle" },
    { word: "TezukaProduction", hint: "MY Home Hero" },
    { word: "AonePictures", hint: "Solo leveling" },
    { word: "Mappa", hint: "Chainsaw man" },
    { word: "Toei", hint: "One Piece" },
    { word: "Wit", hint: "The OnePiece" },
    { word: "ProductionIG", hint: "heavenly delusion" },
    { word: "Wit", hint: "SpyFamily" },
    { word: "Madhouse", hint: "Monster" },
    { word: "Madhouse", hint: "Death Note" },
    { word: "BiburyAnimation", hint: "the 100 girlfriends that really love you" },
    { word: "Lerche ", hint: "classroom of the elite" },
  ],
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    //disable all options
    optionsButtons.forEach((button) => {
      button.disabled = true;
    });
  
    //disable all letters
    letterButtons.forEach((button) => {
      button.disabled = true;  // Fix: Change "button.disabled.true;" to "button.disabled = true;"
    });
    newGameContainer.classList.remove("hide");
  };

  // Function to open the hint popup
const openHint = (hint) => {
    const hintMessage = document.getElementById("hint-message");
    hintMessage.innerText = hint;
    const hintPopup = document.getElementById("hint-popup");
    hintPopup.classList.remove("hide");
  };
  
  // Function to close the hint popup
  const closeHint = () => {
    const hintPopup = document.getElementById("hint-popup");
    hintPopup.classList.add("hide");
  };

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
      if (button.innerText.toLowerCase() === optionValue) {
        button.classList.add("active");
      }
      button.disabled = true;
    });
  
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
  
    let optionArray = options[optionValue];
    // choose random object containing word and hint
    let chosenOption = optionArray[Math.floor(Math.random() * optionArray.length)];
  
    chosenWord = chosenOption.word.toUpperCase();
  
    // replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  
    // Display each element as span
    userInputSection.innerHTML = displayItem;
  
    // Display hint in the hint popup
    openHint(chosenOption.hint);
  };

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
    // Display hint initially as empty
    resultText.innerHTML = "";
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;