import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionDetailSwitchComponent } from './question-detail-switch.component';

describe('QuestionDetailSwitchComponent', () => {

  let component: QuestionDetailSwitchComponent;
  let fixture: ComponentFixture<QuestionDetailSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDetailSwitchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
