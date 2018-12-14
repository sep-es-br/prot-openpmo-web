import { TestBed } from '@angular/core/testing';

import { RoleDataService } from './role-data.service';

describe('RoleDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleDataService = TestBed.get(RoleDataService);
    expect(service).toBeTruthy();
  });
});
