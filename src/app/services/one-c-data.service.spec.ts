import { TestBed, inject } from '@angular/core/testing';

import { OneCDataService } from './one-c-data.service';

describe('OneCDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneCDataService]
    });
  });

  it('should be created', inject([OneCDataService], (service: OneCDataService) => {
    expect(service).toBeTruthy();
  }));
});
