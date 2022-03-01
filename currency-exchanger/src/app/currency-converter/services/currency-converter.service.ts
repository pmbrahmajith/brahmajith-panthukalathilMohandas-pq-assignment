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

  getExchangeRate(): Observable<any> {
    const url = `${this.authService.apiUrl}exchange-rates`;
    const params: HttpParams = new HttpParams().append('key', this.authService.apiKey);
    return this.http
      .get(url, { params })
      .pipe(response => {
        return response;
      });
  }

  getExchangeHistory(exchangeHistoryObj: any): Observable<any> {
    const url = `${this.authService.apiUrl}exchange-rates/history`;
    const params: HttpParams = new HttpParams().append('key', this.authService.apiKey).
      append('currency', exchangeHistoryObj.currency).append('start', exchangeHistoryObj.start).append('end', exchangeHistoryObj.end);
    return this.http
      .get(url, { params })
      .pipe(response => {
        return response;
      });
  }
}
