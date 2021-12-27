export interface UserPopup {
    closeFunc: any,
    submitFunc: any, 
    text: string,
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    location?: string,
    permissions?: string
}

export interface ConfirmPopup {
    closeFunc: any,
    id: string
}