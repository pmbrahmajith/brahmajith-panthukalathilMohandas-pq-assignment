import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';

import { HistoryListComponent } from './history-list.component';

describe('HistoryListComponent', () => {
  let component: HistoryListComponent;
  let fixture: ComponentFixture<HistoryListComponent>;

  beforeEach(async () => {
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    await TestBed.configureTestingModule({
      declarations: [ HistoryListComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule, CommonMaterialModule,
        RouterTestingModule ],
      providers: [ { provide: Router, useValue: mockRouter } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[HistoryListComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[HistoryListComponent-onView ] - should check the validate onView function for routing',
    inject([ Router ], (router: Router) => {
      component.historyList = [ {
        "id": 1,
        "currencyFormData": {
          "amount": "1",
          "fromCurrencyCode": "eur",
          "toCurrencyCode": "inr"
        },
        "date": "13/02/2022 @ 00:09"
      } ]
      component.onView(1);
      expect(router.navigate).toHaveBeenCalledWith([ 'currency-converter' ], {
        "state": {
          "viewObj": {
            "amount": "1",
            "fromCurrencyCode": "eur",
            "toCurrencyCode": "inr"
          }
        }
      });
    }));

  it('[HistoryListComponent-onDelete ] - should check the validate onDelete function for deleting data',
    () => {
      component.historyList = [ {
        id: 1,
        currencyFormData: {
          amount: "1",
          fromCurrencyCode: "eur",
          toCurrencyCode: "inr"
        },
        date: "13/02/2022 @ 00:09"
      }, {
        id: 2,
        currencyFormData: {
          amount: "1",
          fromCurrencyCode: "eur",
          toCurrencyCode: "inr"
        },
        date: "13/02/2022 @ 00:09"
      } ];
      component.onDelete('1');
      expect(component.historyList.filter((data: any) => parseInt('1', 10) === data.id).length).toBe(0);
    });

});
