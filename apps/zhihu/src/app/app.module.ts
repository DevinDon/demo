import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorModule } from './common/modules/interceptor.module';
import { SharedModule } from './common/modules/shared.module';
import { StrategyModule } from './common/modules/strategy.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InterceptorModule,
    StrategyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
