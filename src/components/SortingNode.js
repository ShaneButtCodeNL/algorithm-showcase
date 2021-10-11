const displayStyle = { width: "auto" };

export default function SortingNode(props) {
  {
    return props.displayType === 0 ? (
      <div
        className="searchNode"
        style={props.displayStyle ? displayStyle : {}}
      >
        {props.value}
      </div>
    ) : (
      <div
        style={{
          flexGrow: "1",
          flexShrink: "1",
          flexBasis: "auto",
          backgroundColor: "yellow",
          height: `${props.value * 5}px`,
        }}
      ></div>
    );
  }
}
