import { Subject, Subscription } from 'rxjs'
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/training/training.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from 'src/app/training/training.actions'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  public exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()

  public finishedExercisesChanged = new Subject<Exercise[]>()

  private availibleExercise: Exercise[] = []

  private runningExercise: Exercise
  private fbSubscriptions: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) { }

  fetchAvailibleExercises() {
    this.store.dispatch(new UI.StartLoading)
    this.fbSubscriptions.push(
      this.db
        .collection('availibleExercises')
        .snapshotChanges().pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories'],
              }
            })
          })
        )
        .subscribe(
          (exercices: Exercise[]) => {
            this.store.dispatch(new Training.SetAvailibleTrainings(exercices))
            this.store.dispatch(new UI.StopLoading())
          },
          error => {
            this.uiService.showSnackBar(
              'Fetching Exercises failed, please try again later',
              null,
              3000
            )
            this.exercisesChanged.next(null)
            this.store.dispatch(new UI.StopLoading())
          }
        )
    )
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
    this.store.dispatch(new Training.StopTraining())
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubscriptions.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (finishedExercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(finishedExercises))
            this.store.dispatch(new UI.StopLoading())
          },
          error => this.store.dispatch(new UI.StopLoading()),
        )
    )
  }

  public cancelSubscriptions() {
    this.fbSubscriptions.forEach(subscription => subscription.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }

}
