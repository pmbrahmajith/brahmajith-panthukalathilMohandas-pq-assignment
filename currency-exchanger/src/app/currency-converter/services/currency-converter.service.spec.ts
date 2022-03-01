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

  it('[CurrencyConverterService-getExchangeRate ] - should check the getExchangeRate',
    () => {
      const testData = [ {
        currency: "AED",
        rate: "0.27224960",
        timestamp: "2022-02-13T00:00:00Z"
      }, {
        currency: "AFN",
        rate: "0.010819164",
        timestamp: "2022-02-13T00:00:00Z"
      } ];
      authService.apiUrl = 'https://api.nomics.com/v1/';
      authService.apiKey = 'bff7e581f9e78eaf3c0bcd3172964e57d097b16a';
      currencyConverterService.getExchangeRate().subscribe((resp: any) => {
        expect(testData).toBe(resp);
      });
      const req = httpTestCtrl.expectOne(`${authService.apiUrl}exchange-rates?key=${authService.apiKey}`);
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(testData);
    });

  it('[CurrencyConverterService-getExchangeHistory ] - should check the getExchangeHistory',
    () => {
      const testData = [
        { timestamp: "2022-02-06T00:00:00Z", rate: "1.1449507671170140" },
        { timestamp: "2022-02-07T00:00:00Z", rate: "1.1454622512915087" },
        { timestamp: "2022-02-08T00:00:00Z", rate: "1.1441647597254005" },
        { timestamp: "2022-02-09T00:00:00Z", rate: "1.1421000936522077" },
        { timestamp: "2022-02-10T00:00:00Z", rate: "1.1421261821005985" }
      ];
      authService.apiUrl = 'https://api.nomics.com/v1/';
      authService.apiKey = 'bff7e581f9e78eaf3c0bcd3172964e57d097b16a';
      const exchangeHistoryObj = {
        currency: "EUR",
        end: "2022-02-13T00:00:00Z",
        start: "2022-02-06T00:00:00Z"
      }
      currencyConverterService.getExchangeHistory(exchangeHistoryObj).subscribe((resp: any) => {
        expect(testData).toBe(resp);
      });
      const req = httpTestCtrl.expectOne(`${authService.apiUrl}exchange-rates/history?key=${authService.apiKey}&currency=${exchangeHistoryObj.currency}&start=${exchangeHistoryObj.start}&end=${exchangeHistoryObj.end}`);
      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
      req.flush(testData);
    });

  afterEach(() => {
    httpTestCtrl.verify();
  });

});
