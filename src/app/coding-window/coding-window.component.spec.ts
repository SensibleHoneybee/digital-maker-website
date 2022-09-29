import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingWindowComponent } from './coding-window.component';

describe('CodingWindowComponent', () => {
  let component: CodingWindowComponent;
  let fixture: ComponentFixture<CodingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodingWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
