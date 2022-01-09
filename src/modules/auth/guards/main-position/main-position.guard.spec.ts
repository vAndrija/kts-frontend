import { TestBed } from '@angular/core/testing';

import { MainPositionGuard } from './main-position.guard';

describe('MainPositionGuard', () => {
  let guard: MainPositionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainPositionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
