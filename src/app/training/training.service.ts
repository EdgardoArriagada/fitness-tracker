import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise>()

  private availibleExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ]

  private runningExercise: Exercise

  getAvailibleExercises() {
    return this.availibleExercise.slice()
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availibleExercise
    .find(exercise => exercise.id === selectedId)
    this.exerciseChanged.next({...this.runningExercise})
  }

  constructor() { }
}
