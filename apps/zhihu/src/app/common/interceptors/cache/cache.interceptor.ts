import {
  HttpEvent,

  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ResourceType } from '../../interfaces';
import { CacheService } from '../../services/cache/cache.service';
import { Link } from '../../utils';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheService,
  ) { }

  shouldCache(resource: ResourceType) {
    return resource === ResourceType.answers || resource === ResourceType.questions;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const link = new Link(request.urlWithParams);
    const { resource, id } = link;

    if (this.shouldCache(resource) && id && this.cache.has(resource, id)) {
      return of(
        new HttpResponse({ body: this.cache.get(resource, id) }),
      );
    }

    if (this.shouldCache(resource)) {
      return next
        .handle(request)
        .pipe(
          filter((event: any) => event instanceof HttpResponse),
          tap(
            ({ body }: HttpResponse<any | any[]>) => Array.isArray(body)
              ? body.forEach(value => this.cache.set(resource, value))
              : this.cache.set(resource, body),
          ),
        );
    }

    return next.handle(request);

  }

}
