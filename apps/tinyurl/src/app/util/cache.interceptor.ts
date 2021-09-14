import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CacheService } from '../service/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService,
  ) { }

  intercept(request: HttpRequest<{ url: string }>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.body) {
      return next.handle(request);
    }

    if (this.cache.isLink(request)) {
      const cached = this.cache.select(request.body.url);
      return cached
        ? of(new HttpResponse({ body: cached }))
        : next.handle(request)
          .pipe(
            filter(event => event instanceof HttpResponse),
            tap(response => this.cache.insert((response as any).body)),
          );
    }

    if (this.cache.isHosts(request)) {
      const cached = this.cache.getHosts();
      return cached.length > 0
        ? of(new HttpResponse({ body: cached }))
        : next.handle(request)
          .pipe(
            filter(event => event instanceof HttpResponse),
            tap(response => this.cache.setHosts((response as any).body)),
          );
    }

    return next.handle(request);

  }

}
