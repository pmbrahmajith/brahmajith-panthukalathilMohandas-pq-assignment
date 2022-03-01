import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ConverterHomeComponent } from 'src/app/currency-converter/converter-home/converter-home.component';
import { AuthService } from 'src/app/shared/auth.service';

import { LoginHomeComponent } from './login-home.component';

describe('LoginHomeComponent', () => {
  let component: LoginHomeComponent;
  let fixture: ComponentFixture<LoginHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginHomeComponent ],
      imports: [ BrowserAnimationsModule, ReactiveFormsModule, HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'currency-converter', component: ConverterHomeComponent }
        ]) ],
      providers: [ AuthService, HttpClient ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[LoginHomeComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[AuthService-check ] - testBedAuthservice instance of AuthService', inject([ AuthService ], (authService: AuthService) => {
    expect(authService instanceof AuthService).toBeTruthy();
  }));

  it('[UserName-check] - should check username to be required with no value entered', () => {
    let userName = component.loginForm.controls[ 'userName' ];
    expect(userName.valid).toBeFalsy();
    expect(userName.errors?.required).toBeTruthy();
  });

  it('[UserName-check] - should check username to be required with value entered', () => {
    let userName = component.loginForm.controls[ 'userName' ];
    userName.setValue('admin');
    expect(userName.valid).toBeTruthy();
    expect(userName.errors).toBeNull();
  });

  it('[Password-check] - should check password to be required with no value entered', () => {
    let password = component.loginForm.controls[ 'password' ];
    expect(password.valid).toBeFalsy();
    expect(password.errors?.required).toBeTruthy();
  });

  it('[Password-check] - should check password to be required with value entered', () => {
    let password = component.loginForm.controls[ 'password' ];
    password.setValue('password');
    expect(password.valid).toBeTruthy();
    expect(password.errors).toBeNull();
  });

  it('[LoginForm-check] - should check form is valid or not if no values entered', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('[LoginForm-check] - should check form is valid or not if data is entered', () => {
    component.loginForm.controls[ 'userName' ].setValue('admin')
    component.loginForm.controls[ 'password' ].setValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('[LoginForm-Submit] - should check form is submitted if wrong data is entered',
    inject([ AuthService ], (authService: AuthService) => {
      // check form is invalid
      expect(component.loginForm.invalid).toBeTruthy();
      let btn = fixture.debugElement.query(By.css('#login-btn'));
      // check button is disabled
      expect(btn.nativeElement.disabled).toBeTruthy();
      component.loginForm.controls[ 'userName' ].setValue('other')
      component.loginForm.controls[ 'password' ].setValue('password');
      expect(component.loginForm.valid).toBeTruthy();
      fixture.detectChanges();
      expect(btn.nativeElement.disabled).toBeFalsy();
      component.onLogin();
      fixture.detectChanges();
      let errorTxtDiv = fixture.debugElement.query(By.css('#login-error-txt')).nativeElement.innerText;
      expect(errorTxtDiv).toBe('Enter valid username and password.');
      expect(component.loginErrorTxt).toBe('Enter valid username and password.');
      expect(authService.isLoggedIn).toBeFalse;
    }));

  it('[LoginForm-Submit] - should check form is submitted if correct data is entered',
    inject([ AuthService ], (authService: AuthService) => {
      // check form is invalid
      expect(component.loginForm.invalid).toBeTruthy();
      let btn = fixture.debugElement.query(By.css('#login-btn'));
      // check button is disabled
      expect(btn.nativeElement.disabled).toBeTruthy();
      component.loginForm.controls[ 'userName' ].setValue('admin')
      component.loginForm.controls[ 'password' ].setValue('password');
      expect(component.loginForm.valid).toBeTruthy();
      fixture.detectChanges();
      expect(btn.nativeElement.disabled).toBeFalsy();
      component.onLogin();
      fixture.detectChanges();
      let errorTxtDiv = fixture.debugElement.query(By.css('#login-error-txt'));
      expect(errorTxtDiv).toBeUndefined;
      expect(component.loginErrorTxt).toBe('');
      expect(authService.isLoggedIn).toBeTrue;
    }));

});
