import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { LoadingType, ResourceType } from 'src/app/common/interfaces';
import { sleep } from 'src/app/common/utils';
import { QuestionApiService } from '../../services/api/question-api.service';

@Component({
  selector: 'app-question-publish',
  templateUrl: './question-publish.component.html',
  styleUrls: ['./question-publish.component.scss'],
})
export class QuestionPublishComponent implements OnInit {

  status = {
    publishing: LoadingType.init,
  };

  title = '';
  content = '';

  constructor(
    private api: QuestionApiService,
    private router: Router,
    private bar: MatSnackBar,
  ) { }

  ngOnInit() { }

  isInvalidTitle() {
    const last = this.title.trim().slice(-1);
    return last !== '?' && last !== '？';
  }

  publish() {
    if (this.status.publishing !== LoadingType.init) {
      return;
    }
    this.status.publishing = LoadingType.loading;
    this.api.publishQuestion({
      tags: [],
      title: this.title.trim(),
      content: this.content.trim(),
    }).pipe(
      catchError(async error => {
        this.bar.open('问题发布失败，请稍后重试', '', { duration: 3000 });
        this.status.publishing = LoadingType.failed;
        await sleep(3000);
        this.status.publishing = LoadingType.init;
        throw error;
      }),
    ).subscribe(async ({ id }) => {
      this.status.publishing = LoadingType.succeed;
      this.bar.open('问题发布成功，正在跳转...', '', { duration: 1500 });
      await sleep(1500);
      this.bar.dismiss();
      this.router.navigate([ResourceType.question, id]);
    });
  }

}
