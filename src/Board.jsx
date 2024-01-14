import Strike from "./Strike";

export default function Board(props, { strikeClass }) {
  return (
    <>
      <div className="board" {...props} />
      <Strike className={strikeClass} />
    </>
  );
}
