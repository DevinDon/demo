import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheInterceptor } from '../interceptors/cache/cache.interceptor';
import { MockInterceptor } from '../interceptors/mock/mock.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true },
  ],
})
export class InterceptorModule { }
