import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticipantExistingComponent } from './login-participant-existing.component';

describe('LoginParticipantExistingComponent', () => {
  let component: LoginParticipantExistingComponent;
  let fixture: ComponentFixture<LoginParticipantExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginParticipantExistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginParticipantExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
