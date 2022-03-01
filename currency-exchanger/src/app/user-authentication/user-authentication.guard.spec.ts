import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/auth.service';
import { UserAuthenticationGuard } from './user-authentication.guard';

describe('UserAuthenticationGuard', () => {
  let guard: UserAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule ],
      providers: [ AuthService, HttpClient ]
    });
    guard = TestBed.inject(UserAuthenticationGuard);
  });

  it('[UserAuthenticationGuard-create ] - should create the gaurd', () => {
    expect(guard).toBeTruthy();
  });
});
