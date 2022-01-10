import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetHomeComponent } from './password-reset-home.component';

describe('PasswordResetHomeComponent', () => {
  let component: PasswordResetHomeComponent;
  let fixture: ComponentFixture<PasswordResetHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
