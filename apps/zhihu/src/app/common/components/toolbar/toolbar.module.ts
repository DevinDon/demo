import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../search/search.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SearchModule,
    RouterModule,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule { }
