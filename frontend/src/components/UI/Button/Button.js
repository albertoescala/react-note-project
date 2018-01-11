import React from "react";
import "./Button.css";

const button = ({ onClick, children, ...props }) => {
  return <button className="button" onClick={onClick} {...props}>
      {children}
    </button>;
};

export default button;