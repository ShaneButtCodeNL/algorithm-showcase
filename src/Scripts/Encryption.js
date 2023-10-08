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
 * RSA Helpers
 *
 */

/**
 * a^b % m
 * @param {*} a
 * @param {*} b
 * @param {*} m
 */
const modExp = (a, b, m) => {
  const limit = Math.ceil(Math.log(b) / Math.log(2));
  let calc = { 1: a };
  let r = a;
  let e = 1;
  while (e <= limit) {
    r = r ** 2 % m;
    calc[2 ** e] = r;
    e++;
  }
  let res = 1;
  let p = 1;
  while (p <= b) {
    if (b & p) res = (res * calc[p]) % m;
    p = p << 1;
  }

  return res % m;
};

/**
 *
 * Exported RSA Functions
 *
 */

export function FinishRSA(message, decryption, n, e, d) {
  return modExp(message, decryption ? d : e, n);
}

/**
 *
 * Exported Transpose Encryption Functions
 *
 */

export function animatedTranspose(
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
  setIsTransposed,
  setAnimation,
  animationSpeed
) {
  setAnimationSpeed(animationSpeed);
  let p = position,
    pT = tPosition;
  let s = step;
  let pX = transposeX,
    pY = transposeY;
  let isTrans = isTransposed;
  let tBox = clone2DArray(transposeBox);
  const w = tBox.length,
    h = tBox[0].length;
  var animation = setInterval(() => {
    Transpose(
      message,
      p,
      pT,
      s,
      appendResult,
      isTrans,
      tBox,
      pX,
      pY,
      setPosition,
      setStep,
      setTPosition,
      setTransposeBox,
      setTransposeX,
      setTransposeY,
      setIsTransposed
    );
    if (isTrans) {
      console.log("ISTRANS", pX, pY, pT, tBox);
      if (s === 0) {
        pT++;
        if (pX === -1) pX = 0;
        if (pY === -1) pY = 0;
      } else {
        if (pT === message.length - 1) {
          clearInterval(animation);
          setAnimation(null);
          setPosition(-1);
          setTransposeY(-1);
          setTransposeX(-1);
          setTPosition(-1);
        }
        if (pY === h - 1) {
          if (pX === w - 1) {
            pX = -1;
            pY = -1;
          } else {
            pX++;
            pY = 0;
          }
        } else pY++;
      }
    } else {
      if (s === 0) {
        p++;
        if (pX === -1) pX = 0;
        if (pY === -1) pY = 0;
      }
      //step 1
      else {
        if (p === message.length - 1) {
          isTrans = true;
          pX = -1;
          pY = -1;
          p = -1;
        } else {
          if (pX === w - 1) {
            if (pY === h - 1) {
              pX = -1;
              pY = -1;
            } else {
              pY++;
              pX = 0;
            }
          } else pX++;
        }
      }
    }
    s = s ^ 1;
  }, animationSpeed);
  setAnimation(animation);
}

export function finishTranspose(
  message,
  transposeBox,
  setTransposeBox,
  appendResult
) {
  let l = transposeBox.length,
    w = transposeBox[0].length,
    res = new Array(l * w);
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < w; j++) {
      let pos = i * w + j;
      let rPos = j * l + i;
      let c = message[rPos];
      transposeBox[i][j] = c;
      res[pos] = c;
    }
  }
  setTransposeBox(transposeBox.map((a) => a.map((v) => (v ? v : " "))));
  appendResult(res.join("").trim());
}

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
 * Exported Better Shift Functions
 *
 */
export function FinishBetterShift(
  message,
  shift,
  appendResult,
  decryption,
  resetShift
) {
  let output = "";
  for (let c of message) {
    output += applyShift(shift, c, decryption);
    shift = (shift + 1) % 26;
  }
  resetShift();
  appendResult(output);
}

export function AnimatedBetterShift(
  message,
  shift,
  position,
  step,
  setPosition,
  setChar,
  setStep,
  setEncryptedChar,
  setShift,
  resetShift,
  appendResult,
  decryption,
  setAnimation,
  animationSpeed
) {
  setAnimationSpeed(animationSpeed);
  let p = position;
  let s = step;
  let sh = shift;
  var animation = setInterval(() => {
    BetterShift(
      message,
      sh,
      p,
      s,
      setPosition,
      setChar,
      setStep,
      setEncryptedChar,
      setShift,
      appendResult,
      decryption,
      resetShift
    );
    if (s === 0) p++;
    if (s === 4) sh = (sh + 1) % 26;
    s = (s + 1) % 5;
    if (p === message.length) {
      clearInterval(animation);
      setAnimation(null);
      setPosition(-1);
      setStep(0);
    }
  }, animationSpeed);
  setAnimation(animation);
}
export function BetterShift(
  message,
  shift,
  position,
  step,
  setPosition,
  setChar,
  setStep,
  setEncryptedChar,
  setShift,
  appendResult,
  decryption,
  resetShift
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
  if (step === 3) {
    appendResult((s) => s + applyShift(shift, message[position], decryption));
    setStep(4);
    return;
  }
  //Increment shift value
  setStep(0);
  setShift((v) => (v + 1) % 26);
  if (position === message.length - 1) {
    setPosition(-1);
    resetShift();
  }
  setChar("");
  setEncryptedChar("");
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
