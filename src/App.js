import { useState } from "react";
import "./App.css";
import "./components/PathFinding";
import PathFinding from "./components/PathFinding";

function App() {
  const [algoType, setAlgoType] = useState(1);
  return (
    <div className="App">
      <div className="titleBar">Title</div>
      <div className={"displayWindow"}>
        {algoType === 1 ? <PathFinding /> : <></>}
      </div>
    </div>
  );
}

export default App;
