import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale-service.service';

describe('LocaleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaleService = TestBed.get(LocaleService);
    expect(service).toBeTruthy();
  });
});
