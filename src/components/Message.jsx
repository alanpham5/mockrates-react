import React from "react";
import "./Message.css";
import PropTypes from "prop-types";
export function Message({ text, backgroundColor, isReceived }) {
  const msgfilter = isReceived
    ? { filter: "saturate(35%) brightness(1.35)" }
    : {};
  const direction = isReceived
    ? { borderRadius: "15px 50px 30px 5px" }
    : { borderRadius: "50px 15px 5px 30px" };
  const indent = !isReceived && { marginLeft: "10%" };
  return (
    <div
      className="message"
      style={{
        backgroundColor: backgroundColor,
        ...msgfilter,
        ...direction,
        ...indent,
      }}
    >
      <p1 style={{ fontSize: 16 }}>{text}</p1>
    </div>
  );
}
Message.propTypes = {
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
  isReceived: PropTypes.bool,
};
Message.defaultProps = {
  isReceived: false,
};
