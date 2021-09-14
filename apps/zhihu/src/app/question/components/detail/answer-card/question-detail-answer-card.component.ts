import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/common/interfaces';

@Component({
  selector: 'app-question-detail-answer-card',
  templateUrl: './question-detail-answer-card.component.html',
  styleUrls: ['./question-detail-answer-card.component.scss'],
})
export class QuestionDetailAnswerCardComponent implements OnInit {

  @Input() answer!: Answer;
  content!: string;

  constructor() { }

  ngOnInit() {
    this.content = this.answer.content.slice(0, 100);
  }

}
