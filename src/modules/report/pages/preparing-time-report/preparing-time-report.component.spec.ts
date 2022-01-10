import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparingTimeReportComponent } from './preparing-time-report.component';

describe('PreparingTimeReportComponent', () => {
  let component: PreparingTimeReportComponent;
  let fixture: ComponentFixture<PreparingTimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparingTimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparingTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
