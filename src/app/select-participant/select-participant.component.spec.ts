import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParticipantComponent } from './select-participant.component';

describe('SelectParticipantComponent', () => {
  let component: SelectParticipantComponent;
  let fixture: ComponentFixture<SelectParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
