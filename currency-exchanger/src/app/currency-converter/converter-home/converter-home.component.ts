import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-converter-home',
  templateUrl: './converter-home.component.html',
  styleUrls: [ './converter-home.component.scss' ]
})
export class ConverterHomeComponent implements OnInit {

  public viewObj: any;

  constructor(
    private router: Router
  ) {
    const navigation = this.router?.getCurrentNavigation();
    const navigationData = navigation?.extras.state as {
      viewObj: any
    };
    this.viewObj = (navigationData?.viewObj) ? navigationData.viewObj : null;
  }

  ngOnInit(): void {
  }

}
