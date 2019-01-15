import {
  MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { NgModule } from '@angular/core'

const materialModules = [
  MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule,
]

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
})
export class MyOwnCustomMaterialModule { }
