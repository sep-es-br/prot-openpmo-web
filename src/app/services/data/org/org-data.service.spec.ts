import { TestBed } from '@angular/core/testing';

import { OrgDataService } from './org-data.service';

describe('OrgDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgDataService = TestBed.get(OrgDataService);
    expect(service).toBeTruthy();
  });
});
