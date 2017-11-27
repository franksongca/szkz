import { TestBed, inject } from '@angular/core/testing';

import { HzDrawingService } from './hz.drawing.service';

describe('HzDrawingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HzDrawingService]
    });
  });

  it('should be created', inject([HzDrawingService], (service: HzDrawingService) => {
    expect(service).toBeTruthy();
  }));
});
