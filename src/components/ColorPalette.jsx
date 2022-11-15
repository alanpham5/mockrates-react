import React from "react";
import "./ColorPalette.css";
import PropTypes from "prop-types";

export function ColorPalette({ primary, secondary, tertiary }) {
  return (
    <>
      <span className="color" style={{ backgroundColor: primary }}></span>
      <span className="color" style={{ backgroundColor: secondary }}></span>
      <span className="color" style={{ backgroundColor: tertiary }}></span>
    </>
  );
}
ColorPalette.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
};
