import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheInterceptor } from '../interceptors/cache/cache.interceptor';
import { MockInterceptor } from '../interceptors/mock/mock.interceptor';

const providers: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true, name: 'cache' },
  { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true, name: 'mock' },
];

@NgModule({
  providers: environment.mock
    ? providers
    : providers.filter((provider: any) => provider.name !== 'mock'),
})
export class InterceptorModule { }
