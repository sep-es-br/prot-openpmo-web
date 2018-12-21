import { TestBed } from '@angular/core/testing';

import { LocalityDataService } from './locality-data.service';

describe('LocalityDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalityDataService = TestBed.get(LocalityDataService);
    expect(service).toBeTruthy();
  });
});
