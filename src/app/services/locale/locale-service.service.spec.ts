import { TestBed } from '@angular/core/testing';

import { LocaleServiceService } from './locale-service.service';

describe('LocaleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaleServiceService = TestBed.get(LocaleServiceService);
    expect(service).toBeTruthy();
  });
});
