import { useState } from "react";
import "./App.css";
import "./components/PathFinding";
import PathFinding from "./components/PathFinding";
import Title from "./components/Title";

function App() {
  const [algoType, setAlgoType] = useState(1);
  return (
    <div className="App">
      <Title />
      <div className={"displayWindow"}>
        {algoType === 1 ? <PathFinding /> : <></>}
      </div>
    </div>
  );
}

export default App;
