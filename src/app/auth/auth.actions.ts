import { Action } from '@ngrx/store';
import { AuthDAta } from './auth-data.model';

export const SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED'
export const SET_UNAUTHENTICATED = '[Auth] SET_UNAUTHENTICATED'
export const SET_EMAIL = '[Auth] SET_EMAIL'

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
  constructor(
    public userID: string,
    public userEmail: AuthDAta['email'],
  ) { }
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetEmail implements Action {
  readonly type = SET_EMAIL;
  constructor(
    public userEmail: AuthDAta['email'],
  ) { }
}

export type AuthActions = SetAuthenticated
| SetUnauthenticated
| SetEmail