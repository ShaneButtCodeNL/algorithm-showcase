const popOut = {
  maxWidth: "100vw",
  maxHeight: "100vh",
  opacity: "1",
  left: "0",
  top: "0",
};
const popIn = {
  maxWidth: "0vw",
  maxHeight: "0vh",
  opacity: "0",
  left: "50%",
  top: "50%",
  overflow:"hidden"
};

export default function PopOutDiv(props) {
  return (
    <div
      className="popOutDiv"
      style={props.active ? popOut : popIn}
      onClick={() => props.setActive((a) => !a)}
    >
      <ul style={{}}>
        {props.content.split("/br").map((v, i) => (
          <li key={`listKey${i}`}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
