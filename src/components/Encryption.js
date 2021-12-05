import { useState } from "react";
import EncryptionField from "./EncryptionField";
import EncryptionToolBar from "./EncryptionToolBar";

export default function Encryption(props) {
  const [message, setMessage] = useState("");
  const [encryptionID, setEncryptionID] = useState(1);
  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  const [animation, setAnimation] = useState(null);

  return (
    <>
      <EncryptionToolBar
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <EncryptionField />
    </>
  );
}
