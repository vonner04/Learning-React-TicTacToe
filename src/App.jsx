import Board from "./Board";
import Square from "./Square";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleSquareClick(index) {
    let newSquares = squares;
    newSquares[index] = "x";
    setSquares({ ...newSquares });
  }

  return (
    <>
      <main>
        <Board>
          {
            //Populate the grid
            squares.map((square) => (
              <Square
                x={square === "x" ? 1 : 0}
                o={square === "x" ? 1 : 0}
                onClick={() => handleSquareClick()}
              />
            ))
          }
        </Board>
      </main>
    </>
  );
}
