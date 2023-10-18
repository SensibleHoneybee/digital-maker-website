import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputConsoleComponent } from './input-output-console.component';

describe('InputOutputConsoleComponent', () => {
  let component: InputOutputConsoleComponent;
  let fixture: ComponentFixture<InputOutputConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
