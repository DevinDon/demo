import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { AboutContactComponent } from './about/about-contact/about-contact.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CategoryComponent } from './category/category.component';
import { ContentModule } from './content/content.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './module/material.module';
import { RouteReuseHandler, RoutingModule } from './module/routing.module';
import { SharedModule } from './module/shared.module';
import { NavComponent } from './nav/nav.component';
import { LoadingInterceptor } from './other/loading.interceptor';
import { WaveComponent } from './wave/wave.component';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    NavComponent,
    HomeComponent,
    CategoryComponent,
    WaveComponent,
    AboutContactComponent
  ],
  entryComponents: [
    AboutContactComponent,
  ],
  imports: [
    SharedModule,
    RoutingModule,
    MaterialModule,
    ContentModule
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: RouteReuseHandler }
  ]
})
export class AppModule { }
