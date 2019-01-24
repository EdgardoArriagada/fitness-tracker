import { Action } from '@ngrx/store';


export interface State {
  isLoading: boolean
}

export const initialState: State = {
  isLoading: false,
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      }
    case 'STOP_LOADING':
      return {
        isLoading: false
      }
    default:
      return state;
  }
}
