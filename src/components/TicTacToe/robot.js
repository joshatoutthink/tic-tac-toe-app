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

function winAvailable(board) {
  //TODO
}
function blockOpponentAvailable(board) {
  //TODO
}
function centerAvailable(movesLeft) {
  //TODO
}
function cornerAvailable(movesLeft) {
  //TODO
}

export { getRobotMove };
