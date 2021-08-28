import React, { useState } from "react";
import MessageCopy from "./MessageCopy";
import useEventListener from "./useEventListener";

const Palette = ({ palette, handleClick }) => {
  const [showResults, setShowResults] = useState(false);
  const [clickedColor, setClickedColor] = useState("");

  const decToHex = (value) => {
    return value.toString(16).padStart(2, "0").toUpperCase();
  };
  const rgbToHex = (r, g, b) => {
    return "#" + decToHex(r) + decToHex(g) + decToHex(b);
  };

  const copyColorToClipboard = (e) => {
    let currentColor = e.target.parentElement.innerText;
    setClickedColor(currentColor);
    navigator.clipboard.writeText(currentColor);
    timerForShowResults();
  };

  let arrayPalette = [];
  const SPACE_KEYS = ["32", " "];
  const C_KEYS = ["67", "c"];

  const getArrayFromPalette = (newArr) => {
    return newArr;
  };

  const timerForShowResults = () => {
    setShowResults(true);
    const timer = setTimeout(() => {
      setShowResults(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handler = ({ key }) => {
    if (SPACE_KEYS.includes(String(key))) {
      handleClick();
    }
    if (C_KEYS.includes(String(key))) {
      navigator.clipboard.writeText(arrayPalette);
      setClickedColor("");
      timerForShowResults();
    }
  };

  useEventListener("keydown", handler);

  return (
    <>
      {showResults ? (
        <MessageCopy color={clickedColor} arrayPalette={arrayPalette} />
      ) : null}
      <div className="palette">
        {palette.map((item) => {
          let hexColor = rgbToHex(item[0], item[1], item[2]);
          let displayedColor = { backgroundColor: `${hexColor}` };
          arrayPalette.push(hexColor);
          getArrayFromPalette(arrayPalette);

          return (
            <div
              className="palette__card"
              key={item}
              onClick={(e) => {
                copyColorToClipboard(e);
              }}
            >
              <div className="palette__card-color" style={displayedColor}></div>
              <span>{hexColor}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Palette;
