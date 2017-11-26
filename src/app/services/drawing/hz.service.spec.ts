import { TestBed, inject } from '@angular/core/testing';

import { HzService } from './hz.service';

describe('HzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HzService]
    });
  });

  it('should be created', inject([HzService], (service: HzService) => {
    expect(service).toBeTruthy();
  }));
});
