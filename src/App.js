import { useState } from "react";
import "./App.css";
import GridPlane from "./components/GridPlane";

function App() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(20);
  return (
    <div className="App">
      <GridPlane length={length} width={width} />
    </div>
  );
}

export default App;
