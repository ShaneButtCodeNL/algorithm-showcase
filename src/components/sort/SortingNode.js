const displayStyle = { width: "auto" };
const colors = { "-1": "red", 0: "yellow", 1: "green" };
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
        backgroundColor:
          props.isSelectInsertSort && props.isSelected
            ? "blue"
            : colors["" + props.state],
        height: `${props.value * 3}px`,
        outline: "solid 1px",
        outlineColor: "black",
      }}
    ></div>
  );
}
