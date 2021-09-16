import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'demo-question-detail-switch',
  templateUrl: './question-detail-switch.component.html',
  styleUrls: ['./question-detail-switch.component.scss'],
})
export class QuestionDetailSwitchComponent {

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('value') valueEmitter = new EventEmitter<'popular' | 'latest'>();

  value = true;

  constructor() { }

  emit(value: boolean) {
    this.valueEmitter.emit(value ? 'popular' : 'latest');
  }

}
