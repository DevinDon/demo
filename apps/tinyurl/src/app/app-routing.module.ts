import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './page/history/history.component';
import { HomeComponent } from './page/home/home.component';
import { PolicyComponent } from './page/policy/policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
