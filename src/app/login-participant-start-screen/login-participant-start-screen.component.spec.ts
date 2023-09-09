import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticipantStartScreenComponent } from './login-participant-start-screen.component';

describe('LoginParticipantStartScreenComponent', () => {
  let component: LoginParticipantStartScreenComponent;
  let fixture: ComponentFixture<LoginParticipantStartScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginParticipantStartScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginParticipantStartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
