const board = [];

function createBoard() {
  const container = document.getElementById("sudoku-board");
  for (let row = 0; row < 9; row++) {
    board[row] = [];
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.setAttribute("type", "number");
      input.setAttribute("min", 1);
      input.setAttribute("max", 9);
      input.setAttribute("maxlength", 1);

      
      const blockRow = Math.floor(row / 3);
      const blockCol = Math.floor(col / 3);
      if ((blockRow + blockCol) % 2 === 0) {
        input.style.backgroundColor = "#e6f7ff"; // Light blue
      } else {
        input.style.backgroundColor = "#ffffff"; // White
      }

      board[row][col] = input;
      container.appendChild(input);
    }
  }
}

function getBoardValues() {
  return board.map(row => row.map(cell => parseInt(cell.value) || 0));
}

function setBoardValues(solution) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      board[row][col].value = solution[row][col];
    }
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
    const boxCol = 3 * Math.floor(col / 3) + x % 3;
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const inputBoard = getBoardValues();
  const boardCopy = JSON.parse(JSON.stringify(inputBoard));
  if (solve(boardCopy)) {
    setBoardValues(boardCopy);
    alert("Solved successfully!");
  } else {
    alert("No solution found.");
  }
}

function clearBoard() {
  board.forEach(row => row.forEach(cell => (cell.value = "")));
}

createBoard();
