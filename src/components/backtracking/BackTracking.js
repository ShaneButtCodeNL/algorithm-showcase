import BackTrackingField from "./BackTrackingField";
import BackTrackingToolBar from "./BackTrackingToolBar";
import { useState } from "react";

export default function BackTracking(props) {
  const [algoID, setAlgoID] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [animation, setAnimation] = useState(null);
  return (
    <>
      <BackTrackingToolBar
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <BackTrackingField
        algoID={algoID}
        animation={animation}
        animationSpeed={animationSpeed}
        isAnimated={animation !== null}
        setAlgoID={setAlgoID}
        setAnimation={setAnimation}
        setContent={props.setContent}
      />
    </>
  );
}
