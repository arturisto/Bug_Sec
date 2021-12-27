// inspired by https://leanpub.com/redux-book
import axios from "axios";
import  {setTotalDocumentsForSelection, setApiError }   from "./store/actions/api_actions";
import {APIs} from "./types/APIs";
import { Middleware  } from 'redux';

const apiMiddleware: Middleware = ({ dispatch }) => next => async action => {
    next(action);
    
    let amountOfData = 0;
    let setAmountData = false;
    if (!Object.values(APIs).includes(action.type)) return;
    const {url, data, onSuccess, onFailure } = action.payload;
    // axios default configs
    axios.defaults.baseURL = "http://localhost:5000";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:5000";
    if(url === "/getData"  &&  data.page === 1) {
        //fetch AMOUNT of pages for pagination only when it is first page
        const result = await axios.request({url: "/count", method: 'POST', data: data});
        amountOfData = result.data;
        setAmountData = true;
    }
    axios.request({url: url, method: 'POST', data: data})
        .then((result) => {
            if(result.status === 200)
            {
                if(setAmountData) {
                    console.log(amountOfData);
                    dispatch(setTotalDocumentsForSelection(amountOfData));
                }
                dispatch(onSuccess(data));
            } else {
                dispatch(setApiError(result.data));
            }
            
         
        })
        .catch(error => {
            console.log(error);
            dispatch(setApiError(error));
        })
};

export default apiMiddleware;