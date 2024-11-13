//Initial References

//Questions Or Images
const questions = [
  {
    image: "aang.jpg",
    correct_option: "Aang",
  },
  {
    image: "Bakugo.jpg",
    correct_option: "Bakugo",
  },
  {
    image: "Denji.png",
    correct_option: "Denji",
  },
  {
    image: "Giyu.jpg",
    correct_option: "Giyu",
  },
  {
    image: "Goku.jfif",
    correct_option: "Goku",
  },
  {
    image: "Ichigo.jpg",
    correct_option: "Ichigo",
  },
  {
    image: "Izuku.jpg",
    correct_option: "Izuku",
  },
  {
    image: "kaneki.jpg",
    correct_option: "kaneki",
  },
  {
    image: "Killua.png",
    correct_option: "Killua",
  },
  {
    image: "Lawliet.jpg",
    correct_option: "Lawliet",
  },
  {
    image: "luffy.jpg",
    correct_option: "luffy",
  },
  {
    image: "Mikasa.jpg",
    correct_option: "Mikasa",
  },
  {
    image: "Mob.jpg",
    correct_option: "Mob",
  },
  {
    image: "pikacu.jpg",
    correct_option: "Pikachu",
  },
  {
    image: "saitama.png",
    correct_option: "saitama",
  },
  {
    image: "Kakashi.jpg",
    correct_option: "Kakashi",
  },
];

//All options
const optionsArray = [
  "Aang",
  "Bakugo",
  "Denji",
  "Giyu",
  "Goku",
  "Ichigo",
  "Izuku",
  "kaneki",
  "Killua",
  "Lawliet",
  "luffy",
  "Pikachu",
  "Mikasa",
  "Mob",
  "saitama",
  "Kakashi",
  "Asuna ",
  "Char ",
  "Armin ",
  "Charmander",
  "Aizen ",
  "Charizard",
  "Ash ",
  "Bulma",
  "Celty ",
  "Brock",
  "Metapod",
  "Butterfree",
  "Bulat",
  "Asta ",
  "Beedrill",
  "Pidgey",
  "Dabi",
  "Deidara",
  "Rattata",
  "Boruto ",
  "Spearow",
  "Fearow",
  "Berserker",
  "Arbok",
];
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown,
  count = 11;

//Random value from array
const randomValueGenerator = (array) =>
  array[Math.floor(Math.random() * array.length)];

//Random shuffle array
const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

//Start game
const startGame = () => {
  //Select random 5 questions
  scoreContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  finalQuestions = populateQuestions();
  score = 0;
  currentQuestion = 0;
  //Generate card for first question
  cardGenerator(finalQuestions[currentQuestion]);
};

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Time Left: </span>${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
};

//Create options
const populateOptions = (correct_option) => {
  let arr = [];
  arr.push(correct_option);
  let optionsCount = 1;
  while (optionsCount < 4) {
    let randomvalue = randomValueGenerator(optionsArray);
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue);
      optionsCount += 1;
    }
  }
  return arr;
};

//Choose random questions
const populateQuestions = () => {
  let questionsCount = 0;
  let chosenObjects = [];
  let questionsBatch = [];
  //5 Questions
  while (questionsCount < 5) {
    let randomvalue = randomValueGenerator(questions);
    let index = questions.indexOf(randomvalue);
    if (!chosenObjects.includes(index)) {
      questionsBatch.push(randomvalue);
      chosenObjects.push(index);
      questionsCount += 1;
    }
  }
  return questionsBatch;
};

//check selected answer
const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
};

//Next question
const nextQuestion = (e) => {
  //increment currentQuestion
  currentQuestion += 1;
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    startButton.innerText = `Restart`;
    userScore.innerHTML =
      "Your score is " + score + " out of " + currentQuestion;
    clearInterval(countdown);
  } else {
    cardGenerator(finalQuestions[currentQuestion]);
  }
};

//Card UI
const cardGenerator = (cardObject) => {
  const { image, correct_option } = cardObject;
  let options = randomShuffle(populateOptions(correct_option));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${currentQuestion + 1}/5
  </p>
  <div class="questions">
    <img class="pokemon-image" src="${image}"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${options[0]}
    </button>
    <button class="option" onclick="checker(event)">${options[1]}
    </button>
    <button class="option" onclick="checker(event)">${options[2]}
    </button>
    <button class="option" onclick="checker(event)">${options[3]}
    </button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" onclick="nextQuestion(event)">Next</button>
    </div>

  </div>`;
  //For timer
  count = 11;
  clearInterval(countdown);
  //Display timer
  timerDisplay();
};

startButton.addEventListener("click", startGame);
