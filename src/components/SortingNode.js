const displayStyle = { width: "auto" };

export default function SortingNode(props) {
  return props.displayType === 0 ? (
    <div
      className="searchNode"
      style={{
        backgroundColor: props.state === 1 ? "green" : "inherit",
        ...(props.displayStyle ? displayStyle : {}),
      }}
    >
      {props.value}
    </div>
  ) : (
    <div
      style={{
        flexGrow: "1",
        flexShrink: "1",
        flexBasis: "auto",
        backgroundColor: props.state === 1 ? "green" : "yellow",
        height: `${props.value * 3}px`,
        outline: "solid 1px",
        outlineColor: "black",
      }}
    ></div>
  );
}
