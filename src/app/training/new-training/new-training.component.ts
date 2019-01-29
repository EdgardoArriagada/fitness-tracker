import { Component, OnInit, } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/training/training.reducer'
// fromRoot imported just for teh right completion
import * as fromRoot from 'src/app/app.reducer'


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  public exercises$: Observable<Exercise[]>
  public isLoading$: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.exercises$ = this.store.select(fromTraining.getAvailibleExercises)
    this.fetchExercises()
  }

  private fetchExercises(): void {
    this.trainingService.fetchAvailibleExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form!.value!.exercise)
  }
}
