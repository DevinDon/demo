import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { Answer, Question, QuestionID, ResourceType } from 'src/app/common/interfaces';
import { Link, transform } from 'src/app/common/utils';
import { QuestionApiService } from '../../services/api/question-api.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {

  question?: Question;
  answers?: Answer[];
  id: QuestionID;
  fetchType: 'popular' | 'latest' = 'popular';

  status = {
    loading: false,
  };

  constructor(
    private api: QuestionApiService,
    private route: ActivatedRoute,
  ) {
    this.id = +(route.snapshot.paramMap.get('id') || 0);
  }

  ngOnInit() {
    this.api.getQuestion(this.id)
      .subscribe(
        async question => this.question = { ...question, content: await transform(question.content) },
      );
    this.fetchAnswers(this.fetchType);
  }

  trackByAnswerId(index: number, answer: Answer) {
    return answer.id;
  }

  fetchAnswers(value: 'popular' | 'latest') {
    this.answers = undefined;
    this.fetchType = value;
    this.api.getAnswersOfQuestion(this.id)
      .subscribe(answers => this.answers = answers);
  }

  loadMore() {
    const { resource, id } = new Link(location.href);
    if (this.status.loading || resource !== ResourceType.question || id === undefined || this.answers === undefined) {
      return;
    }
    this.status.loading = true;
    this.api.getAnswersOfQuestion(this.id, this.answers.length > 0 && this.answers[this.answers.length - 1].id || undefined)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(answers => this.answers ? this.answers.push(...answers) : this.answers = answers);
  }

}
