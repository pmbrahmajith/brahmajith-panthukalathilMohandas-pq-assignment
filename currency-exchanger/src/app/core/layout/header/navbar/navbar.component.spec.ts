import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule, CommonMaterialModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[NavbarComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[NavbarComponent-menu ] - should check menuList is equal to constants value', () => {
    expect(component.menuList[ 0 ].code).toBe('currencyConverter');
    expect(component.menuList[ 1 ].code).toBe('viewConversionHistory');
  });
});
