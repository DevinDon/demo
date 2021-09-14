import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionDetailComponent } from './components/detail/question-detail.component';
import { QuestionListComponent } from './components/list/question-list.component';
import { QuestionPublishComponent } from './components/publish/question-publish.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent,
  },
  {
    path: 'new',
    component: QuestionPublishComponent,
    data: { reuse: false },
  },
  {
    path: ':id',
    component: QuestionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule { }
