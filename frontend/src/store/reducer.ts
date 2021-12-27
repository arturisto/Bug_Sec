
import * as ActionTypes from '../types/actions';
import {APIs} from '../types/APIs'
import { state } from "../types/state";
// import { Action } from 'typesafe-actions';
const init: state = {
  loader: false,
  list: [],
  screenDimmer: true,
  text: "hello",
  tableData: [],
  totalDocumentsForSelection: 1,
  apiError: "",
};

//TODO - figure out combinded type for actions
export function reducer(state: state = init, action: any): state {
  switch (action.type) {
    case ActionTypes.Actions.SET_LOADING:
      return {...state, screenDimmer: action.loading};

    case ActionTypes.Actions.TOGGLE_DIMMER:
      return {...state, screenDimmer: !state.screenDimmer};

    case ActionTypes.Actions.SET_TABLE_DATA:
      return {...state, tableData: action.data, screenDimmer: false, loader: false};

    case ActionTypes.Actions.ALERT_FAIL:
      alert("Action Failed, please try again later");
      {/*TODO - create popup for fail messages */}
      return {...state, loader: false, screenDimmer: false};

    case ActionTypes.Actions.ALERT_SUCCESS:
      alert("Action OK");
      return {...state, loader: false, screenDimmer: false};

    /*API ACTIONS */
    case APIs.FETCH_DATA:
    case APIs.CREATE_USER:
    case APIs.MODIFY_USER:
    case APIs.DELETE_USER:
      return {...state, loader: true, screenDimmer: true};
    case APIs.SET_TOTAL_DOCS_FOR_SEL:
      return {...state, totalDocumentsForSelection: action.payload};
    case APIs.SET_API_ERROR:
        return {...state, apiError: action.payload};
    default:
      return state;
  }
}