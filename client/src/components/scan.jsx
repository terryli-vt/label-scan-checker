import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Counters from "./counters";
import "../styles/scan.css";
import beep from "../sounds/beep.mp3";
import { useTranslation } from "react-i18next";

function Scan() {
  const { t } = useTranslation();

  // "props" from the previous page
  const location = useLocation();
  const product = location.state || {};
  const targetStr = product.partNumber;

  const listRef = useRef(null);
  const inputRef = useRef(null);

  // To prevent accidental refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Confirm to Refresh?"; // This is required for showing the confirmation dialog
    };

    // Add the beforeunload event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // The return function inside useEffect serves as a cleanup mechanism for the side effects.
    // Clean up the event listener when the component unmounts to avoid memory leaks.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array means this effect runs only once during component mount

  // Declare a state variable called "count" with an initial value of 0
  const [counters, setCounters] = useState([
    { id: 1, value: 0, label: "match", hideButtons: true },
    { id: 2, value: 0, label: "unmatch", hideButtons: true },
    { id: 3, value: 0, label: "unscannable", hideButtons: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [listItems, setListItems] = useState([]);
  const [clear, setClear] = useState(false);
  const [lock, setLock] = useState(false); // lock scan if a mismatch has found

  const handleInputChange = (event) => {
    if (lock) return;
    setInputValue(event.target.value);
  };

  // play a beep sound when mismatch
  const playSound = () => {
    const audio = new Audio(beep);
    audio.play();
  };

  const handleInputKeyPress = (event) => {
    if (lock) return;

    if (clear) {
      setInputValue("");
      setClear(false);
    }

    if (event.key === "Enter") {
      const newItem = inputValue.trim();
      if (newItem !== "") {
        setListItems((prevItems) => [...prevItems, newItem]);

        if (newItem === targetStr) {
          setInputStatus("is-valid");
          // match + 1
          handleIncrement(counters.filter((c) => c.id === 1)[0]);
        } else {
          setInputStatus("is-invalid");
          playSound();
          setLock(true);
        }

        setClear(true);
      }
    }
  };

  // Making sure the input field is always focused
  const handleBlur = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    // Scroll to the bottom when a new list item is added
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [listItems]);

  const handleDeleteItem = (index, updateCounter) => {
    if (updateCounter) {
      // handle counter
      if (listItems[index] === targetStr) {
        // match - 1
        handleDecrement(counters.filter((c) => c.id === 1)[0]);
      } else {
        // unmatch - 1
        handleDecrement(counters.filter((c) => c.id === 2)[0]);
      }
    }

    // clear input
    setInputValue("");
    setInputStatus("");

    // delete from list
    setListItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleIncrement = (counter) => {
    const countersCopy = [...counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value++;
    setCounters(countersCopy);
  };

  const handleDecrement = (counter) => {
    const countersCopy = [...counters];
    const index = countersCopy.indexOf(counter);
    countersCopy[index] = { ...counter };
    countersCopy[index].value--;
    setCounters(countersCopy);
  };

  const handleUnmatch = () => {
    // unmatch + 1
    handleIncrement(counters.filter((c) => c.id === 2)[0]);
    setLock(false);
  };

  const handleRescan = () => {
    // Don't want to update counter, so pass false as the 2nd argument
    handleDeleteItem(listItems.length - 1, false);
    setLock(false);
  };

  const inputClassName = "form-control form-control-lg " + inputStatus;

  const displayBlock = {
    display: "block",
    fontSize: "2em",
  };

  const displayNone = {
    display: "none",
    fontSize: "2em",
  };

  if (Object.keys(product).length === 0)
    return <div>From the product page, please choose a product to scan.</div>;

  return (
    <div className="d-flex flex-row">
      <div className="half-screen p-2">
        <div className="form-group my-4">
          <input
            type="text"
            className={inputClassName}
            style={{ fontSize: "2.5em" }}
            ref={inputRef}
            id="largeInput"
            placeholder={t("result")}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
        <h1>
          {t("target")}: {targetStr}
        </h1>
        <ol
          className="list-group my-3"
          ref={listRef}
          style={{
            maxHeight: "65vh", // Set the max height to 80% of the viewport height
            overflowY: "auto", // Enable vertical scrolling when overflow occurs
          }}
        >
          {listItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={
                item === targetStr
                  ? { backgroundColor: "lightgreen" }
                  : { backgroundColor: "lightsalmon" }
              }
            >
              <strong>{index + 1}.</strong> {item}
              <button
                className="btn btn-danger btn-lg"
                style={{ visibility: "hidden" }}
                onClick={() => handleDeleteItem(index, true)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="half-screen p-2">
        <Counters
          counters={counters}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
        {lock ? (
          <h1 className="highlight text-center m-5">{t("msg_rescan")}</h1>
        ) : (
          <h1 className="highlight text-center m-5">{t("msg_continue")}</h1>
        )}
        <div className="button-group">
          <button
            className="btn btn-lg btn-warning m-3"
            onClick={() =>
              handleIncrement(counters.filter((c) => c.id === 3)[0])
            }
            style={lock ? displayNone : displayBlock}
          >
            {t("unscannable")}
          </button>
          <Link
            className="btn btn-lg btn-primary m-3"
            style={lock ? displayNone : displayBlock}
            to="/scan-report"
            state={{ ...product, ...counters }}
          >
            {t("finish_scan")}
          </Link>
          <button
            className="btn btn-lg btn-danger m-3"
            style={lock ? displayBlock : displayNone}
            onClick={() => handleUnmatch()}
          >
            {t("report_unmatch")}
          </button>
          <button
            className="btn btn-lg btn-success m-3"
            style={lock ? displayBlock : displayNone}
            onClick={() => handleRescan()}
          >
            {t("rescan")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scan;
