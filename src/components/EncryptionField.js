import EncryptionControlBar from "./EncryptionControlBar";
import { useEffect, useState } from "react";

const codes = { a: 1, A: 27 };
for (let i = "b".charCodeAt(0); i <= "z".charCodeAt(0); i++)
  codes[String.fromCharCode(i)] = codes[String.fromCharCode(i - 1)] + 1;
for (let i = "B".charCodeAt(0); i <= "Z".charCodeAt(0); i++)
  codes[String.fromCharCode(i)] = codes[String.fromCharCode(i - 1)] + 1;
console.log(codes);
const findD = (e, n) => {
  for (let i = 2; i < n; i++) {
    let d = (i * n + 1) / e;
    if (d === Math.floor(d)) return d;
  }
  return null;
};
const convertMSGToNum = (msg) => {
  let res = [];
  //Only alpha
  for (let c of msg) if (codes[c] !== undefined) res.push(c);
  return Number.parseInt(
    res
      .map((v) => {
        let c = codes[v];
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
const primes = generatePrimes(10000);
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
  const [lambdaN, setLambdaN] = useState(4);
  const [eRSA, setERSA] = useState(3);
  const [eRSAArray, setERSAArray] = useState(
    primes.filter((v) => lambdaN % v !== 0)
  );
  const [dRSA, setDRSA] = useState(() => findD(eRSAArray, lambdaN));
  const [msgNum, setMsgNum] = useState(() => convertMSGToNum(props.message));
  useEffect(() => {
    setMsgNum(convertMSGToNum(props.message));
  }, [props.message]);
  useEffect(() => {
    const newLN = (primeP - 1) * (primeQ - 1);
    const newERSAARRAY = primes.filter((v) => newLN % v !== 0 && v < newLN);
    setERSAArray(newERSAARRAY);
    setERSA(newERSAARRAY[0]);
    setModulusN(primeQ * primeP);
    setDRSA(() => findD(eRSA, newLN));
    setLambdaN(newLN);
  }, [primeP, primeQ]);
  useEffect(() => {
    const newLN = (primeP - 1) * (primeQ - 1);
    setDRSA(() => findD(eRSA, newLN));
  }, [eRSA]);
  return (
    <div className="encryptionFieldContainer">
      <div id="encryptionFieldDisplay">
        <EncryptionControlBar
          algoID={props.algoID}
          animation={props.animation}
          animationSpeed={props.animationSpeed}
          decryption={decryption}
          dRSA={dRSA}
          eRSA={eRSA}
          eRSAArray={eRSAArray}
          isAnimated={props.isAnimated}
          lambdaN={lambdaN}
          makeTransposeBox={props.makeTransposeBox}
          makeTransposeBoxRotated={props.makeTransposeBoxRotated}
          message={props.message}
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
          setContent={props.setContent}
          setDecryption={setDecryption}
          setDRSA={setDRSA}
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
            <label>Message:</label>
            <div className="messageContainer">
              {props.message.split("").map((v, i) => {
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
              <label>Totient N=( p-1 )*( q-1 ) : </label>
              <span>{lambdaN}</span>
            </div>
            <div>
              <label>public key ( n , e ) : </label>
              <span>{`( ${modulusN} , ${eRSA} )`}</span>
            </div>
            <div>
              <label>private key d : </label>
              <span>{dRSA}</span>
            </div>
            <div>
              <label>Message as a number C : </label>
              <span>{msgNum}</span>
            </div>
          </div>

          {
            //END OF RSA
          }
          <div id="resultsField" className="encryptionFieldItem">
            <div className="resultsContainer">
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
