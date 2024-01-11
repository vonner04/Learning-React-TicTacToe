import Board from "./Board";
import Square from "./Square";
import "./App.css";

export default function App() {
  return (
    <>
      <main>
        <Board>
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
          <Square />
        </Board>
      </main>
    </>
  );
}
