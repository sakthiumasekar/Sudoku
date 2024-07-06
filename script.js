// script.js

// Create the Sudoku grid
const grid = document.getElementById('sudoku-grid');
for (let row = 0; row < 9; row++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < 9; col++) {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.id = `cell-${row}-${col}`;
        td.appendChild(input);
        tr.appendChild(td);
    }
    grid.appendChild(tr);
}

// Solve button event listener
document.getElementById('solve-button').addEventListener('click', solveSudoku);

// Sudoku solver logic
function solveSudoku() {
    const board = getBoard();
    if (solve(board)) {
        setBoard(board);
    } else {
        alert('No solution exists!');
    }
}

function getBoard() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        const rowArr = [];
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            const value = cell.value;
            rowArr.push(value === '' ? 0 : parseInt(value));
        }
        board.push(rowArr);
    }
    return board;
}

function setBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            cell.value = board[row][col] === 0 ? '' : board[row][col];
        }
    }
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}
