import { NgModule } from '@angular/core';
import { LoadingModule } from '../common/components/loading/loading.module';
import { ToolbarModule } from '../common/components/toolbar/toolbar.module';
import { MaterialModule } from '../common/modules/material.module';
import { PipeModule } from '../common/modules/pipe.module';
import { SharedModule } from '../common/modules/shared.module';
import { SearchHomeComponent } from './components/home/search-home.component';
import { SearchResultCardComponent } from './components/result/result-card/search-result-card.component';
import { SearchResultComponent } from './components/result/search-result.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchHomeComponent, SearchResultComponent, SearchResultCardComponent],
  imports: [
    SharedModule,
    SearchRoutingModule,
    MaterialModule,
    ToolbarModule,
    LoadingModule,
    PipeModule,
  ],
})
export class SearchModule { }
