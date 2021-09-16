import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routing', [
      transition('0 => 1, 1 => 2, 1 => 3, 2 => 3', [
        query(
          ':enter',
          [
            style({
              position: 'fixed',
              top: 0,
              right: '-100%',
              opacity: 0,
              width: '100%',
              minHeight: '100vh',
              backgroundColor: '#fff',
            }),
          ],
          { optional: true },
        ),
        query(':leave', [animateChild()], { optional: true }),
        group([
          query(':leave', [animate('500ms ease-in-out')], { optional: true }),
          query(':enter', [animate('500ms ease-in-out', style({ right: 0, opacity: 1 }))], { optional: true }),
        ]),
        query(':enter', [animateChild()], { optional: true }),
      ]),
      transition('3 => 2, 3 => 1, 2 => 1, 1 => 0', [
        query(
          ':leave',
          [
            style({
              position: 'fixed',
              top: 0,
              right: 0,
              opacity: 1,
              width: '100%',
              minHeight: '100vh',
              backgroundColor: '#fff',
            }),
          ],
          { optional: true },
        ),
        query(':enter', [animateChild()], { optional: true }),
        group([
          query(':enter', [animate('500ms ease-in-out')], { optional: true }),
          query(':leave', [animate('500ms ease-in-out', style({ right: '-100%', opacity: 0 }))], { optional: true }),
        ]),
        query(':leave', [animateChild()], { optional: true }),
      ]),
    ]),
  ],
})
export class AppComponent {

  public routing = -1;

  constructor(
    public app: AppService,
  ) { }

}
