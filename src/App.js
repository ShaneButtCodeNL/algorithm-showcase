import { useState } from "react";
import "./App.css";
import "./components/PathFinding";
import Encryption from "./components/Encryption";
import PathFinding from "./components/PathFinding";
import Searching from "./components/Searching";
import Sorting from "./components/Sorting";
import Title from "./components/Title";
const defaultContent = "You need to select a problem first.";
function App() {
  const [problemType, setProblemType] = useState(0);
  const [active, setActive] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const renderProblem = (num) => {
    switch (num) {
      case 1:
        return <PathFinding setContent={setContent} />;
      case 2:
        return <Searching setContent={setContent} />;
      case 3:
        return <Sorting setContent={setContent} />;
      case 4:
        return <Encryption setContent={setContent} />;
      default:
        return <></>;
    }
  };
  return (
    <div className="App">
      <Title
        problemType={problemType}
        setProblemType={setProblemType}
        active={active}
        setActive={setActive}
        content={content}
        setContent={setContent}
      />
      <div className={"displayWindow"}>{renderProblem(problemType)}</div>
    </div>
  );
}

export default App;
