import React from "react";
import "./Input.css";

const input = (props) => {
    return <textarea className="input" type="text" placeholder="Ingresa tu comentario" value={props.value} onKeyDown={props.onKeyDown} onChange={props.onChange} />;
}

export default input;