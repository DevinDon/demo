import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarType } from '../../interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Input() type: string = ToolbarType.custom;
  @Input() back = '..';
  @Input() disabled = false;
  @Output('search') searchEmitter = new EventEmitter<string>();
  @Output() valueEmitter = new EventEmitter<string>();
  @Input() value = '';

  constructor(
    public router: Router,
  ) { }

  ngOnInit() { }

}
