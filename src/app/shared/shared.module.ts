import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyOwnCustomMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const sharedModules = [
  CommonModule,
  FormsModule,
  MyOwnCustomMaterialModule,
  FlexLayoutModule,
]

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule { }
