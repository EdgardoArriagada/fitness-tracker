import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises: Exercise[]
  private exerciseSubscription: Subscription

  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => this.exercises = exercises
    )
    this.trainingService.fetchAvailibleExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form!.value!.exercise)
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe()
  }
}
