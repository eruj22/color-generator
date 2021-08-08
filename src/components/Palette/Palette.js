import React, { useState } from "react";
import MessageCopy from "../MessageCopy";
import useEventListener from "../../hooks/useEventListener";
import { SPACE_KEYS, C_KEYS } from "../../utils/constants";
import { rgbToHex, copyToClipboard } from "../../utils/helpers";
import PaletteCard from "./PaletteCard";

const Palette = ({ palette, handleClick }) => {
  const [showResults, setShowResults] = useState(false);
  const [clickedColor, setClickedColor] = useState("");

  const copyColorToClipboard = (e) => {
    let currentColor = e.target.parentElement.innerText;
    setClickedColor(currentColor);
    copyToClipboard(currentColor);
    timerForShowResults();
  };

  let arrayPalette = [];

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
      copyToClipboard(arrayPalette);
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
            <div key={item}>
              <PaletteCard
                action={copyColorToClipboard}
                displayedColor={displayedColor}
                hexColor={hexColor}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Palette;
