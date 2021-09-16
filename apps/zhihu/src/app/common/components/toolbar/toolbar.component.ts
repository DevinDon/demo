import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarType } from '../../interfaces';

@Component({
  selector: 'demo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  @Input() type: string = ToolbarType.custom;
  @Input() back = '..';
  @Input() disabled = false;
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('search') searchEmitter = new EventEmitter<string>();
  @Output() valueEmitter = new EventEmitter<string>();
  @Input() value = '';

  constructor(
    public router: Router,
  ) { }

}
