import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuItemComponent } from './update-menu-item.component';

describe('UpdateMenuItemComponent', () => {
  let component: UpdateMenuItemComponent;
  let fixture: ComponentFixture<UpdateMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
