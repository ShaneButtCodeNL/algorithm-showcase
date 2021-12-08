const a = "a".charCodeAt(0);
const A = "A".charCodeAt(0);
const z = "z".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const isLower = (c) => c.charCodeAt(0) >= a && c.charCodeAt(0) <= z;
const isUpper = (c) => c.charCodeAt(0) >= A && c.charCodeAt(0) <= Z;
const isAlpha = (c) => isLower(c) || isUpper(c);
const applyShift = (s, c) => {
  if (isLower(c)) {
    let ch = c.charCodeAt(0);
    return String.fromCharCode(a + ((ch - a + s) % (z - a)));
  }
  if (isUpper(c)) {
    let ch = c.charCodeAt(0);
    return String.fromCharCode(A + ((ch - A + s) % (Z - A)));
  }
  return c;
};
export function Shift(
  message,
  shift,
  position,
  step,
  setPosition,
  setChar,
  setStep,
  setEncryptedChar,
  appendResult
) {
  console.log(
    "M",
    message,
    "S",
    shift,
    "P",
    position,
    "St",
    step,
    "C",
    message[position]
  );
  //Set Position
  if (step === 0) {
    setPosition((p) => p + 1);
    setStep(1);
    return;
  }
  //Set character
  if (step === 1) {
    setChar(message[position]);
    setStep(2);
    return;
  }
  //Set encrypted char
  if (step === 2) {
    setEncryptedChar(applyShift(shift, message[position]));
    setStep(3);
    return;
  }
  //Add to result
  appendResult((s) => s + applyShift(shift, message[position]));
  setStep(0);
}
