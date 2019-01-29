import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { TrainingService } from './training.service';
import * as fromTraining from 'src/app/training/training.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>

  constructor(
    private store: Store<fromTraining.State>,
  ) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining)
  }

}
