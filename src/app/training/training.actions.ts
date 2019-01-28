import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILIBLE_TRAININGS = '[Training] SET_AVAILIBLE_TRAININGS'
export const SET_FINISHED_TRAININGS = '[Training] SET_FINISHED_TRAININGS'
export const START_TRAINING = '[Training] START_TRAINING'
export const STOP_TRAINING = '[Training] STOP_TRAINING'


export class SetAvailibleTrainings implements Action {
  readonly type = SET_AVAILIBLE_TRAININGS;
  constructor(public payload: Exercise[],) {}
}
export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[],) {}
}
export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string,) {}

}
export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailibleTrainings
| SetFinishedTrainings
| StartTraining
| StopTraining