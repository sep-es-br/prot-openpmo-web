import { TestBed } from '@angular/core/testing';

import { GeoReferenceDataService } from './geo-reference-data.service';

describe('GeoReferenceDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoReferenceDataService = TestBed.get(GeoReferenceDataService);
    expect(service).toBeTruthy();
  });
});
