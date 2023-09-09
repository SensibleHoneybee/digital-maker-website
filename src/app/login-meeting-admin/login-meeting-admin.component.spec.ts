import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMeetingAdminComponent } from './login-meeting-admin.component';

describe('LoginMeetingAdminComponent', () => {
  let component: LoginMeetingAdminComponent;
  let fixture: ComponentFixture<LoginMeetingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMeetingAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMeetingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
