import { TestBed, inject } from '@angular/core/testing';

import { WorkpackTemplateService } from './workpack-template.service';

describe('WorkpackTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkpackTemplateService]
    });
  });

  it('should be created', inject([WorkpackTemplateService], (service: WorkpackTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
