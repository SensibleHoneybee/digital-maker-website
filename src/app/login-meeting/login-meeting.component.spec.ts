import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMeetingComponent } from './login-meeting.component';

describe('LoginMeetingComponent', () => {
  let component: LoginMeetingComponent;
  let fixture: ComponentFixture<LoginMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
