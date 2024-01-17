import GameState from "../GameState";

export default function Reset({ gameState, onReset }) {
  if (gameState === GameState.PLAYING) {
    return;
  }
  return (
    <button className="reset-button" onClick={onReset}>
      Reset
    </button>
  );
}
