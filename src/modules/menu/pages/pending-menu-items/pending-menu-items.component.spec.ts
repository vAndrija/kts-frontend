import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMenuItemsComponent } from './pending-menu-items.component';

describe('PendingMenuItemsComponent', () => {
  let component: PendingMenuItemsComponent;
  let fixture: ComponentFixture<PendingMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingMenuItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
