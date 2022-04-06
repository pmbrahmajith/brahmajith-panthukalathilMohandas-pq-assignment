import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';
import { AuthService } from 'src/app/shared/auth.service';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule, CommonMaterialModule, HttpClientModule ],
      providers: [ AuthService, HttpClient ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[LayoutComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[LayoutComponent-api ] - should check apiUrl to be the value in appsettings.json',
    inject([ AuthService ], (authService: AuthService) => {
      authService.fetchApiDetails().subscribe(resp => {
        expect(authService.apiUrl).toBe('https://api.exchangerate.host/');
      })
    }));

  it('[LayoutComponent-api ] - should check apiKey to be the value in appsettings.json',
    inject([ AuthService ], (authService: AuthService) => {
      authService.fetchApiDetails().subscribe(resp => {
        expect(authService.apiKey).toBe('bff7e581f9e78eaf3c0bcd3172964e57d097b16a');
      });
    }));

});
