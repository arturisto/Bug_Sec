
import { Actions } from '../../types/actions';


export const setLoading = (isLoading: boolean) => ({
    type: Actions.SET_LOADING,
    loading : isLoading
});

export const toggleDimmer = () => ({
    type: Actions.TOGGLE_DIMMER,
});

export const setTableData = (payload: [])=> ( {
    type: Actions.SET_TABLE_DATA,
    data: payload
})

export const alertSuccess = () => ({
    type: Actions.ALERT_SUCCESS
})

export const alertFail = () => ({
    type: Actions.ALERT_FAIL
})






