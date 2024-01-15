import Board from "./Board";
import Square from "./Square";
import GameOver from "./GameOver";
import GameState from "./GameState";
import { useState, useEffect } from "react";
import "./App.css";

const defaultSquares = () => new Array(9).fill(null);
const filledSquares = (square) => square !== null;

const winningCombos = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];
export default function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [gameState, setGameState] = useState(GameState.PLAYING);
  const [strikeClass, setStrikeClass] = useState();

  useEffect(() => {
    //Check for the winner
    const linesThatAre = (a, b, c) => {
      return winningCombos.filter(({ combo, strikeClass }) => {
        const squareValues = combo.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;
    if (playerWon || computerWon) {
      setStrikeClass(
        playerWon
          ? linesThatAre("x", "x", "x")[0].strikeClass
          : linesThatAre("o", "o", "o")[0].strikeClass
      );
    }

    if (playerWon) {
      setGameState(GameState.PLAYER_WON);
      return;
    }

    if (computerWon) {
      setGameState(GameState.COMPUTER_WON);
      return;
    }

    if (!squares.includes(null)) {
      setSquares(defaultSquares());
      setGameState(GameState.DRAW);
      return;
    }

    const isComputerTurn = squares.filter(filledSquares).length % 2 === 1; //Computer turn only happens if box is empty or odd number of filled squares.
    //Let the computer make a move
    const putComputerTurnAt = (index) => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    //Get the index of the empty squares.
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);

    //Determine the empty square that the computer will fill.
    if (!isComputerTurn) return;

    //Greedy algorithm to force win condition if possible
    const winningMove = linesThatAre("o", "o", null);
    if (winningMove.length > 0) {
      const winTurn = winningMove[0].combo.filter(
        (index) => squares[index] === null
      )[0];
      putComputerTurnAt(winTurn);
      return;
    }

    //Block player from winning
    const blockingMove = linesThatAre("x", "x", null);
    if (blockingMove.length > 0) {
      const blockTurn = blockingMove[0].combo.filter(
        (index) => squares[index] === null
      );
      putComputerTurnAt(blockTurn);
      return;
    }

    //Fill the square that will lead to two in a row
    const strongMove = linesThatAre("o", null, null);
    if (strongMove.length > 0) {
      const strongTurn = strongMove[0].combo.filter(
        (index) => squares[index] === null
      )[0];
      putComputerTurnAt(strongTurn);
      return;
    }

    //Decide which random square to fill.
    const randomSquare =
      emptySquares[Math.ceil(Math.random() * emptySquares.length)];

    putComputerTurnAt(randomSquare);
  }, [squares]);

  function handleSquareClick(index) {
    //Check for the amount of filled squares
    const isPlayerTurn = squares.filter(filledSquares).length % 2 === 0; //Player turn only happens if box is empty or even number of filled squares.

    //Determine if it's the player's turn
    let newSquares = squares;
    if (!isPlayerTurn || newSquares[index] === "o") return;
    newSquares[index] = "x";
    setSquares([...newSquares]);
  }

  return (
    <>
      <main>
        <h1>Tic Tac Toe</h1>
        <div className="board-strike-container">
          <Board strikeClass={strikeClass}>
            {
              //Populate the grid
              squares.map((square, index) => (
                <Square
                  x={square === "x" ? 1 : 0}
                  o={square === "o" ? 1 : 0}
                  onClick={() => handleSquareClick(index)}
                />
              ))
            }
          </Board>
        </div>
        <GameOver gameState={gameState}></GameOver>
      </main>
    </>
  );
}
