import React from 'react';
import  { useDispatch, } from "react-redux"
//components
import BasicBtn from '../../buttons/basic_btn';
import CloseBtn from '../../buttons/close';
//actions
import { deleteUser } from "../../../store/actions/api_actions"
import { alertSuccess, alertFail } from '../../../store/actions/actions';
//types
import { ConfirmPopup as ConfirmPopupType } from '../../../types/popups'

import "../popups.css";
import "./confirm_popup.css";

const ConfirmPopup:React.FC<ConfirmPopupType> = (props) => {
    const id = props.id;
    const dispatch = useDispatch();
    const handleConfirm = () => {
        dispatch(deleteUser({"url":"/deleteUser","data":{id: id}, "onSuccess": alertSuccess, "onFailure": alertFail, "isLoader": true}));
        props.closeFunc(false);
    }


    return (
     <section className="popup-container confirm">
            <div>
                <CloseBtn action={props.closeFunc}/>
            </div>
            <div className="confirm-body">Are you sure you wan't to delete this item?</div>
            <div className="buttons-container">
                <BasicBtn text="Yes" action={handleConfirm}/>
                <BasicBtn text="No" action={props.closeFunc}/>
            </div>
     </section>

    )};

export default ConfirmPopup;