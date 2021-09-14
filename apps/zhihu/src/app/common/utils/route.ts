import { ActivatedRouteSnapshot } from '@angular/router';

export const getPath: (route: ActivatedRouteSnapshot) => string = route => route
    .pathFromRoot
    .map(segment => segment.url.toString())
    .join('/');

const getPaths: (route: ActivatedRouteSnapshot) => string[] = route => {
  const paths: string[] = [];
  return [
    ...route.url.map(segment => segment.path),
    ...(route.children.map(getPaths).flat()),
  ];
};

const concat: (segments: string[]) => string = segments => segments.filter(segment => !!segment).join('/');

export const getRouteKey: (route: ActivatedRouteSnapshot) => string = route => concat(getPaths(route.root));
