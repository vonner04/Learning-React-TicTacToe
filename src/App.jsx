import Board from "./Board";
import Square from "./Square";
import { useState, useEffect } from "react";
import "./App.css";

const defaultSquares = () => new Array(9).fill(null);
const filledSquares = (square) => square !== null;

const winningCombos = [
  [0, 1, 2], //Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //Diagonal
  [2, 4, 6],
];
export default function App() {
  const [squares, setSquares] = useState(defaultSquares());

  useEffect(() => {
    //Check for the winner
    const linesThatAre = (a, b, c) => {
      return winningCombos.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon) {
      alert("You won!");
      setSquares(defaultSquares());
    }

    if (computerWon) {
      alert("You lost!");
      setSquares(defaultSquares());
    }

    const isComputerTurn = squares.filter(filledSquares).length % 2 === 1; //Computer turn only happens if box is empty or odd number of filled squares.
    //Let the computer make a move
    const putComputerTurn = (index) => {
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

    //Block player from winning
    const blockingMove = linesThatAre("x", "x", null);
    if (blockingMove.length > 0) {
      const blockTurn = blockingMove[0].filter(
        (index) => squares[index] === null
      );
      putComputerTurn(blockTurn);
      return;
    }

    //Greedy algorithm to force win condition if possible
    const winningMove = linesThatAre("o", "o", null);
    if (winningMove.length > 0) {
      const winTurn = winningMove[0].filter(
        (index) => squares[index] === null
      )[0];
      putComputerTurn(winTurn);
      return;
    }
    //Decide which random square to fill.
    const randomSquare =
      emptySquares[Math.ceil(Math.random() * emptySquares.length)];

    putComputerTurn(randomSquare);
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
        <Board>
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
      </main>
    </>
  );
}
