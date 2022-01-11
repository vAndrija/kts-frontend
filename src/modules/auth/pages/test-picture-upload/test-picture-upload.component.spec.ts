import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPictureUploadComponent } from './test-picture-upload.component';

describe('TestPictureUploadComponent', () => {
  let component: TestPictureUploadComponent;
  let fixture: ComponentFixture<TestPictureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPictureUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
