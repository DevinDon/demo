import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ResourceType } from 'src/app/common/interfaces';
import { Link, mockTags } from 'src/app/common/utils';
import { SearchResult } from '../../interfaces';
import { SearchApiService } from '../../services/search-api.service';
import { SearchHistoryService } from '../../services/search-history.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  value: string;
  results?: SearchResult[];
  tags = mockTags();

  status = {
    loading: false,
  };

  constructor(
    private api: SearchApiService,
    private history: SearchHistoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.value = route.snapshot.params.keyword;
  }

  ngOnInit() {
    this.api.search(this.value)
      .subscribe(results => this.results = results);
  }

  search(keyword: string) {
    this.history.insert(keyword);
    this.router.navigate([ResourceType.search, keyword]);
  }

  loadMore() {
    const { resource, id: keyword } = new Link(location.href);
    if (this.status.loading || resource !== ResourceType.search || this.results === undefined) {
      return;
    }
    this.status.loading = true;
    this.api.search(this.value)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(results => this.results ? this.results.push(...results) : this.results = results);
  }

  trackByID(index: number, result: SearchResult) {
    return result.id;
  }

}
