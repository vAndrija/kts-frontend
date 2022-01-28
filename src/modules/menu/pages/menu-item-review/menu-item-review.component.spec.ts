import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemReviewComponent } from './menu-item-review.component';

describe('MenuItemReviewComponent', () => {
  let component: MenuItemReviewComponent;
  let fixture: ComponentFixture<MenuItemReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
