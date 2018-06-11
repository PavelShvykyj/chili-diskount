import { TestBed, inject } from '@angular/core/testing';

import { FireAuthGuardService } from './fire-auth-guard.service';

describe('FireAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireAuthGuardService]
    });
  });

  it('should be created', inject([FireAuthGuardService], (service: FireAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
