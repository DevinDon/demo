import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mock } from 'mockjs';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Answer, AnswerID, AnswerStatus, Question, QuestionID, ResourceType, UserID } from '../../interfaces';
import { Link, mockAnswer, mockQuestion, mockSearch, mockUser, mockVote } from '../../utils';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private data: any = {
    [ResourceType.votes]: (_: any, request: HttpRequest<any>) => mockVote(request),
    [ResourceType.questions]: (id?: QuestionID) => id
      ? mockQuestion(id)
      : mock({ 'array|10': [() => mockQuestion()] }).array,
    [ResourceType.answers]: (id?: AnswerID, link?: Link) => id
      ? mockAnswer(id, +(link?.getParam('question') || 0) || undefined)
      : mock({ 'array|10': [() => mockAnswer(undefined, +(link?.getParam('question') || 0) || undefined)] }).array,
    users: (id?: UserID) => id
      ? mockUser(id)
      : mock({ 'array|10': [() => mockUser()] }).array,
    [ResourceType.search]: () => mock({ 'array|10': [() => mockSearch()] }).array,
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const link = new Link(request.urlWithParams);
    const { resource, id } = link;

    if (environment.mock) {
      const body = this.adapt(request, link) || this.data[resource](id, link);
      return of(new HttpResponse({ body }))
        .pipe(
          delay(100 + Math.random() * 3000),
        );
    }

    return next.handle(request);

  }

  adapt(request: HttpRequest<any>, { id, resource, params }: Link): any | undefined {
    if (resource === ResourceType.questions && request.method === 'POST') {
      const question: Question = {
        ...mockQuestion(),
        title: request.body.title,
        content: request.body.content,
        tags: request.body.tags,
        count: {
          answer: 0,
          like: 0,
          visit: 0,
        },
      };
      return question;
    } else if (resource === ResourceType.answers && request.method === 'POST') {
      const answer: Answer = {
        ...mockAnswer(),
        question: request.body.question,
        content: request.body.content,
        count: {
          approve: 0,
          oppose: 0,
          comment: 0,
        },
        status: AnswerStatus.none,
      };
      return answer;
    }
  }

}
