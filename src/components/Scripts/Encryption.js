const a = "a".charCodeAt(0);
const A = "A".charCodeAt(0);
const z = "z".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const isLower = (c) => c.charCodeAt(0) >= a && c.charCodeAt(0) <= z;
const isUpper = (c) => c.charCodeAt(0) >= A && c.charCodeAt(0) <= Z;
const isAlpha = (c) => isLower(c) || isUpper(c);
const applyShift = (s, c, en) => {
  if (isLower(c)) {
    let ch = c.charCodeAt(0);
    const code = (en ? ch - a - s : ch - a + s) % (z - a + 1);
    return String.fromCharCode(code >= 0 ? a + code : z + code + 1);
  }
  if (isUpper(c)) {
    let ch = c.charCodeAt(0);
    const code = (en ? ch - A - s : ch - A + s) % (Z - A + 1);
    return String.fromCharCode(code >= 0 ? A + code : Z + code + 1);
  }
  return c;
};

export function FinishShift(message, shift, appendResult, decryption) {
  let output = "";
  for (let c of message) output += applyShift(shift, c, decryption);
  appendResult(output);
}
export function Shift(
  message,
  shift,
  position,
  step,
  setPosition,
  setChar,
  setStep,
  setEncryptedChar,
  appendResult,
  decryption
) {
  if (position === -1) appendResult("");
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
    setEncryptedChar(applyShift(shift, message[position], decryption));
    setStep(3);
    return;
  }
  //Add to result
  appendResult((s) => s + applyShift(shift, message[position], decryption));
  setStep(0);
  if (position === message.length - 1) setPosition(-1);
  setChar("");
  setEncryptedChar("");
}
