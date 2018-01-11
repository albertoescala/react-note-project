import React from "react";
import "./Form.css";

const form = (props) => {
    return <form className="form" onSubmit={props.onSubmit} >
        {props.children}
      </form>;
}

export default form;