import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';


export interface State {
  isAuthenticated: boolean,
  userID: any,
}

export const initialState: State = {
  isAuthenticated: false,
  userID: null,
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
     return {
       isAuthenticated: true,
       userID: action.userID
     }
    case SET_UNAUTHENTICATED:
     return {
       isAuthenticated: false,
       userID: null,
     }
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated
export const getUserID = (state: State) => state.userID