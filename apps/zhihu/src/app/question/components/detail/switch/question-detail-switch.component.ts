import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-detail-switch',
  templateUrl: './question-detail-switch.component.html',
  styleUrls: ['./question-detail-switch.component.scss'],
})
export class QuestionDetailSwitchComponent implements OnInit {

  @Output('value') valueEmitter = new EventEmitter<'popular' | 'latest'>();

  value = true;

  constructor() { }

  ngOnInit() { }

  emit(value: boolean) {
    this.valueEmitter.emit(value ? 'popular' : 'latest');
  }

}
