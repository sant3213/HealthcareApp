import { TestBed } from '@angular/core/testing';

import { LoginAuthService } from './Login-auth.service';

describe('LoginAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAuthService = TestBed.get(LoginAuthService);
    expect(service).toBeTruthy();
  });
});
