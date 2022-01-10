import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBenefitRatioComponent } from './cost-benefit-ratio.component';

describe('CostBenefitRatioComponent', () => {
  let component: CostBenefitRatioComponent;
  let fixture: ComponentFixture<CostBenefitRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostBenefitRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostBenefitRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
