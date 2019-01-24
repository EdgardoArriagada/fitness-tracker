import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';

const routes: Routes = [
    //path should be 'training', but its empty cuz TrainingModule is lazy loaded
  { path: '', component: TrainingComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule {

}