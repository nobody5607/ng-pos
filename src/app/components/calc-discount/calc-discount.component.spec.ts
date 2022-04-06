import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcDiscountComponent } from './calc-discount.component';

describe('CalcDiscountComponent', () => {
  let component: CalcDiscountComponent;
  let fixture: ComponentFixture<CalcDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
