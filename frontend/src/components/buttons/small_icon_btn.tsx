import React from 'react';
//types
import { SmallIconBtn as BtnType } from "../../types/buttons";

import "./buttons.css";

const SmallIconBtn:React.FC<BtnType> = (props) => {
    const handleClick = () => {
        props.action(props.data);
    }
    return (
     <button className="basic-btn small-btn" onClick={handleClick}> <img src={props.icon} alt=""/>{props.text}</button>
    )
}

export default SmallIconBtn;