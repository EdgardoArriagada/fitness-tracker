import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    //path should be 'training', but its empty cuz TrainingModule is lazy loaded
  { path: '', component: TrainingComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrainingRoutingModule {

}