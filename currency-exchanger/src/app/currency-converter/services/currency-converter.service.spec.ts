import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CurrencyConverterService } from './currency-converter.service';

describe('CurrencyConverterService', () => {
  let currencyConverterService: CurrencyConverterService;
  let authService: AuthService;
  let httpTestCtrl: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [ AuthService, HttpClient ]
    });
    currencyConverterService = TestBed.inject(CurrencyConverterService);
    authService = TestBed.inject(AuthService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  it('[CurrencyConverterService-create ] - should create the service', () => {
    expect(currencyConverterService).toBeTruthy();
  });

  afterEach(() => {
    httpTestCtrl.verify();
  });

});
