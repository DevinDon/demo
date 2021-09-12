import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy, RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { CategoryComponent } from '../category/category.component';
import { ArticleComponent } from '../content/article/article.component';
import { ContentComponent } from '../content/content.component';
import { ImageComponent } from '../content/image/image.component';
import { QuestionComponent } from '../content/question/question.component';
import { SongComponent } from '../content/song/song.component';
import { VideoComponent } from '../content/video/video.component';
import { HomeComponent } from '../home/home.component';

export const routes: Route[] = [
  { path: '', component: HomeComponent, data: { animation: '0' } },
  { path: 'about', component: AboutComponent, data: { animation: '1' } },
  { path: 'category', component: CategoryComponent, data: { animation: '1' } },
  { path: 'content', component: ContentComponent, data: { animation: '1' } },
  { path: 'content/:category', component: ContentComponent, data: { animation: '2' } },
  { path: 'article/:id', component: ArticleComponent, data: { animation: '3' } },
  { path: 'image/:id', component: ImageComponent, data: { animation: '3' } },
  { path: 'question/:id', component: QuestionComponent, data: { animation: '3' } },
  { path: 'song/:id', component: SongComponent, data: { animation: '3' } },
  { path: 'video/:id', component: VideoComponent, data: { animation: '3' } }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

export class RouteReuseHandler implements RouteReuseStrategy {

  private cache: Map<string, DetachedRouteHandle> = new Map();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !route.data.reload;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.cache.set(route.routeConfig?.path || '', handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.cache.has(route.routeConfig?.path || '');
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.cache.get(route.routeConfig?.path || '') || '';
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

}
