import BackTrackingField from "./BackTrackingField";
import BackTrackingToolBar from "./BackTrackingToolBar";
import { useState } from "react";

export default function BackTracking(props) {
  const [algoId, setAlgoId] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [animation, setAnimation] = useState(null);
  return (
    <>
      <BackTrackingToolBar
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <BackTrackingField
        algoId={algoId}
        animation={animation}
        animationSpeed={animationSpeed}
        isAnimated={animation !== null}
        setAlgoId={setAlgoId}
        setAnimation={setAnimation}
        setContent={props.setContent}
      />
    </>
  );
}
