import { TestBed, inject } from '@angular/core/testing';

import { PlanDataService } from './plan-data.service';

describe('PlanDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanDataService]
    });
  });

  it('should be created', inject([PlanDataService], (service: PlanDataService) => {
    expect(service).toBeTruthy();
  }));
});
