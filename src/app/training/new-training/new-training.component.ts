import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises: Exercise[]
  private subscriptions: Subscription[] = []
  public isLoading = false

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.uiService.loadingStateChanged.subscribe(
        isLoading => this.isLoading = isLoading
      )
    )
    this.subscriptions.push(
      this.trainingService.exercisesChanged.subscribe(
        exercises => this.exercises = exercises
      )
    )
    this.fetchExercises()
  }

  private fetchExercises(): void {
    this.trainingService.fetchAvailibleExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form!.value!.exercise)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
