import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  @Input() color = 'white';

  constructor() { }

}
