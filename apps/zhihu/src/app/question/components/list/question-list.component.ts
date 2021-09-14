import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Question, ResourceType } from 'src/app/common/interfaces';
import { Link } from 'src/app/common/utils';
import { QuestionApiService } from '../../services/api/question-api.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {

  questions?: Question[];

  status = {
    loading: false,
  };

  constructor(
    private api: QuestionApiService,
  ) { }

  ngOnInit() {
    this.api.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

  loadMore() {
    const { resource, id } = new Link(location.href);
    if (this.status.loading || resource !== ResourceType.question || id !== undefined || this.questions === undefined) {
      return;
    }
    this.status.loading = true;
    this.api.getQuestions(this.questions.length > 0 && this.questions[this.questions.length - 1].id || undefined)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(questions => this.questions ? this.questions.push(...questions) : this.questions = questions);
  }

  trackByID(index: number, question: Question) {
    return question.id;
  }

}
