import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  public isLoggedIn!: boolean;
  public apiUrl!: string;
  public apiKey!: string;

  constructor(
    private http: HttpClient
  ) { }

  fetchApiDetails(): Observable<any> {
    const url = './assets/appSettings.json';
    return this.http
      .get(url)
      .pipe(response => {
        return response;
      });
  }
}