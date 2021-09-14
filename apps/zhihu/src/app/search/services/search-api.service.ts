import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST as host } from 'src/app/common/constants';
import { ResourceType } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';
import { SearchResult } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class SearchApiService {

  constructor(
    private http: HttpClient,
  ) { }

  search(keyword: string) {
    const url = join({ host, segments: [ResourceType.search], params: { keyword } });
    return this.http.get<SearchResult[]>(url);
  }

}
