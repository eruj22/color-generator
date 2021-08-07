import React from "react";

function Button({ handleClick, text, styleButton }) {
  return (
    <button className={styleButton} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
