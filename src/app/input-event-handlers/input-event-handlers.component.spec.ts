import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEventHandlersComponent } from './input-event-handlers.component';

describe('InputEventHandlersComponent', () => {
  let component: InputEventHandlersComponent;
  let fixture: ComponentFixture<InputEventHandlersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEventHandlersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputEventHandlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
