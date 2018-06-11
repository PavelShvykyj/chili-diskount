import { TestBed, inject } from '@angular/core/testing';

import { FireDataService } from './fire-data.service';

describe('FireDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireDataService]
    });
  });

  it('should be created', inject([FireDataService], (service: FireDataService) => {
    expect(service).toBeTruthy();
  }));
});
