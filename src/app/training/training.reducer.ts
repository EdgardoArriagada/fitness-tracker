import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './exercise.model';
import * as fromRoot from 'src/app/app.reducer'
import { TrainingActions, SET_AVAILIBLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';

export interface TrainingState {
  availibleExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise,
}

//Required for lazy loading
export interface State extends fromRoot.State {
  training: TrainingState,
}

export const initialState: TrainingState = {
  availibleExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export function reducer(state = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case SET_AVAILIBLE_TRAININGS:
      return {
        ...state,
        availibleExercises: action.payload,
      }
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      }
    case START_TRAINING:
      return {
        ...state,
        activeTraining: state.availibleExercises.find(exercise => exercise.id === action.payload),
      }
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      }
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailibleExercises = createSelector(getTrainingState, (state: TrainingState) => state.availibleExercises)
export const getAvailibleFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises)
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining)
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null) // '!=' instead of '!=='because the 1st one also covers 'undefinded'

