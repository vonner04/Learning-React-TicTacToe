import GameState from "../GameState";

export default function GameOver({ gameState }) {
  switch (gameState) {
    case GameState.PLAYING:
      return null;
    case GameState.DRAW:
      return <div className="game-over">It's a draw!</div>;
    case GameState.PLAYER_WON:
      return <div className="game-over">You won!</div>;
    case GameState.COMPUTER_WON:
      return <div className="game-over">You lost!</div>;
    default:
      return <></>;
  }
}
