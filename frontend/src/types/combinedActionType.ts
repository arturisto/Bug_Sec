import { ActionType } from 'typesafe-actions';
import  * as actions from "../store/actions/actions"
import  * as apiActions from "../store/actions/api_actions"

//  export type ActionCombined = ActionType< typeof apiStart | typeof apiEnd | typeof apiError>;
export type ActionCombined = ActionType< typeof actions | typeof apiActions>