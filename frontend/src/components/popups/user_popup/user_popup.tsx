import React from 'react';
//components
import SimpleInput from '../../inputs/simple_Input';
import BasicBtn from '../../buttons/basic_btn';
import CloseBtn from '../../buttons/close';
//types
import { UserPopup as UserPopupType } from '../../../types/popups'

import "../popups.css";
import "./user_popup.css";

const UserPopup:React.FC<UserPopupType> = (props) => {
    

    return (
     <section className="popup-container">
         <article className="popup-header">
             <div>{props.text}</div>
             <CloseBtn action={props.closeFunc}/> 
         </article>
         <article className="inputs">
            <SimpleInput
                label="First Name"
                placeholder="John"
                type="text"
                name="first-name"
                value={props.firstName}/>
             <SimpleInput
                label="Last Name"
                placeholder="Smith"
                type="text"
                name="last-name"
                value={props.lastName}/>
            <SimpleInput
                label="Email"
                placeholder="johnsmith@example.com"
                type="text"
                name="email"
                value={props.email}/>
            <SimpleInput
                label="Location"
                placeholder="New York, NY"
                type="text"
                name="location"
                value={props.location}/>
            <SimpleInput
                label="Permission"
                placeholder="Admin, viewer..."
                type="text"
                name="permission"
                value={props.permissions}/>
                {/*TODO - change to dropdown */}
            
            <BasicBtn action={props.submitFunc} text="Submit"/>
         </article>
     </section>
    )
}

export default UserPopup;