import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AppService } from '../app.service';

interface Route {
  icon: string;
  link: string;
  text: string;
}

@Component({
  selector: 'demo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

  @Input() public sidenav!: MatSidenav;

  public routes: Route[] = [
    { icon: 'public', link: '/', text: '首页' },
    { icon: 'book', link: '/content', text: '阅读' },
    { icon: 'loyalty', link: '/category', text: '分类' },
    { icon: 'info', link: '/about', text: '关于' },
  ];

  constructor(
    public app: AppService,
  ) { }

}
