import React, { useState } from "react";

const Palette = ({ palette }) => {
  const decToHex = (value) => {
    return value.toString(16).padStart(2, "0").toUpperCase();
  };
  const rgbToHex = (r, g, b) => {
    return "#" + decToHex(r) + decToHex(g) + decToHex(b);
  };

  // const copyToClipboard = async () => {
  //   await navigator.clipboard.writeText(selectedColor);
  // };

  const copyColorToClipboard = (e) => {
    let currentColor = e.target.parentElement.innerText;
    navigator.clipboard.writeText(currentColor);
  };

  return (
    <div className="palette">
      {palette.map((item) => {
        let rgbColor = item.join(", ");
        let hexColor = rgbToHex(item[0], item[1], item[2]);
        let displayedColor = { backgroundColor: `rgb(${rgbColor})` };

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
  );
};

export default Palette;
