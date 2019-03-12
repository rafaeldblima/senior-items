import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumirPipe } from './pipes/resumir.pipe';

@NgModule({
  declarations: [
    ResumirPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResumirPipe,
  ]
})
export class SharedModule { }
