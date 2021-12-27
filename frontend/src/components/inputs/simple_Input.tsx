import React, {useState} from 'react';
//types
import { simpleInput } from "../../types/inputs";

import "./inputs.css";

const SimpleInput:React.FC<simpleInput> = (props) => {
    const [value, setValue] = useState(props.value? props.value : undefined); 
    return (
     <div className="input-container">
         <div>{props.label}</div>
         <input id={props.name} type={props.type} placeholder={props.placeholder} value={value} onChange={(e)=>setValue(e.target.value)}/>
     </div>
    )
}

export default SimpleInput;