import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderItemTableComponent } from './accept-order-item-table.component';

describe('AcceptOrderItemTableComponent', () => {
  let component: AcceptOrderItemTableComponent;
  let fixture: ComponentFixture<AcceptOrderItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptOrderItemTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
