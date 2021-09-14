import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { CacheService } from './service/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private api: ApiService,
    private cache: CacheService,
  ) { }

  ngOnInit() {
    document.oncontextmenu = () => false;
    this.api.getHosts()
      .subscribe(hosts => this.cache.setHosts(hosts.list));
  }

}
