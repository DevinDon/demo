import { Injectable } from '@angular/core';
import { Answer, AnswerID, Question, QuestionID, ResourceType } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CacheService {

  private cache: {
    [index: string]: {
      [index: number]: Question | Answer;
    };
  } = {
      [ResourceType.answers]: {},
      [ResourceType.questions]: {},
    };

  constructor() { }

  has(resource: ResourceType, id: QuestionID | AnswerID): boolean {
    return !!this.get(resource, id);
  }

  get(resource: ResourceType, id: QuestionID | AnswerID): Question | Answer | undefined {
    return this.cache[resource][id];
  }

  set(resource: ResourceType, value: Question | Answer): CacheService {
    this.cache[resource][value.id] = value;
    return this;
  }

}
