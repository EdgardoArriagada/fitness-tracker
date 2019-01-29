import { Action } from '@ngrx/store';

//this helps to populate the reducer switch
export const START_LOADING = '[Ui] START_LOADING'
export const STOP_LOADING = '[Ui] STOP_LOADING'

// this helps to populate the dispath
export class StartLoading implements Action {
  readonly type = START_LOADING;
}
export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
