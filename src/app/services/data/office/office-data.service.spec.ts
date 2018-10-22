import { TestBed, inject } from '@angular/core/testing';

import { OfficeDataService } from './office-data.service';

describe('OfficeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeDataService]
    });
  });

  it('should be created', inject([OfficeDataService], (service: OfficeDataService) => {
    expect(service).toBeTruthy();
  }));
});
