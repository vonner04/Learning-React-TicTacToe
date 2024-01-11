export default function Square(props) {
  return (
    <div className={"square"} {...props}>
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
}
