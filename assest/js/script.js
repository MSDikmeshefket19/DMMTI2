const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
    // the array of the winning combinations
const WINNING_COMBINATIONS = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    // Accesing the html elements
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
    // The start of the game
startGame()
    // Checks if the restat button is pressed, so the game can be restarted
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
        // Iterates through every cell and cleans the playing space
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    // Selects the cell we want to click 
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        //Draws the symbol
    placeMark(cell, currentClass)
        // Checks if the game is over (win, loss, tie)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        //If the game is not over it swaps the turns
        swapTurns()
        setBoardHoverClass()
    }
}
//Ends the game and displays result
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Равни'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Печели`
    }
    winningMessageElement.classList.add('show')
}
//Checks if the game is even

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
//Places the mark based of the argument which is passed through the function
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
//Swaps from from O TO X and the opposite
function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    // Removes the previous hover figure
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        // Checks if the program has to put O or X based on a variable that we used to indicate them
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    // Iterates through the winnin combinations and checks if the player has won the game.
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}