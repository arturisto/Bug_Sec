import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { state } from "../types/state"
import  apiMiddleware  from "../middleware";


export interface IRootState {state: state}
  
const store = createStore(reducer, applyMiddleware(apiMiddleware))

export default store;