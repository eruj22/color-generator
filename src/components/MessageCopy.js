import React from "react";

const MessageCopy = ({ color }) => {
  return (
    <div className="sign-top">
      Color <span>{color ? color : "palette"}</span> copied to your clipboard
    </div>
  );
};

export default MessageCopy;
