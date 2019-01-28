import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILIBLE_TRAININGS = '[Training] SET_AVAILIBLE_TRAININGS'
export const SET_FINISHED_TRAININGS = '[Training] SET_FINISHED_TRAININGS'
export const START_TRAINING = '[Training] START_TRAINING'
export const STOP_TRAINING = '[Training] STOP_TRAINING'


export class setAvailibleTrainings implements Action {
  readonly type = SET_AVAILIBLE_TRAININGS;
  constructor(public payload: Exercise[],) {}
}
export class setFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[],) {}
}
export class startTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: Exercise,) {}

}
export class stopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = setAvailibleTrainings
| setFinishedTrainings
| startTraining
| stopTraining