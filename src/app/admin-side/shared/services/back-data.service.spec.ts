import { TestBed } from '@angular/core/testing';

import { BackDataService } from './back-data.service';

describe('BackDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackDataService = TestBed.get(BackDataService);
    expect(service).toBeTruthy();
  });
});
