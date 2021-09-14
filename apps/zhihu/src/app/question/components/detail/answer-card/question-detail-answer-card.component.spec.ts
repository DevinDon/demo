import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDetailAnswerCardComponent } from './question-detail-answer-card.component';

describe('QuestionDetailAnswerCardComponent', () => {

  let component: QuestionDetailAnswerCardComponent;
  let fixture: ComponentFixture<QuestionDetailAnswerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailAnswerCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailAnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
