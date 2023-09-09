import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticipantNewComponent } from './login-participant-new.component';

describe('LoginParticipantNew', () => {
  let component: LoginParticipantNew;
  let fixture: ComponentFixture<LoginParticipantNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginParticipantNew ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginParticipantNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
