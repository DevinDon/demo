import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { highlightAuto } from 'highlight.js';
import * as Marked from 'marked';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AppService } from '../../app.service';
import { destory } from '../../other/destory';
import { Content } from '../content.model';
import { ContentService } from '../content.service';

@Component({
  selector: 'demo-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('article', [
      state('void', style({ opacity: 0 })),
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('* <=> *', [animate(300)]),
    ]),
  ],
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article!: Content;

  private subscriptions: Subscription[] = [];

  constructor(
    public app: AppService,
    public route: ActivatedRoute,
    public service: ContentService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          tap(() => this.article = undefined as any),
          delay(1000),
        )
        .subscribe(v => {
          const id = +(v.get('id') || 0);
          this.service.getOneByID(id)
            .subscribe(result => {
              if (result.status) {
                this.article = result.content as Content;
                this.article.content = Marked(
                  this.article.content,
                  { highlight: (code, language) => `<span class="language">${language}</span>` + highlightAuto(code).value },
                );
              } else {
                this.app.openBar('无法获取文章，请稍后重试。');
              }
            });
        }),
    );
  }

  ngOnDestroy() {
    destory(this.subscriptions);
  }

}
