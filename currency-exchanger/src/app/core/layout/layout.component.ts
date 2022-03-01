import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.scss' ]
})
export class LayoutComponent implements OnInit {

  public http: HttpClient;

  constructor(
    private injector: Injector,
    private authService: AuthService
  ) {
    this.http = this.injector.get(HttpClient);
  }

  ngOnInit(): void {
    this.fetchApiDetails();
  }

  fetchApiDetails() {
    this.authService.fetchApiDetails().subscribe((resp: any) => {
      this.authService.apiUrl = resp.apiUrl;
      this.authService.apiKey = resp.apiKey;
      this.authService.isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true');
    });
  }

}
