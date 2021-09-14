import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoadingType, QuestionID, ResourceType } from 'src/app/common/interfaces';
import { sleep } from 'src/app/common/utils';
import { QuestionApiService } from 'src/app/question/services/api/question-api.service';
import { AnswerApiService } from '../../services/api/answer-api.service';

@Component({
  selector: 'app-answer-publish',
  templateUrl: './answer-publish.component.html',
  styleUrls: ['./answer-publish.component.scss'],
})
export class AnswerPublishComponent implements OnInit {

  status = {
    publishing: LoadingType.init,
  };

  content = '';
  title = '正在加载问题标题...';
  id: QuestionID;

  constructor(
    private api: AnswerApiService,
    private questionApi: QuestionApiService,
    private router: Router,
    private bar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params.question;
  }

  ngOnInit() {
    this.questionApi.getQuestion(this.id)
      .subscribe(({ title }) => this.title = title);
  }

  publish() {
    if (this.status.publishing !== LoadingType.init) {
      return;
    }
    this.status.publishing = LoadingType.loading;
    this.api.publishAnswer({
      question: this.id,
      content: this.content.trim(),
    }).pipe(
      catchError(async error => {
        this.bar.open('回答添加失败，请稍后重试', '', { duration: 3000 });
        this.status.publishing = LoadingType.failed;
        await sleep(3000);
        this.status.publishing = LoadingType.init;
        throw error;
      }),
    ).subscribe(async ({ id }) => {
      this.status.publishing = LoadingType.succeed;
      this.bar.open('回答添加成功，正在跳转...', '', { duration: 1500 });
      await sleep(1500);
      this.bar.dismiss();
      this.router.navigate([ResourceType.answer, id]);
    });
  }

}
