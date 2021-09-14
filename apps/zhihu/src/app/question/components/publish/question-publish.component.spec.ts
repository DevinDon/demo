import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPublishComponent } from './question-publish.component';

describe('QuestionPublishComponent', () => {

  let component: QuestionPublishComponent;
  let fixture: ComponentFixture<QuestionPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionPublishComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
