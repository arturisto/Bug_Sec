import React from 'react';
//types
import { BasicBtn as BtnType } from "../../types/buttons";

import "./buttons.css";

const BasicBtn:React.FC<BtnType> = (props) => {
    return (
     <button className="basic-btn" onClick={props.action}>{props.text}</button>
    )
}

export default BasicBtn;