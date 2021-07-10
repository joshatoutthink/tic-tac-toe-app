import React, { useState, useEffect, useRef } from "react";

import { getRobotMove, getMinimaxRobotMove } from "./robot.js";
import PlayersInfo from "./PlayersInfo";
import Marker from "./Marker";
import Settings from "./Settings";
import Stats from "./Stats";
import Difficulty from "./Difficulty";

function emptyBoard(size) {
  const board = [];
  for (let y = 0; y < size; y++) {
    board.push([]);
    for (let x = 0; x < size; x++) {
      board[y].push("");
    }
  }
  return board;
}

const players = ["x", "o"];

function easyRobotMove(board) {
  const movesLeft = getAvailableTiles(board);
  const [x, y] = movesLeft[Math.floor(Math.random() * movesLeft.length)];
  return { x, y };
}

function allEqual(...args) {
  return args.every((v) => {
    return v !== "" && v === args[0];
  });
}

function getAvailableTiles(board) {
  return board.reduce((available, row, y) => {
    row.forEach((tile, x) => {
      if (tile === "") {
        available.push([x, y]);
      }
    });
    return available;
  }, []);
}

function checkWinner(board) {
  //check horizontals
  for (let row = 0; row < board.length; row++) {
    if (allEqual(...board[row])) {
      return board[row][0];
    }
  }

  //check verticals
  for (let column = 0; column < board.length; column++) {
    console.log([board[0][column], board[1][column], board[2][column]]);
    if (allEqual(board[0][column], board[1][column], board[2][column])) {
      return board[0][column];
    }
  }

  //TODO refactor to make dynamic size board
  // check diagonals
  if (allEqual(board[0][0], board[1][1], board[2][2])) {
    return board[0][0];
  }
  if (allEqual(board[0][2], board[1][1], board[2][0])) {
    return board[0][2];
  }

  //Check for Tie
  if (getAvailableTiles(board).length === 0) {
    return "CAT";
  }
}

const INITIAL_GAME_SETTINGS = {
  difficulty: "easy",
};

const ROBOT_IS_PLAYING = false;

//==
//== START OF THE REACT COMPONENT
//==
function TicTacToe({}) {
  const [board, setBoard] = useState(() => emptyBoard(3));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameWinner, setGameWinner] = useState(null);
  const [gameSettings, setGameSettings] = useState(INITIAL_GAME_SETTINGS);
  const [gameScore, setGameScore] = useState({ wins: 0, losses: 0, ties: 0 });
  const [blurAmount, setBlurAmount] = useState(0);

  function placeMark({ x, y }) {
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[y][x] = currentPlayer;
      return newBoard;
    });
  }

  function isRobotsTurn() {
    return ROBOT_IS_PLAYING && currentPlayer !== "x";
  }

  function handlePlaceMark({ x, y }) {
    // if(isRobotsTurn()){
    //   return; // robots turn
    // }
    if (board[y][x] !== "") {
      return;
    }
    if (gameWinner) {
      return;
    }
    placeMark({ x, y });
  }
  function resetBoard() {
    setGameWinner(null);
    setBoard(() => emptyBoard(3));
    setCurrentPlayer(null);
    setBlurAmount(0);
  }

  useEffect(() => {
    console.log(board);
    const gameResult = checkWinner(board);
    if (!gameResult && board) {
      setCurrentPlayer((prev) => {
        const currentPlayerIndex = players.findIndex((p) => p == prev);
        const nextPlayer = players[(currentPlayerIndex + 1) % players.length];

        return nextPlayer;
      });
    } else {
      setGameWinner(gameResult);
      setBlurAmount("20px");
      setGameScore((prev) => {
        if (gameResult == "x") {
          console.log("updating score");
          console.log("gameresult,", gameResult);
          return {
            ...prev,
            wins: prev.wins + 1,
          };
        }
        if (gameResult == "o") {
          return {
            ...prev,
            losses: prev.losses + 1,
          };
        }

        if (gameResult == "CAT") {
          return {
            ...prev,
            ties: prev.ties + 1,
          };
        }
      });
    }
  }, [board, setCurrentPlayer, checkWinner]);

  useEffect(() => {
    if (currentPlayer !== "x" && currentPlayer !== null) {
      console.log(currentPlayer);
      setTimeout(() => {
        setBoard((prevBoard) => {
          if (!prevBoard) {
            return prevBoard;
          }
          const newBoard = [...prevBoard];

          // SELECT THE FUNCTION DEPENDING ON THE GAME SETTINGS
          const { x, y } =
            gameSettings.difficulty === "hard"
              ? getMinimaxRobotMove(newBoard)
              : gameSettings.difficulty === "medium"
              ? getRobotMove(newBoard)
              : easyRobotMove(board);

          newBoard[y][x] = currentPlayer;
          return newBoard;
        });
      }, 300);
    }
  }, [currentPlayer]);

  const ref = React.useRef(null);
  const blurRef = useRef(null);
  return (
    <>
      <div
        ref={blurRef}
        style={{ ["--blur-overlay"]: blurAmount }}
        className="blur"
      ></div>
      {gameWinner && <ShowWinner winner={gameWinner} resetBoard={resetBoard} />}
      <div className="board-wrapper" ref={ref}>
        <div className="board">
          {board.map((row, y) => {
            return row.map((tile, x) => {
              {
                console.log(tile);
              }
              return (
                <div className="tile" key={`${x},${y}`}>
                  <button onClick={() => handlePlaceMark({ x, y })}>
                    <Marker player={tile} />
                  </button>
                </div>
              );
            });
          })}
        </div>
        <button onClick={resetBoard}>Reset Board</button>
      </div>
      <Settings parentRefContainer={ref}>
        <PlayersInfo info={{ name: "human", active: currentPlayer }} />
        <Stats score={gameScore} />
        <Difficulty
          handleSelectDifficulty={(e) => {
            const { value } = e.target;
            setGameSettings((gameSettings) => ({
              ...gameSettings,
              difficulty: value,
            }));
          }}
          selectedDifficulty={gameSettings.difficulty}
        />
      </Settings>
    </>
  );
}

export default TicTacToe;

function ShowWinner({ winner, resetBoard }) {
  return (
    <div className="modal glass" style={{ textAlign: `center` }}>
      <div className="winner-announcement" style={{ marginBottom: 20 }}>
        The Winner is:
        <div className="winner-name">
          {winner == "x" ? "Human 🥳" : winner == "o" ? "Robot 🤖" : "A 🐈"}
        </div>
      </div>
      <button
        style={{ textAlign: `center`, margin: `0 auto` }}
        onClick={resetBoard}
      >
        Reset Board
      </button>
    </div>
  );
}
