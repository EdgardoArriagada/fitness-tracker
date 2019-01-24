import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const lazyLoadingTrainingModuleString = './training/training.module#TrainingModule'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: lazyLoadingTrainingModuleString, canLoad: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
