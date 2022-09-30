import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTillComponent } from './start-till.component';

describe('StartTillComponent', () => {
  let component: StartTillComponent;
  let fixture: ComponentFixture<StartTillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartTillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartTillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
