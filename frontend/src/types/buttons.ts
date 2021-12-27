import { Url } from "url";

export interface CloseBtn {
    action: any
}

export interface BasicBtn {
    action: any,
    text: string
}

export interface SmallIconBtn {
    action: any,
    text: any,
    icon: string,
    data: number | string
}
  {/*TODO - update to function type */}