import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { MaterialModule } from '../module/material.module';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [HomeComponent, PolicyComponent, HistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    MatListModule,
    MatRippleModule,
  ],
  exports: [HomeComponent],
})
export class PageModule { }
