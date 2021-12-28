import React, {useEffect, useState} from 'react';
import  { useDispatch, useSelector } from "react-redux"
//actions
import * as APIs from "../../store/actions/api_actions"
import * as Actions from "../../store/actions/actions"
//types
import { state as rootState } from '../../types/state';
import { userType } from '../../types/users';
//components
import BasicBtn from '../../components/buttons/basic_btn';
import SmallIconBtn from '../../components/buttons/small_icon_btn';
import ConfirmPopup  from '../../components/popups/confirmation/confirm_popup'
//styles
import "./style.css"


//type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;
interface IProps  {
    page:number,
    itemsPerPage:number
    popupFunc: any
    handleSort: any
}


const modifyIcon = "https://img.icons8.com/material-outlined/24/000000/pencil--v2.png";
const trashIcon = "https://img.icons8.com/windows/32/000000/delete.png";
const ManagementTable:React.FC<IProps> = (props) => {
    const dispatch = useDispatch();
    const { tableData,loader } = useSelector( (state:rootState ) => state);
    const [confirmPopup, setConfirmPopup] = useState("");

    const handleModify = (index: number) => {
        dispatch(Actions.toggleDimmer());
        props.popupFunc(tableData[index]);
    }
    const handleDelete = (id: string) => {
        dispatch(Actions.toggleDimmer());
        setConfirmPopup(id);
    }

    const handleCloseConfirm = (closeDimmer: boolean = true) => {
        if(closeDimmer) dispatch(Actions.toggleDimmer());
        setConfirmPopup("");
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th onClick={()=>{props.handleSort("email")}}>Email Address</th>
                        <th onClick={()=>{props.handleSort("location")}}>Location</th>
                        <th onClick={()=>{props.handleSort("joined")}}>Joined</th>
                        <th>Permissions</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={tableData && tableData.length === 0 ? "relativeBody" : ""}>
                    { loader ? "" :
                        tableData && tableData.length > 0 ? tableData.map ((user: userType, index)=> {
                            let location = user.location?.city
                            if(user.location?.country){
                                location += ", " + (user.location.country === "United States" ? user.location.state: user.location.country)
                            };
                            let permissionType = (user.permissions?.toLowerCase() === "admin" ? "admin":
                                                    (user.permissions?.toLowerCase() === "contributer" ? "contributer": 
                                                        (user.permissions?.toLowerCase() === "user" ? "user": "not assigned")))
                            return (
                                <tr key={user._id}>
                                    <td>
                                        {user.picture?.thumbnail ? <img src={user.picture?.thumbnail} alt=""/> : ""}
                                        {user.name?.first + " " + user.name?.last}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{location}</td>
                                    <td>{user.registered?.date}</td> {/*TODO - convert to string date */}
                                    <td><div className={"permission " + permissionType}>{user.permissions ? user.permissions : "not assigned"}</div></td>
                                    <td><SmallIconBtn text="Modify" action={handleModify} data={index} icon={modifyIcon}/></td>
                                    <td><SmallIconBtn text="Delete" action={handleDelete} data={user._id} icon={trashIcon}/></td>
                                </tr>
                            )
                        }):
                        <tr className="empty-table">There is no data</tr>
                    }

                </tbody>
            </table>
            {confirmPopup.length > 0 ? <ConfirmPopup id={confirmPopup} closeFunc={handleCloseConfirm}/> : null}
        </>
        
    )
}

export default ManagementTable