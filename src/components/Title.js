import PopOutDiv from "./PopOutDiv";
import ProblemSelect from "./ProblemSelect";

export default function Title(props) {
  return (
    <div className="titleBar" style={{ display: "flex", gap: ".7ch" }}>
      <PopOutDiv
        active={props.active}
        content={props.content}
        setActive={props.setActive}
      />
      <div className="title">
        <span>Shane's</span>
        <span>Algorithm</span>
        <span>Display</span>
      </div>
      <ProblemSelect
        setProblemType={props.setProblemType}
        setContent={props.setContent}
      />
      <button
        type="button"
        onClick={() => props.setActive((a) => !a)}
        style={{ minHeight: "3em", margin: "auto 0" }}
      >
        What is this?
      </button>
    </div>
  );
}
