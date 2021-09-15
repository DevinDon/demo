import { Component } from '@angular/core';
import { Link } from 'src/app/interfaces';
import { CacheService } from 'src/app/service/cache.service';

@Component({
  selector: 'demo-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {

  constructor(
    public cache: CacheService,
  ) { }

  getUrl(id: string) {
    return `https://${this.cache.getDomain()}/${id}`;
  }

  getHostname(url: string) {
    return new URL(url).hostname;
  }

  getLinks() {
    return this.cache.selectAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  trackBy(index: number, item: Link) {
    return item.id;
  }

}
