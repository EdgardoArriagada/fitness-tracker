import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { MyOwnCustomMaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    CommonModule,
    MyOwnCustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
  entryComponents: [StopTrainingComponent],

})
export class TrainingModule { }