const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('taken');

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = 'O';
    aiMove();
}

function aiMove() {
    const bestMove = minimax(board, 'O').index;
    board[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('taken');

    if (checkWinner()) {
        alert('O wins!');
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === board[b] && board[a] === board[c] && board[a] !== '';
    });
}

function minimax(newBoard, player) {
    const availableSpots = newBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    if (checkWinner()) {
        return { score: player === 'O' ? -10 : 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
