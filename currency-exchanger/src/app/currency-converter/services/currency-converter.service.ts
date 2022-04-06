import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  public exchangeHistorySubject = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getExchangeRate(currencyFormObj: any): Observable<any> {
    const url = `${this.authService.apiUrl}convert`;
    const params: HttpParams = new HttpParams().append('from', currencyFormObj.fromCurrencyCode.toUpperCase())
      .append('to', currencyFormObj.toCurrencyCode.toUpperCase());
    return this.http
      .get(url, { params })
      .pipe(response => {
        return response;
      });
  }

  getExchangeHistory(exchangeHistoryObj: any): Observable<any> {
    const url = `${this.authService.apiUrl}timeseries`;
    const params: HttpParams = new HttpParams().append('start_date', exchangeHistoryObj.start).
      append('end_date', exchangeHistoryObj.end);
    return this.http
      .get(url, { params })
      .pipe(response => {
        return response;
      });
  }
}
