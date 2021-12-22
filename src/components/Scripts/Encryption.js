const a = "a".charCodeAt(0);
const A = "A".charCodeAt(0);
const z = "z".charCodeAt(0);
const Z = "Z".charCodeAt(0);

/**
 *
 * Helper Functions
 *
 */

const setAnimationSpeed = (sp) =>
  document.documentElement.style.setProperty("--animation-time", `${sp}ms`);
const isLower = (c) => c.charCodeAt(0) >= a && c.charCodeAt(0) <= z;
const isUpper = (c) => c.charCodeAt(0) >= A && c.charCodeAt(0) <= Z;
const isAlpha = (c) => isLower(c) || isUpper(c);
const clone2DArray = (array2D) => array2D.map((array1D) => [...array1D]);
/**
 *
 * Shift function helpers
 *
 */

/**
 *
 * @param {*} s
 * @param {*} c
 * @param {*} en
 * @returns
 */
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

/**
 *
 * Transpose Helpers
 *
 */

/**
 * Increments the x and y postions of the transpose box in the horizontal way
 * @param {Number} width
 * @param {Number} height
 * @param {Number} xPos
 * @param {Number} yPos
 * @param {function} setXPos
 * @param {function} setYPos
 * @returns {null} null
 */
const IncrementTransposePosHorizontal = (
  width,
  height,
  xPos,
  yPos,
  setXPos,
  setYPos
) => {
  console.log("xPos:", xPos, "yPos:", yPos, "w:", width, "h:", height);
  if (xPos === width - 1) {
    if (yPos === height - 1) {
      setXPos(-1);
      setYPos(-1);
      return;
    }
    setYPos((y) => y + 1);
    setXPos(0);
    return;
  }
  setXPos((x) => x + 1);
  return;
};

/**
 * Increments the x and y postions of the transpose box in the horizontal way
 * @param {Number} width
 * @param {Number} height
 * @param {Number} xPos
 * @param {Number} yPos
 * @param {function} setXPos
 * @param {function} setYPos
 * @returns {null} null
 */
const IncrementTransposePosVerticle = (
  width,
  height,
  xPos,
  yPos,
  setXPos,
  setYPos
) => {
  if (yPos === height - 1) {
    if (xPos === width - 1) {
      setXPos(-1);
      setYPos(-1);
      return;
    }
    setXPos((y) => y + 1);
    setYPos(0);
    return;
  }
  setYPos((x) => x + 1);
  return;
};

const placeCharInTransposeBox = (
  char,
  transposeBox,
  xPos,
  yPos,
  setXPos,
  setYPos
) => {
  transposeBox[xPos][yPos] = char;
  IncrementTransposePosHorizontal(
    transposeBox.length,
    transposeBox[0].length,
    xPos,
    yPos,
    setXPos,
    setYPos
  );
};

const retrieveCharFromTransposeBox = (
  transposeBox,
  xPos,
  yPos,
  setX,
  setY,
  appendResult
) => {
  console.log("Retrieve from trnaspose box . . .\nxPos:", xPos, "yPos", yPos);
  appendResult((r) => r + transposeBox[xPos][yPos]);
  IncrementTransposePosVerticle(
    transposeBox.length,
    transposeBox[0].length,
    xPos,
    yPos,
    setX,
    setY
  );
};

/**
 *
 * Exported Transpose Encryption Functions
 *
 */

export function Transpose(
  message,
  position,
  tPosition,
  step,
  appendResult,
  isTransposed,
  transposeBox,
  transposeX,
  transposeY,
  setPosition,
  setStep,
  setTPosition,
  setTransposeBox,
  setTransposeX,
  setTransposeY,
  setIsTransposed
) {
  //Are all characters placed into the transpose box
  //Yes
  if (isTransposed) {
    if (step === 0) {
      //Increment t-pos
      setTPosition((p) => p + 1);
      if (transposeX === -1) setTransposeX(0);
      if (transposeY === -1) setTransposeY(0);
      setStep((s) => s + 1);
      return;
    }
    retrieveCharFromTransposeBox(
      transposeBox,
      transposeX,
      transposeY,
      setTransposeX,
      setTransposeY,
      appendResult
    );
    if (tPosition === message.length - 1) {
      setTPosition(-1);
      setTransposeX(-1);
      setTransposeY(-1);
      setIsTransposed(false);
      setTransposeBox((tb) => tb.map((arr) => arr.map((_) => " ")));
    }
    setStep(0);
    return;
  }
  //No
  appendResult("");
  if (step === 0) {
    //Increment pos
    setPosition(++position);
    if (transposeX === -1) setTransposeX(0);
    if (transposeY === -1) setTransposeY(0);
    setStep((s) => s + 1);
    return;
  }
  //Place into the TransPoseBox
  placeCharInTransposeBox(
    message[position],
    transposeBox,
    transposeX,
    transposeY,
    setTransposeX,
    setTransposeY
  );
  setTransposeBox(clone2DArray(transposeBox));
  if (position === message.length - 1) {
    setIsTransposed(true);
    setTransposeY(-1);
    setTransposeX(-1);
    setPosition(-1);
  }
  setStep(0);
  return;
}

/**
 *
 * Exported Shift encryption functions
 *
 */

export function FinishShift(message, shift, appendResult, decryption) {
  let output = "";
  for (let c of message) output += applyShift(shift, c, decryption);
  appendResult(output);
}
export function AnimatedShift(
  message,
  shift,
  position,
  step,
  setPosition,
  setChar,
  setStep,
  setEncryptedChar,
  appendResult,
  decryption,
  setAnimation,
  animationSpeed
) {
  setAnimationSpeed(animationSpeed);
  let p = position;
  let s = step;
  var animation = setInterval(() => {
    Shift(
      message,
      shift,
      p,
      s,
      setPosition,
      setChar,
      setStep,
      setEncryptedChar,
      appendResult,
      decryption
    );
    if (s === 0) p++;
    s = (s + 1) % 4;
    if (p === message.length) {
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setStep(0);
    }
  }, animationSpeed);
  setAnimation(animation);
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
    setChar(message[position + 1]);

    setStep(1);
    return;
  }
  //Set character
  if (step === 1) {
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
