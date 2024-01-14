import Strike from "./Strike";

export default function Board({ strikeClass, ...props }) {
  return (
    <>
      <div className="board" {...props} />
      <Strike strikeClass={strikeClass} />
    </>
  );
}
