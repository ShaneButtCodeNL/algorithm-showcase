//ON STEP 5 OF RSA KEY GENERATION

import { useEffect, useRef } from "react";
import { useState } from "react";

import {
  Shift,
  FinishShift,
  AnimatedShift,
  Transpose,
  finishTranspose,
  animatedTranspose,
  BetterShift,
  AnimatedBetterShift,
  FinishBetterShift,
  FinishRSA,
} from "../../Scripts/Encryption.js";
//""
const shift =
    "Shift Encryption works by shifting the characters in a word by a set distance./br" +
    'If a character "A" is encrypted by 3 places it becomes "D" from "A"->"B"->"C"->"D"./br' +
    "Decryption works by shifting the character in the opposite direction./br" +
    'If a character "D" is decrypted by 3 places it becomes "A" from "D"->"C"->"B"->"A"./br' +
    "For instances where the new position is beyond the range of the dictionary we just loop around to the beginning./br" +
    'If a character "Y" is encrypted by 3 places it becomes "B" from "Y"->"Z"->"A"->"B"./br' +
    "This also applyies to decryption, we just loop to the end of the dictionary./br" +
    'If a character "B" is decrypted 3 places it becomes "Y" from "B"->"A"->"Z"->"Y"./br' +
    'In this project only alpha characters are en/decrypted using two dictionaries ["A","B",...,"Y","Z"] and ["a","b",...,"y","z"] used for lower and upper characters/br' +
    "This Algorythm is not good to use to encrypt important data as a computer can break this very fast.",
  tranposition =
    "Transposition Encryption works by placeing characters into a  n*m box by filling up rows one at a time, then reading those characters one column at a time./br" +
    'The message "hello world" being transposed into a 2*6 box will look like . . .\n[\n\t["h","e","l","l","o"," "]\n\t["w","o","r","l","d",""]\n]\nWe Then read the columns first giving us "hweolrllod "./br' +
    "To decrypt an encrypted message we transpose it into a m*n box" +
    'The message "hweolrllod " being transposed into a 2*6 box will look like . . .\n[\n\t["h","w"]\n\t["e","o"]\n\t["l","r"]\n\t["l","l"]\n\t["o","d"]\n\t[" ",""]\n]\nWe Then read the columns first giving us "hello world"./br' +
    'Important notes are the length of the string must be less than or equal to the size of the box "n*m".\nThis Algorythm is also not good to use to encrypt important data as a computer can break this very fast.',
  betterShift =
    "Better Shift Encryption works by shifting the characters in a word by a set distance but changeing the distance with each character./br" +
    'If a character "A" is encrypted by 3 places it becomes "D" from "A"->"B"->"C"->"D"./br' +
    'If another character "A" is encrypted it will shift by 4 places it becomes "E" from "A"->"B"->"C"->"D"->"E"./br' +
    "Decryption works by shifting the character in the opposite direction./br" +
    'If a character "D" is decrypted by 3 places it becomes "A" from "D"->"C"->"B"->"A"./br' +
    'If the next character "E" is decrypted it is shifted by 4 places it becomes "A" from "E"->"D"->"C"->"B"->"A"./br' +
    "For instances where the new position is beyond the range of the dictionary we just loop around to the beginning./br" +
    'If a character "Y" is encrypted by 3 places it becomes "B" from "Y"->"Z"->"A"->"B"./br' +
    "This also applyies to decryption, we just loop to the end of the dictionary./br" +
    'If a character "B" is decrypted 3 places it becomes "Y" from "B"->"A"->"Z"->"Y"./br' +
    'In this project only alpha characters are en/decrypted using two dictionaries ["A","B",...,"Y","Z"] and ["a","b",...,"y","z"] used for lower and upper characters/br' +
    "This Algorythm is not good to use to encrypt important data as a computer can break this very fast.",
  rsa =
    "RSA is a public-key cryptosystem./br" +
    "A public-key cryptosystem is where there is a distinct encyrption and decryption key. The encryption key, or public key, is given out to anyone to decrypt a message. The decryption key,private key, is kept hidden and is used to decrypt an encrypted message./br" +
    'The strength of RSA comes for the difficulty of factoring the product of two large prime numbers "p" and "q"./br' +
    "In this project I use quite small primes ,less than 2100 for two main reasons.\n\t1. This is meant to demonstate the algorythm to humans and a number with 1000's of digits is not easy for most people to read.\n\t2. The RSA algorythm is rather slow with larger numbers so the smaller numbers also make it run faster.\nThis is also the reason the message can only be 3 characters long./br" +
    "The algorithm selects two primes p and q and multiplies them to get n such that n=p*q\nWe then find the totient of n and since n is the product of two primes we know it's phi(n)=(p-1)(q-1). We'll just call it phi from here.\nNext we need to find a value e such that e>1 and e<phi and e is co-prime to phi.\nNext we need to find a value d such that d*e=1(mod(phi)) or d*e(mod(phi))===1\nThis gives us the public key (e,n) and private key (d,n). Note the private key doesn't need to include n we do it for completeness./br" +
    "To encrypt data you use the formula c(m)=m^e(mod(n)), where c is the cipher and m is the message. In this project I use a base 10 number,[0,9], to encode ascii strings./br" +
    "To decrypt data you use the formula m(c)=c^d(mod(n)), where m is the message and c is the cipher. In this project I use a base 10 number,[0,9], to encode ascii strings./br" +
    "Interesting fact you can also encrypt a message with the private key and decrypt it with the public key.";
const content = [shift, tranposition, betterShift, rsa];
export default function EncryptionControlBar(props) {
  const algoSelectRef = useRef(null);
  const messageRef = useRef(null);
  const shiftRef = useRef(null);
  const transposeHeightRef = useRef(null);
  const pPrimeRef = useRef(null);
  const qPrimeRef = useRef(null);
  const eRef = useRef(null);
  const [tPosition, setTPosition] = useState(-1);
  const [isTransposed, setIsTransposed] = useState(false);

  useEffect(() => (eRef.current.value = props.eRSA), [props.eRSA]);

  const resetTranspose = () => {
    setIsTransposed(false);
    setTPosition(-1);
    props.setTransposeX(-1);
    props.setTransposeY(-1);
    props.setStep(0);
    props.setPosition(-1);
  };
  return (
    <fieldset
      className="searchControlBar"
      style={{ marginBottom: props.algoID === 4 ? "1.2em" : "0em" }}
    >
      <legend>Controls</legend>
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="searchAlgorithm">Algorithm:</label>
          <br />
          <select
            className="searchAlgoSelect"
            name="searchAlgorithm"
            disabled={props.isAnimated}
            style={{ opacity: props.isAnimated ? "0.5" : "1" }}
            ref={algoSelectRef}
            onChange={() => {
              props.setAlgoID(Number.parseInt(algoSelectRef.current.value));
              props.setContent(
                content[Number.parseInt(algoSelectRef.current.value) - 1]
              );
              props.reset();
              transposeHeightRef.current.value = 1;
              shiftRef.current.value = 3;
              if (Number.parseInt(algoSelectRef.current.value) === 4) {
                props.setMessage((m) => m.substring(0, 3));
                messageRef.current.value = messageRef.current.value.substring(
                  0,
                  3
                );
              }
            }}
          >
            <option value={1}>Shift Encryption</option>
            <option value={2}>Transposition Encryption</option>
            <option value={3}>Better Shift Encryption</option>
            <option value={4}>RSA</option>
          </select>
        </div>
      </div>
      {
        //Used for RSA
      }
      <div
        className="controlBarValueContainer"
        style={{
          display: props.algoID === 4 ? "flex" : "none",
        }}
      >
        <div className="controlBarValueItem">
          <label
            style={{
              backgroundColor: props.isNLongEnough ? "transparent" : "red",
            }}
          >
            Prime p:
          </label>
          <br />
          <select
            ref={pPrimeRef}
            defaultValue={props.primeP}
            onChange={() => {
              props.setPrimeP(Number.parseInt(pPrimeRef.current.value));
              props.setIsNLongEnough(
                Number.parseInt(pPrimeRef.current.value) * props.primeQ >
                  props.cipher
              );
            }}
          >
            {props.primes.map((v) => (
              <option
                key={`p-${v}`}
                value={v}
                style={v === props.primeQ ? { display: "none" } : {}}
              >
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="controlBarValueItem">
          <label
            style={{
              backgroundColor: props.isNLongEnough ? "transparent" : "red",
            }}
          >
            Prime q:
          </label>
          <br />
          <select
            ref={qPrimeRef}
            defaultValue={props.primeQ}
            onChange={() => {
              props.setPrimeQ(Number.parseInt(qPrimeRef.current.value));
              props.setIsNLongEnough(
                Number.parseInt(qPrimeRef.current.value) * props.primeP >
                  props.cipher
              );
            }}
          >
            {props.primes.map((v) => (
              <option
                key={`p-${v}`}
                value={v}
                style={v === props.primeP ? { display: "none" } : {}}
              >
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="controlBarValueContainer"
        style={{ display: props.algoID === 4 ? "flex" : "none" }}
      >
        <div className="controlBarValueItem">
          <label
            style={
              props.eRSAArray.length === 0 || !props.eRSA
                ? { backgroundColor: "red" }
                : {}
            }
          >
            Co-Prime e :{" "}
          </label>
          <br />
          <select
            ref={eRef}
            defaultValue={props.eRSA}
            onChange={() => {
              props.setERSA(Number.parseInt(eRef.current.value));
            }}
          >
            {props.eRSAArray.map((v) => (
              <option key={`e-RSA-${v}`} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              const flag = props.decryption;
              props.setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setTransposeBox(
                props.makeTransposeBox(props.message, props.transposeBox.length)
              );
              resetTranspose();

              props.setEncodedCipher(null);
              props.setResult("");
            }}
          >
            {props.decryption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      {
        //Used for transposition encryption
      }
      <div
        className="controlBarValueContainer"
        style={{ display: props.algoID === 2 ? "flex" : "none" }}
      >
        <div className="controlBarValueItem">
          <label htmlFor="transposeHeight">
            Transpose Box {props.decryption ? "Width" : "Height"}:
          </label>
          <br />
          <input
            type="number"
            defaultValue={props.transposeHeight}
            min={1}
            max={props.message.length || 1}
            ref={transposeHeightRef}
            onChange={() => {
              props.setTransposeHeight(
                Number.parseInt(transposeHeightRef.current.value)
              );
              resetTranspose();
              props.setTransposeBox(() =>
                props.makeTransposeBox(
                  props.message,
                  props.decryption
                    ? Math.ceil(
                        props.message.length /
                          Number.parseInt(transposeHeightRef.current.value)
                      )
                    : Number.parseInt(transposeHeightRef.current.value)
                )
              );
              props.setResult("");
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setTransposeBox(
                props.makeTransposeBox(props.message, props.transposeBox.length)
              );
              resetTranspose();
              props.setResult("");
            }}
          >
            {props.decryption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      {
        //Used for Shift encryption
      }
      <div
        className="controlBarValueContainer"
        style={{
          display: props.algoID === 1 || props.algoID === 3 ? "flex" : "none",
        }}
      >
        <div className="controlBarValueItem">
          <label htmlFor="shiftAmmount">Shift By:</label>
          <br />
          <input
            name="shiftAmmount"
            disabled={props.isAnimated}
            defaultValue={props.shift}
            type="number"
            min="1"
            max="25"
            ref={shiftRef}
            onChange={() => {
              if (Number.parseInt(shiftRef.current.value) > 25)
                shiftRef.current.value = 25;
              if (Number.parseInt(shiftRef.current.value) < 1)
                shiftRef.current.value = 1;
              props.setShift(Number.parseInt(shiftRef.current.value));
              props.setPosition(-1);
              props.setStep(0);
              props.setResult("");
            }}
          />
        </div>
        <div className="controlBarValueItem">
          <label htmlFor="en/decrypt">Action:</label>
          <br />
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.setDecryption((d) => !d);
              props.setPosition(-1);
              props.setStep(0);
              props.setResult("");
            }}
          >
            {props.decryption ? "Decrypt" : "Encrypt"}
          </button>
        </div>
      </div>
      {
        //Used for Message input
      }
      <div className="controlBarValueContainer">
        <div className="controlBarValueItem">
          <label htmlFor="message">Message:</label>
          <br />
          <div>
            <input
              type="text"
              name="message"
              defaultValue={props.message}
              style={{ width: "20ch" }}
              ref={messageRef}
              onChange={() => {
                if (Number.parseInt(algoSelectRef.current.value) === 4)
                  messageRef.current.value = messageRef.current.value.substring(
                    0,
                    3
                  );
                props.setIsNLongEnough(
                  props.modulusN > props.messageToNum(messageRef.current.value)
                );
                props.setMessage(messageRef.current.value);
                props.setPosition(-1);
                transposeHeightRef.current.value = "1";
                props.setTransposeHeight(1);
                resetTranspose();
                props.setTransposeBox(() =>
                  props.makeTransposeBox(
                    messageRef.current.value,
                    props.decryption ? messageRef.current.value.length : 1
                  )
                );
              }}
            />
            <button
              type="button"
              style={{ width: "fit-content", marginLeft: "1ch" }}
              onClick={() => navigator.clipboard.writeText(props.message)}
            >
              COPY
            </button>
          </div>
        </div>
        {props.algoID === 4 ? (
          <div className="controlBarValueItem">
            <br />
            <button
              type="button"
              disabled={
                props.eRSAArray.length === 0 ||
                !props.eRSA ||
                !props.isNLongEnough
              }
              onClick={() =>
                props.setEncodedCipher(
                  "" +
                    FinishRSA(
                      props.cipher,
                      props.decryption,
                      props.modulusN,
                      props.eRSA,
                      props.dRSA
                    )
                )
              }
            >
              {`Start ${props.decryption ? "De" : "En"}cryption`}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {
        //The buttons to interact with the app
      }
      <div
        className="controlBarValueContainer"
        style={props.algoID === 4 ? { display: "none" } : {}}
      >
        <div className="controlBarValueItem">
          {
            //Proceeds the animation one stage
          }
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              console.log("NEXT CLICKED . . .", props.algoID);

              //Shift encryption
              if (props.algoID === 1)
                Shift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setResult,
                  props.decryption
                );
              if (props.algoID === 2) {
                if (props.position === -1 && !isTransposed) {
                  props.setTransposeBox(() =>
                    props.makeTransposeBox(
                      props.message,
                      props.decryption
                        ? Math.ceil(
                            props.message.length /
                              Number.parseInt(transposeHeightRef.current.value)
                          )
                        : Number.parseInt(transposeHeightRef.current.value)
                    )
                  );
                  resetTranspose();
                }
                Transpose(
                  props.message,
                  props.position,
                  tPosition,
                  props.step,
                  props.setResult,
                  isTransposed,
                  props.transposeBox,
                  props.transposeX,
                  props.transposeY,
                  props.setPosition,
                  props.setStep,
                  setTPosition,
                  props.setTransposeBox,
                  props.setTransposeX,
                  props.setTransposeY,
                  setIsTransposed
                );
              }
              if (props.algoID === 3) {
                BetterShift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setShift,
                  props.setResult,
                  props.decryption,
                  () => props.setShift(Number.parseInt(shiftRef.current.value))
                );
              }
            }}
          >
            {props.position !== -1 || isTransposed ? "Next >>" : "Start"}
          </button>
        </div>
        <div className="controlBarValueItem">
          {
            //Plays the animation
          }
          <button
            type="button"
            onClick={() => {
              if (props.isAnimated) {
                clearInterval(props.animation);
                props.setAnimation(null);
              } else if (props.algoID === 1)
                AnimatedShift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setResult,
                  props.decryption,
                  props.setAnimation,
                  props.animationSpeed
                );
              else if (props.algoID === 2)
                animatedTranspose(
                  props.message,
                  props.position,
                  tPosition,
                  props.step,
                  props.setResult,
                  isTransposed,
                  props.transposeBox,
                  props.transposeX,
                  props.transposeY,
                  props.setPosition,
                  props.setStep,
                  setTPosition,
                  props.setTransposeBox,
                  props.setTransposeX,
                  props.setTransposeY,
                  setIsTransposed,
                  props.setAnimation,
                  props.animationSpeed
                );
              else if (props.algoID === 3)
                AnimatedBetterShift(
                  props.message,
                  props.shift,
                  props.position,
                  props.step,
                  props.setPosition,
                  props.setMessageCharacter,
                  props.setStep,
                  props.setProcessedCharacter,
                  props.setShift,
                  () => props.setShift(Number.parseInt(shiftRef.current.value)),
                  props.setResult,
                  props.decryption,
                  props.setAnimation,
                  props.animationSpeed
                );
            }}
          >{`${props.isAnimated ? "Stop " : ""}Animate`}</button>
        </div>
        <div className="controlBarValueItem">
          {
            //Proceds to completed state
          }
          <button
            type="button"
            disabled={props.isAnimated}
            onClick={() => {
              props.reset();
              resetTranspose();
              props.setStep(0);
              if (props.algoID === 1)
                FinishShift(
                  props.message,
                  props.shift,
                  props.setResult,
                  props.decryption
                );
              if (props.algoID === 2)
                finishTranspose(
                  props.message,
                  props.transposeBox,
                  props.setTransposeBox,
                  props.setResult
                );
              if (props.algoID === 3)
                FinishBetterShift(
                  props.message,
                  Number.parseInt(shiftRef.current.value),
                  props.setResult,
                  props.decryption,
                  () => props.setShift(Number.parseInt(shiftRef.current.value))
                );
            }}
          >
            Finish
          </button>
        </div>
      </div>
    </fieldset>
  );
}
