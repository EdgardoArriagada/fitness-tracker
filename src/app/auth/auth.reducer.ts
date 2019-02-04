import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_EMAIL } from './auth.actions';
import { AuthData } from './auth-data.model';


export interface State {
  userID: any,
  userEmail: AuthData['email'],
}

export const initialState: State = {
  userID: null,
  userEmail: null,
}

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
     return {
       userID: action.userID,
       userEmail: action.userEmail
     }
    case SET_UNAUTHENTICATED:
     return {
       ...state,
       userID: null,
     }
    case SET_EMAIL:
     return {
       ...state,
       userEmail: action.userEmail,
     }
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => {
  return Boolean(state.userID)
}
export const getUserID = (state: State) => state.userID
export const getUserEmail = (state: State) => state.userEmail