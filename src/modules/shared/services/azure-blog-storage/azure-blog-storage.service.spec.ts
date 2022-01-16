import { TestBed } from '@angular/core/testing';

import { AzureBlogStorageService } from './azure-blog-storage.service';

describe('AzureBlogStorageService', () => {
  let service: AzureBlogStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureBlogStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
