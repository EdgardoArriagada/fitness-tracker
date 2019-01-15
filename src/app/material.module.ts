import {
  MatButtonModule, MatIconModule
} from '@angular/material';
import { NgModule } from '@angular/core'

const materialModules = [
  MatButtonModule, MatIconModule
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MyOwnCustomMaterialModule { }
