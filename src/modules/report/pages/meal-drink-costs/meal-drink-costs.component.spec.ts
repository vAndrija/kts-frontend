import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDrinkCostsComponent } from './meal-drink-costs.component';

describe('MealDrinkCostsComponent', () => {
  let component: MealDrinkCostsComponent;
  let fixture: ComponentFixture<MealDrinkCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealDrinkCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDrinkCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
