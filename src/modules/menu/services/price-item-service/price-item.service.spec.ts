import { TestBed } from '@angular/core/testing';

import { PriceItemService } from './price-item.service';

describe('PriceItemService', () => {
  let service: PriceItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
