import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/shared/auth.service';
import { CurrencyFormatPipe } from 'src/app/shared/pipe/currency-format.pipe';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { ConverterEntryComponent } from './converter-entry.component';

describe('ConverterEntryComponent', () => {
  let component: ConverterEntryComponent;
  let fixture: ComponentFixture<ConverterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterEntryComponent ],
      imports: [ BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule ],
      providers: [ CurrencyConverterService, CurrencyFormatPipe, DatePipe, AuthService, CurrencyPipe, HttpClient ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[ConverterEntryComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[ConverterEntryComponent-formCheck] - should check form is valid or not if no values entered', () => {
    expect(component.currencyForm.valid).toBeFalsy();
  });

  it('[ConverterEntryComponent-formCheck ] - should check amount, fromCurrencyCode, toCurrencyCode to be required with no value entered',
    () => {
      let amount = component.currencyForm.controls[ 'amount' ];
      expect(amount.valid).toBeFalsy();
      expect(amount.errors?.invalid).toBeTruthy();
      let fromCurrencyCode = component.currencyForm.controls[ 'fromCurrencyCode' ];
      expect(fromCurrencyCode.valid).toBeFalsy();
      expect(fromCurrencyCode.errors?.required).toBeTruthy();
      let toCurrencyCode = component.currencyForm.controls[ 'toCurrencyCode' ];
      expect(toCurrencyCode.valid).toBeFalsy();
      expect(toCurrencyCode.errors?.required).toBeTruthy();
    });

  it('[ConverterEntryComponent-formCheck] - should check form is valid or not if data is entered', () => {
    component.currencyForm.controls[ 'amount' ].setValue(1);
    component.currencyForm.controls[ 'fromCurrencyCode' ].setValue('toCurrencyCode');
    component.currencyForm.controls[ 'toCurrencyCode' ].setValue('INR');
    expect(component.currencyForm.valid).toBeTruthy();
  });

  it('[ConverterEntryComponent-formCheck] - should check form is valid or not if wrong format amount is entered', () => {
    component.currencyForm.controls[ 'amount' ].setValue('11a');
    component.currencyForm.controls[ 'fromCurrencyCode' ].setValue('toCurrencyCode');
    component.currencyForm.controls[ 'toCurrencyCode' ].setValue('INR');
    expect(component.currencyForm.invalid).toBeTruthy();
  });

  it('[ConverterEntryComponent-Submit] - should check form is submitted if wrong data is entered', () => {
    expect(component.currencyForm.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('#convert-btn'));
    expect(btn.nativeElement.disabled).toBeTruthy();
    component.currencyForm.controls[ 'amount' ].setValue('11a');
    component.currencyForm.controls[ 'fromCurrencyCode' ].setValue('toCurrencyCode');
    component.currencyForm.controls[ 'toCurrencyCode' ].setValue('INR');
    expect(component.currencyForm.invalid).toBeTruthy();
    fixture.detectChanges();
    expect(btn.nativeElement.disabled).toBeTruthy();
  });

  it('[ConverterEntryComponent-Submit] - should check form is submitted if correct data is entered', () => {
    expect(component.currencyForm.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('#convert-btn'));
    expect(btn.nativeElement.disabled).toBeTruthy();
    component.currencyForm.controls[ 'amount' ].setValue('11');
    component.currencyForm.controls[ 'fromCurrencyCode' ].setValue('EUR');
    component.currencyForm.controls[ 'toCurrencyCode' ].setValue('INR');
    expect(component.currencyForm.valid).toBeTruthy();
    fixture.detectChanges();
    expect(btn.nativeElement.disabled).toBeFalsy();
  });

  it('[ConverterEntryComponent-onSwap] - should check onSwap function', fakeAsync(() => {
    component.currencyForm.controls[ 'amount' ].setValue('11');
    component.currencyForm.controls[ 'fromCurrencyCode' ].setValue('EUR');
    component.currencyForm.controls[ 'toCurrencyCode' ].setValue('INR');
    component.onSwap();
    expect(component.currencyForm.controls[ 'amount' ].value).toBe('11');
    expect(component.currencyForm.controls[ 'fromCurrencyCode' ].value).toBe('INR');
    expect(component.currencyForm.controls[ 'toCurrencyCode' ].value).toBe('EUR');
  }));

  it('[ConverterEntryComponent-formPreLoad] - should check form is preloaded correctly with route data', () => {
    const viewObjData = { amount: "3234", fromCurrencyCode: "INR", toCurrencyCode: "EUR" };
    component.viewObj = viewObjData
    component.loadForm();
    fixture.detectChanges();
    expect(component.currencyForm.valid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('#convert-btn'));
    expect(btn.nativeElement.disabled).toBeFalsy();
    expect(component.currencyForm.controls[ 'amount' ].value).toBe('3234');
    expect(component.currencyForm.controls[ 'fromCurrencyCode' ].value).toBe('INR');
    expect(component.currencyForm.controls[ 'toCurrencyCode' ].value).toBe('EUR');
  });

  it('[ConverterEntryComponent-formPreLoad] - should check form is preloaded correctly without route data', () => {
    const viewObjData = null;
    component.viewObj = viewObjData
    component.loadForm();
    fixture.detectChanges();
    expect(component.currencyForm.invalid).toBeTruthy();
    let btn = fixture.debugElement.query(By.css('#convert-btn'));
    expect(btn.nativeElement.disabled).toBeTruthy();
    expect(component.currencyForm.controls[ 'amount' ].value).toBe('');
    expect(component.currencyForm.controls[ 'fromCurrencyCode' ].value).toBe('');
    expect(component.currencyForm.controls[ 'toCurrencyCode' ].value).toBe('');
  });

});
