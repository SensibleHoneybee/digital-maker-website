import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewInstanceComponent } from './create-new-instance.component';

describe('CreateNewInstance', () => {
  let component: CreateNewInstance;
  let fixture: ComponentFixture<CreateNewInstance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewInstance ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewInstance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
