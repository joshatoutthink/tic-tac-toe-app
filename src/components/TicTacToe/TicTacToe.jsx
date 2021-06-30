import React, { useState, useEffect } from 'react'
import "./styles.css"
import {getRobotMove, getMinimaxRobotMove} from "./robot.js"

function emptyBoard(size){
  const board = []
  for(let y = 0; y < size; y++){
    board.push([])
    for(let x = 0; x < size; x++){
      board[y].push("")
    }
  }
  return board
}

const players = ['x', 'o'];

function allEqual(...args){
  return args.every(v=>{
    return v!==""&&v===args[0]
  })
}

function getAvailableTiles(board){
  return board.reduce((available, row, y)=>{
    row.forEach((tile,x)=>{
      if(tile===""){
        available.push([x,y])
      }
    })
    return available
  },[])
}

function checkWinner(board){

  //check horizontals
  for(let row = 0; row<board.length; row++){
    if(allEqual(...board[row])){
      return board[row][0]
    }
  }

  //check verticals
  for(let column = 0; column<board.length; column++){
    console.log([board[0][column], board[1][column], board[2][column]])
    if(allEqual(board[0][column], board[1][column], board[2][column])){
      return board[0][column]
    }
  }
  

  //TODO refactor to make dynamic size board
  // check diagonals
  if(allEqual(board[0][0], board[1][1], board[2][2])){
    return board[0][0]
  }
  if(allEqual(board[0][2], board[1][1], board[2][0])){
    return board[0][2]
  }

  //Check for Tie
  if(getAvailableTiles(board).length===0){
    return 'CAT'
  }

}

const ROBOT_IS_PLAYING = false

//==
//== START OF THE REACT COMPONENT
//==
function TicTacToe({}) {
  const [board, setBoard] = useState(()=>emptyBoard(3))
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [gameWinner, setGameWinner] = useState(null)

  function placeMark({x,y}){
    setBoard(prev=>{
      const newBoard = [...prev]
      newBoard[y][x] = currentPlayer
      return newBoard
    });
  }

  function isRobotsTurn(){
    return ROBOT_IS_PLAYING && currentPlayer!=="x"
  }

  function handlePlaceMark({x,y}){
    // if(isRobotsTurn()){
    //   return; // robots turn
    // }
    if(board[y][x] !== ""){
      return;
    }
    if(gameWinner){
      return;
    }
    placeMark({x,y})
    
  }
  function resetBoard(){
    setGameWinner(null)
    setBoard(()=>emptyBoard(3))
    setCurrentPlayer(null)
  }

  useEffect(()=>{
    console.log(board)
    const gameResult = checkWinner(board)
    if(!gameResult && board){
      setCurrentPlayer((prev)=>{
        const currentPlayerIndex = players.findIndex(p=>p==prev)
        const nextPlayer = players[(currentPlayerIndex + 1) % (players.length)]
        
        return nextPlayer
      })
    } else{
      setGameWinner(gameResult);
    }
    
  }, [board, setCurrentPlayer, checkWinner])

  useEffect(()=>{
    if(currentPlayer!=="x" && currentPlayer !== null){
      console.log(currentPlayer)
      setBoard((prevBoard)=>{
        if(!prevBoard){
          return prevBoard
        }
        const newBoard = [...prevBoard]
        const {x,y} = getMinimaxRobotMove(newBoard)
        newBoard[y][x] = currentPlayer
        return newBoard
      })
    }
      
  },[currentPlayer])

  return <div className="board-wrapper">
    {gameWinner && <ShowWinner winner={gameWinner}/>}

    {(!gameWinner && currentPlayer) ? <p>Current Player: <span>{currentPlayer=='x'?'Player 1 (X)':'Player 2 (O)'}</span></p> : <p></p>}

    <div className="board">
      {board.map((row,y)=>{
        return row.map((tile,x)=>{
          return <div className="tile" key={`${x},${y}`}>
            <button onClick={()=>handlePlaceMark({x,y})}>{tile}</button>
          </div>
        })
      })}
    </div>

    <button onClick={resetBoard}>Reset Board</button>
  </div>
}

export default TicTacToe

function ShowWinner({winner}){
  if(winner=='CAT'){
    return <h2>
      CAT
    </h2>
  }
  return <h2>The Winner is: <span>{winner=="x"?"Player 1":"Player 2"}</span></h2>
}