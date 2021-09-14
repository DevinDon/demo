import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { STORAGE_KEY_SEARCH_HISTORY } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {

  readonly subject: Subject<string[]> = new Subject();

  private storage = localStorage;
  private list: string[] = [];

  constructor() { }

  load() {
    const origin = JSON.parse(this.storage.getItem(STORAGE_KEY_SEARCH_HISTORY) || '[]');
    this.subject.next(this.list = Array.from(new Set(origin)));
  }

  save() {
    this.storage.setItem(STORAGE_KEY_SEARCH_HISTORY, JSON.stringify(this.list));
  }

  insert(keyword: string) {
    this.delete(keyword);
    this.list.unshift(keyword);
    this.subject.next(this.list);
    this.save();
  }

  delete(keyword: string) {
    this.list = this.list.filter(value => value !== keyword);
    this.subject.next(this.list);
    this.save();
  }

}
