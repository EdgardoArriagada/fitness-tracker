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
  private exercises: Exercise[] = []

  getAvailibleExercises() {
    return this.availibleExercise.slice()
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progressMade: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progressMade / 100),
      calories: this.runningExercise.calories * (progressMade / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availibleExercise
    .find(exercise => exercise.id === selectedId)
    this.exerciseChanged.next({...this.runningExercise})
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice()
  }

  constructor() { }
}
