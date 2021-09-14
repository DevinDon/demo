import { Component, Input, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/search/interfaces';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss'],
})
export class SearchResultCardComponent implements OnInit {

  @Input() result!: SearchResult;
  content = '';

  constructor() { }

  ngOnInit() {
    this.content = this.result.answer.content?.slice(0, 100) || '';
  }

}
