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

export { getRobotMove };

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
