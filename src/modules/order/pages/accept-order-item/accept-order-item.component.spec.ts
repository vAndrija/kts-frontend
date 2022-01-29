import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOrderItemComponent } from './accept-order-item.component';

describe('AcceptOrderItemComponent', () => {
  let component: AcceptOrderItemComponent;
  let fixture: ComponentFixture<AcceptOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
