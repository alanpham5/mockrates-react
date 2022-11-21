import React from "react";
import "./ToggleSwitch.css";

export function ToggleSwitch({ backgroundColor }) {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        style={{ backgroundColor: backgroundColor }}
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
}
