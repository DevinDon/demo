import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Content } from './content.model';
import { ContentService } from './content.service';

@Component({
  selector: 'demo-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public contents: Content[] = [];

  constructor(
    public app: AppService,
    public router: Router,
    public service: ContentService
  ) { }

  ngOnInit() {
    this.getMore();
  }

  getMore() {
    this.service.getMoreByRecent(7).subscribe(result => {
      if (result.status) {
        this.contents = result.content;
      } else {
        this.app.openBar('无法获取数据，请稍后重试。');
      }
    });
  }

  like(content: Content) {
    this.service
      .like(content.id)
      .subscribe(result => {
        if (result.status) {
          this.app.openBar('点赞成功。');
          content.liked = result.content;
        } else {
          this.app.openBar('无法点赞，请稍后重试。');
        }
      });
  }

  share(content: Content) {
    this.service
      .share(content.id)
      .subscribe(result => {
        if (result.status) {
          this.app.openBar('分享成功。');
          content.shared = result.content;
        } else {
          this.app.openBar('无法分享，请稍后重试。');
        }
      });
  }

  openDetail(content: Content) {
    // this.router.navigate([content.category, content.id]);
    this.router.navigate(['article', content.id]);
  }

  trackByFn(index: number, item: Content) {
    return item.date;
  }

}
