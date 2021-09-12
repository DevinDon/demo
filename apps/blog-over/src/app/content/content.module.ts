import { NgModule } from '@angular/core';
import { MaterialModule } from '../module/material.module';
import { SharedModule } from '../module/shared.module';
import { ArticleComponent } from './article/article.component';
import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { ImageComponent } from './image/image.component';
import { QuestionComponent } from './question/question.component';
import { SongComponent } from './song/song.component';
import { VideoComponent } from './video/video.component';
import { RoutingModule } from '../module/routing.module';

@NgModule({
  declarations: [
    ArticleComponent,
    ContentComponent,
    ImageComponent,
    QuestionComponent,
    SongComponent,
    VideoComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [
    ContentService
  ]
})
export class ContentModule { }
