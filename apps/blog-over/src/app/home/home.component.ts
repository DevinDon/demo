import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';
import { destory } from '../other/destory';
import { Motto } from '../other/response.model';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('motto', [
      state('done', style({ opacity: 1 })),
      state('change', style({ opacity: 0 })),
      transition('* <=> *', animate(1000))
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  public state: 'done' | 'change' = 'done';

  public content = '大道虽简，知易行难。';

  public motto: Motto = { id: 0, content: '大道虽简，知易行难。' };

  public mottos: Motto[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public api: ApiService,
    public app: AppService
  ) { }

  ngOnInit() {
    this.api.get<Motto[]>('/motto/more/10').subscribe(result => this.mottos = result.content);
    this.subscriptions.push(
      timer(5000, 10000)
        .subscribe(
          () => {
            this.state = 'change';
            this.motto = this.mottos[Math.floor(Math.random() * this.mottos.length)];
          }
        )
    );
  }

  ngOnDestroy() {
    destory(this.subscriptions);
  }

}
