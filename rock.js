//store the initial score
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
const totalResults = document.querySelector(".results");
const data = document.querySelector(".data");
function updateScoreElements() {
  data.innerHTML = `
  wins:${score.wins}, losses:${score.losses}, ties: ${score.ties}`;
}

function move() {
  let computerMove = "";
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNum > 1 / 3 && randomNum < 2 / 3) {
    computerMove = "Paper";
  } else computerMove = "Scissor";
  return computerMove;
}
//for auto play
let autoPlaying = false;
let autoPlayingId;
function autoPlay() {
  if (!autoPlaying) {
    autoPlayingId = setInterval(function () {
      //move() is computer move so we make a variable to put on game
      const computerMove = move();
      game(computerMove);
    }, 2000);
    autoPlaying = true;
    autoPlayButton.innerText = "Stop AutoPlay";
  } else {
    clearInterval(autoPlayingId);
    autoPlaying = false;
    autoPlayButton.innerText = "AutoPlay";
  }
}

const autoPlayButton = document.querySelector(".autoplay");
autoPlayButton.addEventListener("click", ayutoPla);

//game function
let result = "";
function game(guess) {
  const computerMove = move();
  if (guess === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "Loose";
    } else if (computerMove === "Scissor") {
      result = "Win";
    }
  } else if (guess === "Paper") {
    if (computerMove === "Rock") {
      result = "Win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissor") {
      result = "Loose";
    }
  } else if (guess === "Scissor") {
    if (computerMove === "Rock") {
      result = "Loose";
    } else if (computerMove === "Paper") {
      result = "Win";
    } else if (computerMove === "Scissor") {
      result = "Tie";
    }
  }

  if (result === "Win") {
    score.wins += 1;
  } else if (result === "Loose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  //++ increases by 1 but += can be used to increase by any amount

  totalResults.innerHTML = `${result} <br/>  you 
    <img src="./assests/${guess}-emoji.png" /> computer <img src='./assests/${computerMove}-emoji.png'/>`;

  updateScoreElements();

  localStorage.setItem("score", JSON.stringify(score));
}

updateScoreElements();

//reset

const resetGame = document.querySelector(".reset");
const resetScore = document.querySelector(".resetScore");
let intervalId;
function clearScoreAlert() {
  clearTimeout(intervalId);
  intervalId = setTimeout(() => {
    resetScore.innerHTML = "";
  }, 2000);
}
function reset() {
  const htmlJs = `
  <p> Are you sure you want to reset the score?</p>
  <button class='resetToZero' onclick='resetScoreElement()'>Yes</button>
  <button onClick='clearScoreAlert()'>No</button></p>`;
  resetScore.innerHTML = htmlJs;
}
function resetScoreElement() {
  (score.wins = 0), (score.losses = 0), (score.ties = 0);
  localStorage.removeItem("score");
  updateScoreElements();
  clearScoreAlert();
}
resetGame.addEventListener("click", reset);

// Using keyboard
document.body.addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (e.key === "r") {
    game("Rock");
  } else if (e.key === "p") {
    game("Paper");
  } else if (e.key === "s") {
    game("Scissor");
  } else if (e.key === "a") {
    autoPlay();
  } else if (e.key === "Backspace") {
    reset();
  }
});
