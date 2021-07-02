function getRobotMove(board) {
  const movesLeft = getAvailableTiles(board);
  console.log(movesLeft);

  const [x, y] = robotBrain({ movesLeft, board });

  return { x, y };
}

function getAvailableTiles(board) {
  return board.reduce((available, row, y) => {
    row.forEach((tile, x) => {
      if (tile === "") {
        available.push([x, y]);
      }
    });
    console.log(available);
    return available;
  }, []);
}

function robotBrain({ movesLeft, board }) {
  //find win
  const win = winAvailable(board);
  console.log("win", win);
  if (win) {
    return win;
  }

  //stop opponent win
  const blockOpponent = blockOpponentAvailable(board);
  if (blockOpponent) {
    return blockOpponent;
  }

  // find center
  const center = centerAvailable(movesLeft);
  if (center) {
    return center;
  }

  // find corner
  const corner = cornerAvailable(movesLeft);
  if (corner) {
    return corner;
  }

  // choose available
  const proposedIndex = Math.floor(Math.random() * movesLeft.length);
  return movesLeft[proposedIndex];
}

function winAvailable(board, player = "o") {
  //HORIZONTAL WINS
  for (let row = 0; row < board.length; row++) {
    if (containTwo([...board[row]], player)) {
      console.log("contains Two");
      const xIndex = findIndexAvailable([...board[row]]);
      if (xIndex !== false) return [xIndex, row];
    }
  }

  //VERTICAL WINS

  //DIAGONAL WINS

  return false;
}

function blockOpponentAvailable(board) {
  return winAvailable(board, "x");
}

function centerAvailable(movesLeft) {
  // TODO
}

function cornerAvailable(movesLeft) {
  // TODO
}

export { getRobotMove, getMinimaxRobotMove };

function containTwo(tiles, player) {
  const total = tiles.reduce((total, tile) => {
    return tile == player ? ++total : total;
  }, 0);
  return total == 2;
}

function findIndexAvailable(tiles) {
  console.log(tiles);
  for (let i = 0; i < tiles.length; i++) {
    console.log(tiles[i]);
    if (tiles[i] == "") {
      return i;
    }
  }
  return false;
}

const ai = "o";
const human = "x";
let scores = {
  x: -10,
  o: 10,
  tie: 0,
};

function getMinimaxRobotMove(board) {
  const [x, y] = bestMove(board);
  return { x, y };
}

function checkWinner(board) {
  //HORZ
  for (let row = 0; row < 3; row++) {
    if (allEqual(...board[row])) {
      return board[row][0];
    }
  }

  //VERT
  for (let col = 0; col < 3; col++) {
    if (allEqual(board[0][col], board[1][col], board[2][col])) {
      return board[0][col];
    }
  }

  //DIAG
  // "\"
  if (allEqual(board[0][0], board[1][1], board[2][2])) {
    return board[0][0];
  }
  // "/"
  if (allEqual(board[0][2], board[1][1], board[2][0])) {
    return board[0][2];
  }

  if (!availableMoves(board).length) {
    return "tie";
  }
  return null;
}

function allEqual(...args) {
  return args.every((ar) => ar === args[0] && ar !== "");
}
function availableMoves(board) {
  return board.reduce((available, row, y) => {
    row.forEach((tile, x) => {
      if (tile === "") {
        available.push([x, y]);
      }
    });
    return available;
  }, []);
}

function bestMove(board) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        //console.log(score, [j, i]);//
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  console.log(bestScore);
  return [move.j, move.i];
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner(board);
  //console.log(result);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);

          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);

          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

// const mockBoard = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ];

// console.log(bestMove(mockBoard));
