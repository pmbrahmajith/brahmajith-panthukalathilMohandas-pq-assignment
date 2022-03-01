import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {

  public menuList = Constants.menuList;

  constructor() { }

  ngOnInit(): void {
  }

}
