import * as fromUI from '../app/shared/ui.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  ui: fromUI.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.reducer
}

export const getUIState = createFeatureSelector<fromUI.State>('ui')
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading)