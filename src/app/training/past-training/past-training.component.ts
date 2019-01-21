import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  private displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  private dataSource = new MatTableDataSource<Exercise>()

  @ViewChild(MatSort) sort: MatSort

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
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

}
