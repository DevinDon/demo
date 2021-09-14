import { NgModule } from '@angular/core';
import { EditorModule } from '../common/components/editor/editor.module';
import { LoadingModule } from '../common/components/loading/loading.module';
import { ToolbarModule } from '../common/components/toolbar/toolbar.module';
import { MaterialModule } from '../common/modules/material.module';
import { PipeModule } from '../common/modules/pipe.module';
import { SharedModule } from '../common/modules/shared.module';
import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerDetailComponent } from './components/detail/answer-detail.component';
import { AnswerPublishComponent } from './components/publish/answer-publish.component';

@NgModule({
  declarations: [
    AnswerDetailComponent,
    AnswerPublishComponent,
  ],
  imports: [
    SharedModule,
    AnswerRoutingModule,
    MaterialModule,
    LoadingModule,
    PipeModule,
    EditorModule,
    ToolbarModule,
  ],
})
export class AnswerModule { }
