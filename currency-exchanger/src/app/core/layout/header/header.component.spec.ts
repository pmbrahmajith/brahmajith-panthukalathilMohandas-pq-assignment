import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';
import { LoginHomeComponent } from 'src/app/login/login-home/login-home.component';
import { AuthService } from 'src/app/shared/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule, CommonMaterialModule, RouterTestingModule, HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginHomeComponent }
        ]) ],
      providers: [ AuthService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[HeaderComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[HeaderComponent-logout ] - should logged in or not after logout',
    inject([ AuthService ], (authService: AuthService) => {
      component.onLogout();
      expect(authService.isLoggedIn).toBeFalse;
    }));

});
