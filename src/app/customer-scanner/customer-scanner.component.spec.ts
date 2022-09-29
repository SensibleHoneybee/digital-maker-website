import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerScannerComponent } from './customer-scanner.component';

describe('CustomerScannerComponent', () => {
  let component: CustomerScannerComponent;
  let fixture: ComponentFixture<CustomerScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerScannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
