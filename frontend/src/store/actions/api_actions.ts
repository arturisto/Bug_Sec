
import { APIs } from '../../types/APIs'

export const fetchData = (payload: any) => (
  {
    type: APIs.FETCH_DATA,
    payload: payload
  });

export const createUser = (payload: any) => (
  {
    type: APIs.CREATE_USER,
    payload: payload
  });

export const modifyUser = (payload: any) => (
  {
    type: APIs.MODIFY_USER,
    payload: payload
  });

export const deleteUser = (payload: any) => (
  {
    type: APIs.DELETE_USER,
    payload: payload
  }); 

  export const setTotalDocumentsForSelection = (payload: any) => (
    {
      type: APIs.SET_TOTAL_DOCS_FOR_SEL,
      payload: payload
    }); 
  
  export const setApiError = (payload: any) => (
    {
      type: APIs.SET_API_ERROR,
      payload: payload
    });
    
  