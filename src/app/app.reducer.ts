import * as fromUI from 'src/app/shared/ui.reducer'
import * as fromAuth from 'src/app/auth/auth.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  ui: fromUI.State,
  auth: fromAuth.State,
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.reducer,
  auth: fromAuth.reducer,
}

export const getUIState = createFeatureSelector<fromUI.State>('ui')
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.State>('auth')
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)
export const getUserID = createSelector(getAuthState, fromAuth.getUserID)
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail)