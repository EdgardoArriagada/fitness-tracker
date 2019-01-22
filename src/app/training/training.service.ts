import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()

  private availibleExercise: Exercise[] = []

  private runningExercise: Exercise
  private exercises: Exercise[] = []

  constructor(
    private db: AngularFirestore,
  ) {}

  fetchAvailibleExercises() {
    this.db
    .collection('availibleExercises')
    .snapshotChanges().pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories,
          }
        })
      })
      )
      .subscribe((exercices: Exercise[]) => {
        this.availibleExercise = exercices
        this.exercisesChanged.next([...this.availibleExercise])
      })
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progressMade: number) {
    this.addDataToDatabase({
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

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }  

}
