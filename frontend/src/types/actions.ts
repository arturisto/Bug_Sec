export enum Actions {
    ADD_ITEM = 'ADD_ITEM',
    SET_LOADING = 'SET_LOADING',
    SET_TEXT = 'SET_TEXT',
    SET_TABLE_DATA = 'SET_TABLE_DATA',
    ALERT_SUCCESS = 'ALERT_SUCCESS',
    ALERT_FAIL = 'ALERT_FAIL',
    TOGGLE_DIMMER = 'TOGGLE_DIMMER',
}

export interface SET_LOADING {
    type: Actions,
    isLoading : boolean
}

export interface SET_TABLE_DATA {
    type: Actions,
    data: []
}

