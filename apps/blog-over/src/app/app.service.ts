import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fromEvent, generate, of, Subject, Subscription } from 'rxjs';
import { concatMap, debounceTime, delay } from 'rxjs/operators';
import { destory } from './other/destory';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  public info = {
    isDesktop: window.innerWidth > 599
  };

  public status = {
    loading: {
      subjection: new Subject<number>(),
      temp: 0,
      value: 0
    }
  };

  public subscriptions: Subscription[] = [];

  public title = '夜寒苏的窗台';

  constructor(
    public bar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {
    // window resize
    this.subscriptions
      .push(
        fromEvent(window, 'resize')
          .pipe(
            debounceTime(100)
          ).subscribe(() => this.info.isDesktop = window.innerWidth > 599)
      );
    // loading status
    this.subscriptions
      .push(
        this.status.loading.subjection
          .pipe(debounceTime(16))
          .subscribe(v => this.status.loading.value = v)
      );
  }

  busy() {
    this.status.loading.subjection.next(++this.status.loading.temp);
  }

  free() {
    this.status.loading.subjection.next(--this.status.loading.temp);
  }

  scrollToTop(height = 0) {
    generate(
      window.pageYOffset,
      y => y > height,
      y => y - 0.05 * y - 8
    ).pipe(
      concatMap(y => of(y).pipe(delay(16.7)))
    ).subscribe(y => window.scrollTo(0, y));
  }

  scrollToBottom(height = document.body.scrollHeight) {
    generate(
      height,
      y => y > 0,
      y => y - 0.015 * y - 8
    ).pipe(
      concatMap(y => of(y).pipe(delay(16.7)))
    ).subscribe(y => window.scrollTo(0, height - y));
  }

  openBar(message: string, action: string = '确认', config: MatSnackBarConfig = { duration: 3000 }) {
    this.bar.open(message, action, config);
  }

  ngOnDestroy() {
    destory(this.subscriptions);
  }

}
