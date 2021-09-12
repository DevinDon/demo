import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { appServiceStub, RouterOutletStubComponent } from './module/stub.module';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ],
      providers: [{ provide: AppService, useValue: appServiceStub }]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  }));

  it('should be created', () => {
    expect(app).toBeTruthy();
  });

});
