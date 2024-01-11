import Board from "./Board";
import Square from "./Square";
import { useState } from "react";
import "./App.css";

const defaultSquares = () => new Array(9).fill(null);

export default function App() {
  const [squares, setSquares] = useState(defaultSquares());

  function handleSquareClick(index) {
    let newSquares = squares;
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
