import { TestBed } from '@angular/core/testing';

import { DashDataService } from './dash-data.service';

describe('DashDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashDataService = TestBed.get(DashDataService);
    expect(service).toBeTruthy();
  });
});
