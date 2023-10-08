export default function SearchNode(props) {
  return (
    <div
      className="searchNode"
      contentEditable="true"
      style={{
        backgroundColor:
          props.state === -1 ? "red" : props.state === 1 ? "green" : "",
        filter: `blur(${props.blur ? ".5px" : "0px"})  brightness(${
          props.blur ? "0.5" : "1"
        })`,
      }}
    >
      {props.value}
    </div>
  );
}
