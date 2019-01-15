import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { NgModule } from '@angular/core'

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MyOwnCustomMaterialModule { }
