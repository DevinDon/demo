import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-wave',
  templateUrl: './wave.component.html',
  styleUrls: ['./wave.component.scss'],
  animations: [
    trigger('wave', [
      state('true', style({ display: 'block' })),
      state('false', style({ display: 'none' })),
      transition('* <=> *', animate(300)),
    ]),
  ],
})
export class WaveComponent {

  @Input() public show = false;

}
