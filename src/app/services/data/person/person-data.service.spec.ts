import { TestBed } from '@angular/core/testing';

import { PersonDataService } from './person-data.service';

describe('PersonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonDataService = TestBed.get(PersonDataService);
    expect(service).toBeTruthy();
  });
});
