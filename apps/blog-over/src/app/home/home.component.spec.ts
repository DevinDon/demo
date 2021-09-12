import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { appServiceStub, MatIconStubComponent } from '../module/stub.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MatIconStubComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [{ provide: AppService, useValue: appServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
