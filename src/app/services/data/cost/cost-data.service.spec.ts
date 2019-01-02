import { TestBed } from '@angular/core/testing';

import { CostDataService } from './cost-data.service';

describe('CostDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostDataService = TestBed.get(CostDataService);
    expect(service).toBeTruthy();
  });
});
