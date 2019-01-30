import { Subscription } from 'rxjs'
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators'
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/training/training.reducer'
import * as fromRoot from 'src/app/app.reducer'
import * as UI from '../shared/ui.actions'
import * as Training from 'src/app/training/training.actions'

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private fbSubscriptions: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) { }

  fetchAvailibleExercises() {
    this.store.dispatch(new UI.StartLoading)
    this.db
      .collection('availibleExercises')
      // snapshotChanges gets metadata, like ID
      .snapshotChanges().pipe(take(1),
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
          this.store.dispatch(new UI.StopLoading())
        }
      )
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeExercise => {
      this.addDataToDatabase({
        ...activeExercise,
        date: new Date(),
        state: 'completed'
      })
      this.store.dispatch(new Training.StopTraining())
    })
  }

  cancelExercise(progressMade: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeExercise => {
      this.addDataToDatabase({
        ...activeExercise,
        duration: activeExercise.duration * (progressMade / 100),
        calories: activeExercise.calories * (progressMade / 100),
        date: new Date(),
        state: 'cancelled'
      })
      this.store.dispatch(new Training.StopTraining())
    })
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.fbSubscriptions.push(
      this.db
        .collection('users').doc(this.getUid()).collection('finishedExercises')
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
    this.db.collection('users').doc(this.getUid()).collection('finishedExercises').add(exercise)
  }

  private getUid() {
    let userID
    this.store.select(fromRoot.getUserID).pipe(take(1))
    .subscribe(uid => userID = uid)
    return userID
  }

}
