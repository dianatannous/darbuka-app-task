import React from "react";

export const Button = ({ onClick, bgColor, txtColor, text, iconName }) => {
  return (
    <button
      type="button"
      className="btn btn-sm"
      style={{ backgroundColor: bgColor, color: txtColor }}
    >
      <span className={iconName} onClick={onClick}>
        {text}
      </span>
    </button>
  );
};
