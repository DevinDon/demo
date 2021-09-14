import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReadifyPipe } from '../pipes/readify/readify.pipe';

@NgModule({
  declarations: [
    ReadifyPipe,
  ],
  exports: [
    ReadifyPipe,
  ],
})
export class PipeModule { }
