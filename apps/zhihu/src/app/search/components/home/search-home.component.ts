import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchHistoryService } from '../../services/search-history.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss'],
})
export class SearchHomeComponent implements OnInit, OnDestroy {

  list?: string[];
  storage = localStorage;
  value = '';

  private subscription: Subscription;

  constructor(
    private router: Router,
    private history: SearchHistoryService,
  ) {
    this.subscription = history.subject.subscribe(list => this.list = list);
  }

  ngOnInit() {
    this.history.load();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(keyword: string) {
    this.history.insert(keyword);
    this.router.navigate(['search', keyword]);
  }

  delete(keyword: string) {
    this.history.delete(keyword);
  }

  trackBy(index: number, item: string) {
    return item;
  }

}
