import EncryptionControlBar from "./EncryptionControlBar";
import { useEffect, useState } from "react";

//Dictionary used for converting numbers to characters
const codes = { 1: "a", 27: "A" };
const RSAArrayCap = 998;

for (let i = 0; i < 25; i++) {
  //b-z
  codes[i + 2] = String.fromCharCode("b".charCodeAt(0) + i);
  //B-Z
  codes[i + 2 + 26] = String.fromCharCode("B".charCodeAt(0) + i);
}
for (let i = 0; i < 47; i++) codes[i + 53] = String.fromCharCode(161 + i);
//65 is ""
codes[65] = String.fromCharCode(936);
console.log("codes\n", codes);

const reverseLookUpCodes = (value) =>
  Object.keys(codes).find((k) => codes[k] === value);

const findD = (e, mod) => {
  for (let i = 1; i < mod; i++) {
    if (((e % mod) * (i % mod)) % mod === 1) return i;
  }
  return null;
};

/**
 * Converts a base 10 integer as a string
 * @param {Number} number An encoded string as a base 10 integer
 * @returns {String} A string
 */
const convertNumToMsg = (number) => {
  let msg = [];
  while (number) {
    let v = number % 100;
    number = Math.floor(number / 100);
    msg.unshift(codes[v]);
  }
  if (msg.length) return msg.join("");
  return "";
};

/**
 * Converts a string into a base 10 integer
 * @param {String} msg
 * @returns {Number} a base 10 integer
 */
const convertMSGToNum = (msg) => {
  let res = [];
  //Only alpha
  for (let c of msg) if (reverseLookUpCodes(c) !== undefined) res.push(c);
  return Number.parseInt(
    res
      .map((v) => {
        let c = reverseLookUpCodes(v);
        if (c < 10) return `0${c}`;
        return `${c}`;
      })
      .join("")
  );
};

/**
 * Finds the Greatest common factor of two numbers
 * @param {Number} x Number 1
 * @param {Number} y Number 2
 * @returns {Number} The greatest common factor of x & y
 */
const gcf = (x, y) => {
  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
};
/**
 * Finds the Lowest Common Multiple of two numbers
 * @param {Number} x Number 1
 * @param {Number} y Number 2
 * @returns {Number} The lowest common multiple of x & y
 */
const lcm = (x, y) => (x * y) / gcf(x, y);
/**
 * Finds all prime numbers under a limit using euclidean sieve
 * @param {Number} n Max limit for the list
 * @returns {Number[]} List of primes less than or equal to n
 */
const generatePrimes = (n) => {
  let a = Array.from({ length: n - 1 }, (_, i) => i + 2);
  let p = 0;
  while (p < a.length) {
    a = a.filter((v) => v === a[p] || v % a[p] !== 0);
    p++;
  }
  return a;
};
//Primes less than 2100
const primes = generatePrimes(2100);
const oOffset = 0.3;
const oFunction = (v) => 1 - v * (v < 0 ? oOffset * -1 : oOffset);
export default function EncryptionField(props) {
  const [step, setStep] = useState(0);
  const [transposeX, setTransposeX] = useState(-1);
  const [transposeY, setTransposeY] = useState(-1);
  const [decryption, setDecryption] = useState(false);
  const [primeP, setPrimeP] = useState(2);
  const [primeQ, setPrimeQ] = useState(5);
  const [modulusN, setModulusN] = useState(10);
  const [lambdaN, setLambdaN] = useState(() => lcm(2, 5));
  const [eRSA, setERSA] = useState(3);
  const [eRSAArray, setERSAArray] = useState(
    Array.from({ length: lambdaN - 2 }, (_, i) => i + 2).filter(
      (v) => gcf(v, lambdaN) === 1
    )
  );
  const [dRSA, setDRSA] = useState(() => findD(eRSAArray, lambdaN));
  const [cipher, setCipher] = useState(() => convertMSGToNum(props.message));
  const [encodedCipher, setEncodedCipher] = useState(null);

  useEffect(() => {
    setCipher(convertMSGToNum(props.message));
  }, [props.message]);
  useEffect(() => {
    const newLN = lcm(primeP - 1, primeQ - 1);
    const newERSAARRAY = Array.from(
      { length: Math.min(newLN - 2, RSAArrayCap) },
      (_, i) => i + 2
    ).filter((v) => gcf(v, newLN) === 1);
    setERSAArray(newERSAARRAY);
    setERSA(newERSAARRAY[0]);
    setModulusN(primeQ * primeP);
    setDRSA(() => findD(eRSA, newLN));
    setLambdaN(newLN);
  }, [primeP, primeQ]);
  useEffect(() => {
    const newLN = lcm(primeP - 1, primeQ - 1);
    setDRSA(() => findD(eRSA, newLN));
  }, [eRSA]);
  useEffect(() => {
    const res = convertNumToMsg(Number.parseInt(encodedCipher));
    console.log(res);
    props.setResult(res);
  }, [encodedCipher]);
  return (
    <div className="encryptionFieldContainer">
      <div id="encryptionFieldDisplay">
        <EncryptionControlBar
          algoID={props.algoID}
          animation={props.animation}
          animationSpeed={props.animationSpeed}
          cipher={cipher}
          convertMSGToNum={convertMSGToNum}
          decryption={decryption}
          dRSA={dRSA}
          encodedCipher={encodedCipher}
          eRSA={eRSA}
          eRSAArray={eRSAArray}
          isAnimated={props.isAnimated}
          lambdaN={lambdaN}
          makeTransposeBox={props.makeTransposeBox}
          makeTransposeBoxRotated={props.makeTransposeBoxRotated}
          message={props.message}
          modulusN={modulusN}
          position={props.position}
          primeP={primeP}
          primeQ={primeQ}
          primes={primes}
          reset={props.reset}
          shift={props.shift}
          step={step}
          transposeBox={props.transposeBox}
          transposeHeight={props.transposeHeight}
          transposeX={transposeX}
          transposeY={transposeY}
          setAlgoID={props.setAlgoID}
          setAnimation={props.setAnimation}
          setCipher={setCipher}
          setContent={props.setContent}
          setDecryption={setDecryption}
          setDRSA={setDRSA}
          setEncodedCipher={setEncodedCipher}
          setERSA={setERSA}
          setERSAArray={setERSAArray}
          setMessage={props.setMessage}
          setMessageCharacter={props.setMessageCharacter}
          setPosition={props.setPosition}
          setPrimeP={setPrimeP}
          setPrimeQ={setPrimeQ}
          setProcessedCharacter={props.setProcessedCharacter}
          setProcessedMessage={props.setProcessedMessage}
          setResult={props.setResult}
          setShift={props.setShift}
          setStep={setStep}
          setTransposeBox={props.setTransposeBox}
          setTransposeHeight={props.setTransposeHeight}
          setTransposeX={setTransposeX}
          setTransposeY={setTransposeY}
        />
        <div id="encryptionField">
          <div id="messageField" className="encryptionFieldItem">
            <label>{`${
              props.algoID === 4 && decryption ? "Cipher" : "Message"
            } : `}</label>
            <div className="messageContainer">
              {(props.algoID === 4 && decryption ? "" + cipher : props.message)
                .split("")
                .map((v, i) => {
                  const pos = props.position - i;
                  const dValue =
                    props.position === -1
                      ? "block"
                      : pos >= -2 && pos <= 2
                      ? "block"
                      : "none";
                  const oValue = props.position === -1 ? 1 : oFunction(pos);
                  const colorBG = pos ? "rgb(85, 85, 85)" : "rgb(16, 247, 8)";
                  return (
                    <div
                      className="messageCharacterContainer"
                      key={i}
                      style={{
                        display: dValue,
                        opacity: oValue,
                        backgroundColor: colorBG,
                      }}
                    >
                      <div
                        className="messageCharacter"
                        style={{
                          display: dValue,
                          opacity: oValue,
                          backgroundColor: colorBG,
                          ...(pos === 0 ? { color: "black" } : {}),
                        }}
                      >
                        {v}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {
            //For shift encryption
          }
          <div
            id="shiftEncryptionContainer"
            className="encryptionFieldItem"
            style={{
              display:
                props.algoID === 1 || props.algoID === 3 ? "inline" : "none",
            }}
          >
            <div className="encryptionFieldItem encryptionBox">
              <span>Value:</span>
              <input
                type="text"
                disabled={true}
                value={props.messageCharacter}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 1 ? "0px 0px 10px yellow" : "none",
                }}
              />
              <span>Shift :</span>
              <input
                type="text"
                disabled={true}
                value={props.shift}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 2 ? "0px 0px 10px yellow" : "none",
                }}
              />
              <span>Output:</span>
              <input
                type="text"
                disabled={true}
                value={props.processedCharacter}
                style={{
                  width: "2ch",
                  textAlign: "center",
                  boxShadow: step === 3 ? "0px 0px 10px yellow" : "none",
                }}
              />
            </div>
          </div>
          {
            //For transpose
          }
          <div
            id="transposeEncryptionContainer"
            className="encryptionFieldItem"
            style={{ display: props.algoID === 2 ? "inline" : "none" }}
          >
            <label>Transpose Area:</label>
            <div className="transposeContainer">
              {props.transposeBox.map((row, rowIndex) => {
                return (
                  <div className="transposeCol" key={`row-${rowIndex}`}>
                    {row.map((_, colIndex) => {
                      return (
                        <div
                          className="transposeCharacterBox"
                          key={`row-${rowIndex}-col-${colIndex}`}
                          style={
                            rowIndex === transposeX && colIndex === transposeY
                              ? {
                                  boxShadow: "0 0 0.15em 0.1em #FFDB00",
                                  backgroundColor: "#FFDB00",
                                  color: "black",
                                }
                              : {}
                          }
                        >
                          {props.transposeBox[rowIndex][colIndex]}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          {
            //For RSA
          }
          <div
            id="RSAEncryptionContainer"
            className="encryptionFieldItem"
            style={props.algoID === 4 ? {} : { display: "none" }}
          >
            <div>
              <label>N=( p*q ) : </label>
              <span>{modulusN}</span>
            </div>
            <div>
              <label>Totient N=LCM( p-1 , q-1 ) : </label>
              <span>{lambdaN}</span>
            </div>
            <div>
              <label>public key ( e , n ) : </label>
              <span>{`( ${eRSA} , ${modulusN} )`}</span>
            </div>
            <div>
              <label>private key ( d, n ) : </label>
              <span>{`${dRSA} , ${modulusN}`}</span>
            </div>
            <div
              style={props.algoID === 4 && !decryption ? {} : { opacity: "0" }}
            >
              <label>Message as a number C : </label>
              <span>{cipher}</span>
            </div>
          </div>

          {
            //END OF RSA
          }
          <div id="resultsField" className="encryptionFieldItem">
            <div className="resultsContainer">
              <label style={props.algoID === 4 ? {} : { display: "none" }}>
                Encoded Cipher:
              </label>
              <input
                type="text"
                className="encodedCipher"
                disabled={true}
                defaultValue={encodedCipher}
                style={{ display: "none" }}
              />
              <div
                className="messageContainer"
                style={props.algoID === 4 ? {} : { display: "none" }}
              >
                {(encodedCipher ? "" + encodedCipher : "Awaiting Input")
                  .split("")
                  .map((v, i) => {
                    return (
                      <div className="messageCharacterContainer" key={i}>
                        <div className="messageCharacter">{v}</div>
                      </div>
                    );
                  })}
              </div>
              <button
                type="button"
                style={{
                  maxWidth: "14ch",
                  minWidth: "5ch",
                  width: "100%",
                  margin: "1ch auto",
                }}
                onClick={() => navigator.clipboard.writeText(encodedCipher)}
              >
                COPY
              </button>
              <label>Result:</label>
              <input
                type="text"
                className="resultingString"
                disabled={true}
                defaultValue={props.result}
                style={{ display: "none" }}
              />

              <div className="messageContainer">
                {props.result.split("").map((v, i) => {
                  return (
                    <div className="messageCharacterContainer" key={i}>
                      <div className="messageCharacter">{v}</div>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                style={{
                  maxWidth: "14ch",
                  minWidth: "5ch",
                  width: "100%",
                  margin: "1ch auto",
                }}
                onClick={() => navigator.clipboard.writeText(props.result)}
              >
                COPY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
