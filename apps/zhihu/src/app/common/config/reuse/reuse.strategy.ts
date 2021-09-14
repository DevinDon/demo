import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { getRouteKey } from '../../utils';

export class ReuseStrategy extends RouteReuseStrategy {

  private cache: Map<string, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data.reuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.cache.set(getRouteKey(route), handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const result: any = this.cache.get(getRouteKey(route));
    return route.routeConfig === result?.route.value.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const result: any = this.cache.get(getRouteKey(route)) ?? null;
    if (route.routeConfig !== result?.route.value.routeConfig) {
      return null;
    }
    return result;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

}
