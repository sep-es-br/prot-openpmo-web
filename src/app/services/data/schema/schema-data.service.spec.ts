import { TestBed, inject } from '@angular/core/testing';

import { SchemaDataService } from './schema-data.service';

describe('SchemaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchemaDataService]
    });
  });

  it('should be created', inject([SchemaDataService], (service: SchemaDataService) => {
    expect(service).toBeTruthy();
  }));
});
