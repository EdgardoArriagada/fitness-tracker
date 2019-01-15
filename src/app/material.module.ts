import {
  MatButtonModule, MatCheckboxModule
} from '@angular/material';
import { NgModule } from '@angular/core'

const materialModules = [
  MatButtonModule, MatCheckboxModule
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MyOwnCustomMaterialModule { }
