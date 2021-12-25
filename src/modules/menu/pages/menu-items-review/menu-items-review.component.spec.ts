import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsReviewComponent } from './menu-items-review.component';

describe('MenuItemsReviewComponent', () => {
  let component: MenuItemsReviewComponent;
  let fixture: ComponentFixture<MenuItemsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
