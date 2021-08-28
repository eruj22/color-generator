import React from "react";

function PaletteCard({ action, hexColor, displayedColor }) {
  return (
    <>
      <div
        className="palette__card"
        onClick={(e) => {
          action(e);
        }}
      >
        <div className="palette__card-color" style={displayedColor}></div>
        <span>{hexColor}</span>
      </div>
    </>
  );
}

export default PaletteCard;
