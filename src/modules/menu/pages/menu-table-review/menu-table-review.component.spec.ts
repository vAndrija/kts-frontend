import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTableReviewComponent } from './menu-table-review.component';

describe('MenuTableReviewComponent', () => {
  let component: MenuTableReviewComponent;
  let fixture: ComponentFixture<MenuTableReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTableReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTableReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
