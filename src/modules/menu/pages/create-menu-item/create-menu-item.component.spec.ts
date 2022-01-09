import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuItemComponent } from './create-menu-item.component';

describe('CreateMenuItemComponent', () => {
  let component: CreateMenuItemComponent;
  let fixture: ComponentFixture<CreateMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
