import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    InfiniteScrollModule,
  ],
})
export class SharedModule { }
