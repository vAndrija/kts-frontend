import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPreviewComponent } from './restaurant-preview.component';

describe('RestaurantPreviewComponent', () => {
  let component: RestaurantPreviewComponent;
  let fixture: ComponentFixture<RestaurantPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
