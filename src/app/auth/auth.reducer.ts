import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';


export interface State {
  userID: any,
}

export const initialState: State = {
  userID: null,
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
     return {
       userID: action.userID
     }
    case SET_UNAUTHENTICATED:
     return {
       userID: null,
     }
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => {
  return Boolean(state.userID)
}
export const getUserID = (state: State) => state.userID