import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';
import { AuthService } from 'src/app/shared/auth.service';
import { CurrencyConverterService } from '../../services/currency-converter.service';

import { ExchangeHistoryComponent } from './exchange-history.component';

describe('ExchangeHistoryComponent', () => {
  let component: ExchangeHistoryComponent;
  let fixture: ComponentFixture<ExchangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeHistoryComponent ],
      imports: [ BrowserAnimationsModule, HttpClientModule, CommonMaterialModule, FlexLayoutModule ],
      providers: [ CurrencyConverterService, DatePipe, AuthService, HttpClient, CurrencyConverterService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[ExchangeHistoryComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[ExchangeHistoryComponent-create ] - should verify the history data based on day filter', () => {
    expect(component.selectedDuration).toBe(7);
    expect(component.selectedView).toBe('table');
    expect(component.exchangeHistoryList).toBeUndefined;
    expect(component.exchangeHistoryStatisticsData).toBeUndefined;
  });
});
