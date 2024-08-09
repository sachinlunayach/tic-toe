const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

const xSound = new Audio('sounds/x-sound.mp3');
const oSound = new Audio('sounds/o-sound.mp3');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusDisplay.textContent = `${currentPlayer} Wins!`;
            statusDisplay.classList.add('win');
            isGameActive = false;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        statusDisplay.textContent = 'It\'s a Draw!';
        statusDisplay.classList.add('draw');
        isGameActive = false;
    }
};

const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] || !isGameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('clicked');

    // Play sound effect based on the current player
    if (currentPlayer === 'X') {
        xSound.play();
    } else {
        oSound.play();
    }

    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.classList.remove('clicked'));
    statusDisplay.classList.remove('win', 'draw');
    statusDisplay.textContent = '';
    currentPlayer = 'X';
    isGameActive = true;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
