const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'; 
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
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessagesElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn

startGame();

cellElements.forEach(cell =>{
    cell.addEventListener('click', handleClick, { once: true})
});

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell =>{
        cell.addEventListener('click', handleClick, { once: true})
    });
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false)
    }else if (isDraw()){
        endGame(true);
    }else {
        swapTurns()
        setBoardClass()
    };
};

function endGame(draw){
    if(draw) {
        winningMessagesElement.innerText = "Draw!";
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins! `
    }
    winningMessageTextElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
};

function swapTurns(){
    circleTurn = !circleTurn;
};

function setBoardClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    WINNING_COMBINATIONS.some(conbination => {
        return conbination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}