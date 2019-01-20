import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false
  exerciseSubcription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubcription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        this.ongoingTraining = exercise ? true : false
      }
    )
  }

}
