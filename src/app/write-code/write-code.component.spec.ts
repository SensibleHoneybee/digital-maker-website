import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteCodeComponent } from './write-code.component';

describe('WriteCodeComponent', () => {
  let component: WriteCodeComponent;
  let fixture: ComponentFixture<WriteCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
