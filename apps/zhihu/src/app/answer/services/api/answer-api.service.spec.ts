import { TestBed } from '@angular/core/testing';
import { AnswerApiService } from './answer-api.service';

describe('AnswerApiService', () => {

  let service: AnswerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
