import { TestBed, inject } from '@angular/core/testing';

import { WorkpackDataService } from './workpack-data.service';

describe('WorkpackDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkpackDataService]
    });
  });

  it('should be created', inject([WorkpackDataService], (service: WorkpackDataService) => {
    expect(service).toBeTruthy();
  }));
});
