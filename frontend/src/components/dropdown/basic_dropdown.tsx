import React, {useState} from 'react';
//types
import { DropDown as DropDownState } from '../../types/dropdowns';
//styles
import "./basic_dropdown.css";

const DropDown:React.FC<DropDownState>  = (props) => {
    const [currentDDItem, setCurrentDDItem] = useState(props.ddItems[0]);
    const [showDD, setShowDD] = useState(false);

    const handleDDChoice = (currentChoice:number) => {
        setCurrentDDItem(currentChoice);
        setShowDD(false);
        props.choiceFunc(currentChoice);
    }
    return (
        <section className="dd-container">
            <div className="dd-label" onClick={()=> setShowDD(!showDD)}>{currentDDItem} {props.denominator}</div>
            { showDD ?
                <div className="dd-items">
                    {props.ddItems && props.ddItems.map((item:number) => {
                        return (
                            <div className="dd-item" key={item} onClick={()=>handleDDChoice(item)}>{item} {props.denominator}</div>
                        )
                    })}
                </div> : null
            }

        </section>
    )
}

export default DropDown