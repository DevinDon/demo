import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnswerPublishComponent } from './answer-publish.component';

describe('AnswerPublishComponent', () => {

  let component: AnswerPublishComponent;
  let fixture: ComponentFixture<AnswerPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerPublishComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
