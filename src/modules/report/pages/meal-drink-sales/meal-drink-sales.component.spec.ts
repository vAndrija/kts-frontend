import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDrinkSalesComponent } from './meal-drink-sales.component';

describe('MealDrinkSalesComponent', () => {
  let component: MealDrinkSalesComponent;
  let fixture: ComponentFixture<MealDrinkSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealDrinkSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDrinkSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
