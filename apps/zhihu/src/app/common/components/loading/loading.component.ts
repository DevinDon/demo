import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  @Input() background = 'white';
  @Input() color = 'black';
  @Input() full = false;
  @Input() size: 'large' | 'medium' | 'small' | 'mini' = 'medium';
  @Input() direction: 'row' | 'column' = 'column';

  width!: number;
  height!: number;
  viewBox!: string;
  transform!: string;

  constructor() { }

  ngOnInit() {
    const base = 44;
    switch (this.size) {
      case 'large':
        this.width = this.height = base * 3;
        this.transform = 'scale(3)';
        break;
      case 'medium':
        this.width = this.height = base * 2;
        this.transform = 'scale(2)';
        break;
      case 'mini':
        this.width = this.height = base * 0.5;
        this.transform = 'scale(0.5)';
        break;
      case 'small':
      default:
        this.width = this.height = base * 1;
        this.transform = 'scale(1)';
    }
    this.viewBox = `0 0 ${this.width} ${this.height}`;
  }

}
