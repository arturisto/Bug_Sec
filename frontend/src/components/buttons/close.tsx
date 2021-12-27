import React from 'react';
//types
import { CloseBtn as BtnType } from "../../types/buttons";

import "./buttons.css";

const CloseBtn:React.FC<BtnType> = (props) => {
    return (
     <div className="close-btn" onClick={props.action}>X</div>
    )
}

export default CloseBtn;