/**
 * Game states:
 * Choose option
 * Display chosen option - PAUSE - display computer's option - PAUSE - Display who won and a "Play again" button
 * 
 * 
 * 
 */

// Elements
const playerSelectSection = document.getElementById('player-select')
const battleSection = document.getElementById('battle')
const pickedPlayerElement = document.getElementById('you-picked')
const housePickedPlayerElement = document.getElementById('house-picked')
const playAgainButton = document.getElementById("play-again")
const resetSection = document.getElementById("results")
const scoreDisplay = document.getElementById("score-count")
const rulesButton = document.getElementById("rules-button")
const rulesPopup = document.getElementById("rules-popup")
const exitButton = document.getElementsByClassName("exit")
const body = document.querySelector("body")
const playerButtonImage = document.querySelector(".player-image.paper")

let currentScore = 0;
let playerChoices = ['paper', 'rock', 'scissors']
let chosenPlayer = ''
let housePlayer = ''
let winner = ''

function choosePlayer(player) {
    chosenPlayer = player
    pickedPlayerElement.replaceChildren()
    pickedPlayerElement.innerHTML =
        `<div class="player">
            <div id="${chosenPlayer}" class="player player-image fighting ${chosenPlayer}">
                <img src="images/icon-${chosenPlayer}.svg" alt="${chosenPlayer}" class="${chosenPlayer}">
            </div>
            <div class="background ${chosenPlayer}"></div>
        </div>
        <p>You picked</p>`
}
function chooseHousePlayer() {
    housePlayer = playerChoices[Math.floor((Math.random() * 3))];
    setTimeout(() => {
        housePickedPlayerElement.replaceChildren()
        housePickedPlayerElement.innerHTML =
            `<div class="player">
                <div id="${housePlayer}" class="player player-image fighting ${housePlayer}">
                    <img src="images/icon-${housePlayer}.svg" alt="${housePlayer}" class="${housePlayer}">
                </div>
                <div class="background ${housePlayer}"></div>
            </div>
            <p>The house picked</p>`
    }, 500)
}

function displayResults(winner) {
    let winnerText = ''
    if (winner == 'player') {
        winnerText = "You Won"
    } else if (winner == 'house') {
        winnerText = "You Lose"
    } else {
        winnerText = "Tie!"
    }

    resetSection.replaceChildren()
    resetSection.innerHTML =
        `<p>${winnerText}</p>
        <button id="play-again">Play Again</button>`

    setTimeout(() => {
        resetSection.style.display = "flex"
    }, 1200)
}

function calculateWinner(pl, housePl) {
    switch (pl) {
        case 'rock':
            if (housePl == 'paper') {
                winner = 'house'
            } else if (housePl == 'scissors') {
                winner = 'player'
            } else {
                winner = 'tie'
            }
            break;
        case 'paper':
            if (housePl == 'scissors') {
                winner = 'house'
            } else if (housePl == 'rock') {
                winner = 'player'
            } else {
                winner = 'tie'
            }
            break;
        case 'scissors':
            if (housePl == 'rock') {
                winner = 'house'
            } else if (housePl == 'paper') {
                winner = 'player'
            } else {
                winner = 'tie'
            }
            break;
    
        default:
            break;
    }
}

function updateScore() {
    if (winner == 'player') {
        currentScore++
    } else if (winner == 'house' && currentScore > 0) {
        currentScore--
    } else {
        currentScore = currentScore
    }

    setTimeout(() => {
        scoreDisplay.innerHTML = currentScore
    }, 1200)
}

resetSection.addEventListener("click", () => {
    playerSelectSection.style.display = "flex"
    battleSection.style.display = "none"
    resetSection.style.display = "none"

    // Reset house circle
    housePickedPlayerElement.innerHTML = 
        `<div id="house-placeholder"></div>
        <p>The House picked</p>`
})

rulesButton.addEventListener("click", () => {
    rulesPopup.classList.remove("close")
    rulesPopup.classList.add("open")
    body.style.overflow = "hidden"
})

rulesPopup.addEventListener("click", (e) => {
    if (e.target.className.includes('exit')) {
        console.log("exit")
        rulesPopup.classList.remove("open")
        rulesPopup.classList.add("close")
    }
})

function battle(player) {
    setTimeout(() => {
        // Update display
        playerSelectSection.style.display = "none"
        battleSection.style.display = "flex"
    
        // Select players
        choosePlayer(player)
        chooseHousePlayer()
    
        // Calculate Winner
        calculateWinner(player, housePlayer)
    
        // Display results
        displayResults(winner)
    
        // Update Score
        updateScore()
    }, 200)
}

playerSelectSection.addEventListener("click", (e) => {
    if (e.target.className.includes('paper')) {
        battle("paper")
    } 
    if (e.target.className.includes('rock')) {
        battle("rock")

    }
    if (e.target.className.includes('scissors')) {
        battle("scissors")

    }
})

