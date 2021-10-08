import ProblemSelect from "./ProblemSelect";

export default function Title(props) {
  return (
    <div className="titleBar" style={{ display: "flex", gap: "12ch" }}>
      <div className="title">
        <span>Shane's</span>
        <span>Algorithm</span>
        <span>Display</span>
      </div>
      <ProblemSelect setAlgoType={props.setAlgoType} />
    </div>
  );
}
