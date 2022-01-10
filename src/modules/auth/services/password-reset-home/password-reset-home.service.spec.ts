import { TestBed } from '@angular/core/testing';

import { PasswordResetHomeService } from './password-reset-home.service';

describe('PasswordResetHomeService', () => {
  let service: PasswordResetHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
