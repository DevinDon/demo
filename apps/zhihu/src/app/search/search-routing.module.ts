import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHomeComponent } from './components/home/search-home.component';
import { SearchResultComponent } from './components/result/search-result.component';

const routes: Routes = [
  { path: '', component: SearchHomeComponent },
  { path: ':keyword', component: SearchResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule { }
