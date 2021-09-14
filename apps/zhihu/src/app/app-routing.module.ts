import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceType } from './common/interfaces';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ResourceType.question,
  },
  {
    path: ResourceType.question,
    loadChildren: () => import('./question/question.module')
      .then(m => m.QuestionModule),
    data: { reuse: true },
  },
  {
    path: ResourceType.answer,
    loadChildren: () => import('./answer/answer.module')
      .then(m => m.AnswerModule),
    data: { reuse: true },
  },
  {
    path: ResourceType.search,
    loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule),
    data: { reuse: true },
  },
  {
    path: ResourceType.user,
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),
    data: { reuse: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
