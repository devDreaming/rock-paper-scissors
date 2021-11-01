"use strict";

/**
 * Game states:
 * Choose option
 * Display chosen option - PAUSE - display computer's option - PAUSE - Display who won and a "Play again" button
 * 
 * 
 * 
 */
// Elements
var playerSelectSection = document.getElementById('player-select');
var battleSection = document.getElementById('battle');
var pickedPlayerElement = document.getElementById('you-picked');
var housePickedPlayerElement = document.getElementById('house-picked');
var playAgainButton = document.getElementById("play-again");
var resetSection = document.getElementById("results");
var scoreDisplay = document.getElementById("score-count");
var rulesButton = document.getElementById("rules-button");
var rulesPopup = document.getElementById("rules-popup");
var exitButton = document.getElementsByClassName("exit");
var body = document.querySelector("body");
var playerButtonImage = document.querySelector(".player-image.paper");
var currentScore = 0;
var playerChoices = ['paper', 'rock', 'scissors'];
var chosenPlayer = '';
var housePlayer = '';
var winner = '';

function choosePlayer(player) {
  chosenPlayer = player;
  pickedPlayerElement.replaceChildren();
  pickedPlayerElement.innerHTML = "<div class=\"player\">\n            <div id=\"".concat(chosenPlayer, "\" class=\"player player-image fighting ").concat(chosenPlayer, "\">\n                <img src=\"images/icon-").concat(chosenPlayer, ".svg\" alt=\"").concat(chosenPlayer, "\" class=\"").concat(chosenPlayer, "\">\n            </div>\n            <div class=\"background ").concat(chosenPlayer, "\"></div>\n        </div>\n        <p>You picked</p>");
}

function chooseHousePlayer() {
  housePlayer = playerChoices[Math.floor(Math.random() * 3)];
  setTimeout(function () {
    housePickedPlayerElement.replaceChildren();
    housePickedPlayerElement.innerHTML = "<div class=\"player\">\n                <div id=\"".concat(housePlayer, "\" class=\"player player-image fighting ").concat(housePlayer, "\">\n                    <img src=\"images/icon-").concat(housePlayer, ".svg\" alt=\"").concat(housePlayer, "\" class=\"").concat(housePlayer, "\">\n                </div>\n                <div class=\"background ").concat(housePlayer, "\"></div>\n            </div>\n            <p>The house picked</p>");
  }, 500);
}

function displayResults(winner) {
  var winnerText = '';

  if (winner == 'player') {
    winnerText = "You Won";
  } else if (winner == 'house') {
    winnerText = "You Lose";
  } else {
    winnerText = "Tie!";
  }

  resetSection.replaceChildren();
  resetSection.innerHTML = "<p>".concat(winnerText, "</p>\n        <button id=\"play-again\">Play Again</button>");
  setTimeout(function () {
    resetSection.style.display = "flex";
  }, 1200);
}

function calculateWinner(pl, housePl) {
  switch (pl) {
    case 'rock':
      if (housePl == 'paper') {
        winner = 'house';
      } else if (housePl == 'scissors') {
        winner = 'player';
      } else {
        winner = 'tie';
      }

      break;

    case 'paper':
      if (housePl == 'scissors') {
        winner = 'house';
      } else if (housePl == 'rock') {
        winner = 'player';
      } else {
        winner = 'tie';
      }

      break;

    case 'scissors':
      if (housePl == 'rock') {
        winner = 'house';
      } else if (housePl == 'paper') {
        winner = 'player';
      } else {
        winner = 'tie';
      }

      break;

    default:
      break;
  }
}

function updateScore() {
  if (winner == 'player') {
    currentScore++;
  } else if (winner == 'house' && currentScore > 0) {
    currentScore--;
  } else {
    currentScore = currentScore;
  }

  setTimeout(function () {
    scoreDisplay.innerHTML = currentScore;
  }, 1200);
}

resetSection.addEventListener("click", function () {
  playerSelectSection.style.display = "flex";
  battleSection.style.display = "none";
  resetSection.style.display = "none"; // Reset house circle

  housePickedPlayerElement.innerHTML = "<div id=\"house-placeholder\"></div>\n        <p>The House picked</p>";
});
rulesButton.addEventListener("click", function () {
  rulesPopup.classList.remove("close");
  rulesPopup.classList.add("open");
  body.style.overflow = "hidden";
});
rulesPopup.addEventListener("click", function (e) {
  if (e.target.className.includes('exit')) {
    console.log("exit");
    rulesPopup.classList.remove("open");
    rulesPopup.classList.add("close");
  }
});

function battle(player) {
  setTimeout(function () {
    // Update display
    playerSelectSection.style.display = "none";
    battleSection.style.display = "flex"; // Select players

    choosePlayer(player);
    chooseHousePlayer(); // Calculate Winner

    calculateWinner(player, housePlayer); // Display results

    displayResults(winner); // Update Score

    updateScore();
  }, 200);
}

playerSelectSection.addEventListener("click", function (e) {
  if (e.target.className.includes('paper')) {
    battle("paper");
  }

  if (e.target.className.includes('rock')) {
    battle("rock");
  }

  if (e.target.className.includes('scissors')) {
    battle("scissors");
  }
});