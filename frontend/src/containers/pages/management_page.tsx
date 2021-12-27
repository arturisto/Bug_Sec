import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
//actions
import * as Actions from "../../store/actions/actions"
import * as APIs from "../../store/actions/api_actions"
//components
import ManagementTable from '../management_table/management_table';
import BasicBtn from '../../components/buttons/basic_btn';
import UserPopup from '../../components/popups/user_popup/user_popup';
import DropDown from '../../components/dropdown/basic_dropdown';
import Pagination from '../../components/pagination/pagination';
//types
import { state as rootState } from '../../types/state';
import { userType } from '../../types/users';
//styles
import "./style.css";

const ITEMS_PER_PAGE = [10,20,30,50,100]
interface sortType  {
    direction:boolean|null, 
    columnToSort: string|null
}

const ManagementPage:React.FC  = (props) => {
    const dispatch = useDispatch();

    const [currentPage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE[0]);
    const [currentSearch, setCurrentSearch] = useState("");
    const [currentSort, setCurrentSort] = useState<sortType>({ direction:null, columnToSort:null});
    const [modifyId, setModifyId] = useState("");
    const { screenDimmer, loader, apiError } = useSelector( (state:rootState ) => state);


    useEffect(()=> {
        fetchData();
    }, [])

    useEffect(()=> {
        console.log(apiError);
        if(apiError !== "") alert(apiError);
    },[apiError]);

    const fetchData = (searchValue:string|number = currentSearch, page:number = currentPage, itemsPerPage: number = ITEMS_PER_PAGE[0], sort: sortType = currentSort) => {
        const data = {
            page: page,
            itemsPerPage: itemsPerPage,
            searchValue: searchValue,
            sort: sort
        };
        dispatch(APIs.fetchData({"url":"/getData","data":data, "onSuccess": Actions.setTableData, "onFailure": null, "isLoader": true}));
    }

    const handleSearchInput = () => {
        const newInput = (document.getElementById("search_input") as HTMLInputElement).value;
        setCurrentSearch(newInput);
        fetchData(newInput, currentPage, itemsPerPage);
    }

    const handleChangeItemsPerPage = (itemsPerPage: number) => {
        fetchData(currentSearch, currentPage, itemsPerPage);
        setItemsPerPage(itemsPerPage);
    }

    const handleChangePage = (newPage:number) => {
        setPage(newPage);
        fetchData(currentSearch, newPage, itemsPerPage);
    }

    const handleSort = (sortColumn: string) => {
        console.log(sortColumn);
        let sortDirection = null;
        if(currentSort.columnToSort === sortColumn) {
            sortDirection = !currentSort.direction;
        } else {
            sortDirection = true;
        };
        setCurrentSort({direction: sortDirection, columnToSort: sortColumn});
        fetchData(currentSearch, currentPage, itemsPerPage, {direction:sortDirection, columnToSort: sortColumn});
    }

    const handleOpenNewUser = () => {
        dispatch(Actions.toggleDimmer());
        setOpenPopup({...openPopup, text: "Add New user"});
    }

    const handleClosePopup = () => {
        setOpenPopup({
            closeFunc: handleClosePopup,
            submitFunc: onSubmitPopup, 
            text: "",
            firstName: "",
            lastName: "",
            email: "",
            location: "",
            permissions: "",
        });
        dispatch(Actions.toggleDimmer());
    }

    const onSubmitPopup = () => {
        const data = {
            firstName: (document.getElementById("first-name") as HTMLInputElement).value,
            lastName: (document.getElementById("last-name") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            location: (document.getElementById("location") as HTMLInputElement).value,
            permissions: (document.getElementById("permission") as HTMLInputElement).value,
            id: modifyId
        }
        console.log(data);
        
        handleClosePopup();
        if(modifyId.length === 0){
             dispatch(APIs.createUser({"url":"/createNew","data":data, "onSuccess": Actions.alertSuccess, "onFailure": Actions.alertFail, "isLoader": true}));
        } else { 
            dispatch(APIs.modifyUser({"url":"/updateUser","data":data, "onSuccess": Actions.alertSuccess, "onFailure": Actions.alertFail, "isLoader": true}));
        };
        setModifyId("");
    }


    const handleModify = (data: userType) => {
        console.log(data);
        setModifyId(data._id);
        setOpenPopup({
            closeFunc: handleClosePopup,
            submitFunc: onSubmitPopup, 
            text: "Modify User",
            firstName: data.name.first,
            lastName: data.name.last,
            email: data.email,
            location: data.location.city,
            permissions: data.permissions
        });
    }

    const [openPopup, setOpenPopup] = useState({
        closeFunc: handleClosePopup,
        submitFunc: onSubmitPopup, 
        text: "",
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        permissions: "",
    });

    return (
        <section className="app">
            <section className="top-bar">
                <div className="logo">My App</div>
                <div className="page-name">User Management</div>
            </section>
            <section className="body">
                <article className="headline-text"> User Management</article>
                <article className="headline-interactions">
                    <input id="search_input" placeholder="search items..." onChange={handleSearchInput}></input>
                    <BasicBtn text="+ New User" action={handleOpenNewUser}/>
                </article>
                <article className="table-container">

                    <ManagementTable page={currentPage} itemsPerPage={itemsPerPage} popupFunc={handleModify} handleSort={handleSort}/>

                    <div className="table-footer">
                        <div className="pagination"> 
                            <Pagination itemsPerPage={itemsPerPage} handleChangePage={handleChangePage}/>
                        </div>
                        
                        <div className="show-selection">
                            <span>Show: </span>
                            <DropDown
                                ddItems={ITEMS_PER_PAGE}
                                choiceFunc={handleChangeItemsPerPage}
                                denominator={"rows"}/>
                        </div>
                    </div>
                </article>

                {screenDimmer ? <div className="screen-dimmer"/> : null}
                
            </section>
            {openPopup.text !== "" ? <UserPopup {...openPopup}/> : null}

            {loader? <div className="loader"></div>: null}
            
        </section>


    )
}

export default ManagementPage