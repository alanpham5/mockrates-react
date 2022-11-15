import React from "react";
import PropTypes from "prop-types";
import "./button.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ transparent, backgroundColor, label, ...props }) => {
  const mode = transparent
    ? "storybook-button--secondary"
    : "storybook-button--primary";
  return (
    <button
      type={props.type ?? "button"}
      className={["storybook-button", `storybook-button--large`, mode].join(
        " "
      )}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  transparent: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  transparent: false,
  onClick: undefined,
};
