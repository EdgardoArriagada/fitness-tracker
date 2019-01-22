import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  private displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  private dataSource = new MatTableDataSource<Exercise>()
  private finishedExercisesChangedSubscription: Subscription

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.finishedExercisesChangedSubscription = this.trainingService.finishedExercisesChanged
    .subscribe((finishedExercises: Exercise[]) => {
      this.dataSource.data = finishedExercises
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: string) {
    /* 
      It have to be trimmed and toLowerCase because
      in MatTableDataSource, each row are stored 
      in a single string concatenating, trimming and
      lowercasing each rows's column values 
    */
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngOnDestroy() {
    this.finishedExercisesChangedSubscription.unsubscribe()
  }

}
