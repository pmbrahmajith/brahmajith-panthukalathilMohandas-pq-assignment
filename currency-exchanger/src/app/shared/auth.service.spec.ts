import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestCtrl: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [ HttpClient, AuthService ]
    });
    authService = TestBed.inject(AuthService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  it('[AuthService-create ] - should create the service', () => {
    expect(authService).toBeTruthy();
  });

  it('[AuthService-fetchApiDetails ] - should check the fetchApiDetails',
    () => {
      const testData = {
        apiUrl: "https://api.exchangerate.host/"
      };
      authService.fetchApiDetails().subscribe((resp: any) => {
        expect(testData).toBe(resp);
      });
      const req = httpTestCtrl.expectOne('./assets/appSettings.json');
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(testData);
    });

  afterEach(() => {
    httpTestCtrl.verify();
  });

});
