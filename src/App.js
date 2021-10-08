import { useState } from "react";
import "./App.css";
import "./components/PathFinding";
import PathFinding from "./components/PathFinding";
import Searching from "./components/Searching";
import Sorting from "./components/Sorting";
import Title from "./components/Title";

function App() {
  const [algoType, setAlgoType] = useState(0);
  const renderProblem = (num) => {
    switch (num) {
      case 1:
        return <PathFinding />;
      case 2:
        return <Searching />;
      case 3:
        return <Sorting />;
      default:
        return <></>;
    }
  };
  return (
    <div className="App">
      <Title algoType={algoType} setAlgoType={setAlgoType} />
      <div className={"displayWindow"}>{renderProblem(algoType)}</div>
    </div>
  );
}

export default App;
