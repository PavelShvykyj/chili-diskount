import { TestBed, inject } from '@angular/core/testing';

import { FireAvtorisationService } from './fire-avtorisation.service';

describe('FireAvtorisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireAvtorisationService]
    });
  });

  it('should be created', inject([FireAvtorisationService], (service: FireAvtorisationService) => {
    expect(service).toBeTruthy();
  }));
});
