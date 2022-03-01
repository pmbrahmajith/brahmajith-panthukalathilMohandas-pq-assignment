import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';

import { ConverterHomeComponent } from './converter-home.component';

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          viewObj: {
            amount: "1",
            fromCurrencyCode: "eur",
            toCurrencyCode: "inr"
          }
        }
      }
    }
  }
}

describe('ConverterHomeComponent', () => {
  let component: ConverterHomeComponent;
  let fixture: ComponentFixture<ConverterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterHomeComponent ],
      imports: [ BrowserAnimationsModule, CommonMaterialModule, RouterTestingModule ],
      providers: [ { provide: Router, useClass: RouterStub } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[ConverterHomeComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[ConverterHomeComponent-title ] - should check the page title', () => {
    let titleDiv = fixture.debugElement.query(By.css('#page-title')).nativeElement.innerText;
    expect(titleDiv).toBe('I want to convert');
  });

  it('[ConverterHomeComponent-router ] - should check the navigation data for the landing page', () => {
    expect(component.viewObj).toBeNull;
  });

  it('[ConverterHomeComponent-router ] - should check the navigation data while navigating from exchange history',
    () => {
      spyOn(Router.prototype, 'getCurrentNavigation').and.returnValues(
        {
          extras: {
            state: {
              viewObj: {
                amount: "1",
                fromCurrencyCode: "eur",
                toCurrencyCode: "inr"
              }
            }
          }
        } as any
      );
    });

});
