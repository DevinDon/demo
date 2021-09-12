import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private app: AppService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.app.busy();
    return next.handle(req)
      .pipe(
        catchError((err, caught) => {
          this.app.openBar('无法发送请求，请稍后重试。');
          return of({ status: false } as any);
        }),
        finalize(() => this.app.free())
      );
  }

}
