import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { CurrencyConverterService } from '../../services/currency-converter.service';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: [ './exchange-history.component.scss' ]
})
export class ExchangeHistoryComponent implements OnInit {

  public durationFilter = Constants.durationFilter;
  public selectedDuration: number;
  public selectedView: string;
  public viewList = Constants.viewList;
  public exchangeHistorySubscription!: Subscription;
  public currencyConversionDetails!: any;
  public exchangeHistoryList!: any[];
  public exchangeHistoryStatisticsData!: any;
  private subscription!: Subscription;

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private datePipe: DatePipe
  ) {
    this.selectedDuration = this.durationFilter[ 0 ].code;
    this.selectedView = this.viewList[ 0 ].code;
  }

  ngOnInit(): void {
    if (this.exchangeHistorySubscription) {
      this.exchangeHistorySubscription.unsubscribe();
    }
    this.exchangeHistorySubscription = this.currencyConverterService.exchangeHistorySubject.subscribe((currencyConversionDetails: any) => {
      this.currencyConversionDetails = currencyConversionDetails;
      this.getExchangeHistory();
    });
  }

  getExchangeHistory() {
    this.exchangeHistoryList = [];
    this.exchangeHistoryStatisticsData = [];
    if (this.currencyConversionDetails?.fromCurrencyRateCode && this.selectedDuration) {
      const exchangeHistoryObj = {
        currency: this.currencyConversionDetails.fromCurrencyRateCode.toUpperCase(),
        start: `${this.getFormattedDate(this.selectedDuration)}T00:00:00Z`,
        end: `${this.getFormattedDate()}T00:00:00Z`
      }

      // nomics license doesnot allow parallel api call in 1 sec so adding timeout
      setTimeout(() => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.subscription = this.currencyConverterService.getExchangeHistory(exchangeHistoryObj).subscribe((exchangeHistoryList: any) => {
          exchangeHistoryList.reverse();
          let rateArray: any = [];
          exchangeHistoryList.forEach((data: any) => {
            const historyData = {
              date: this.datePipe.transform(data.timestamp, Constants.dateFormat),
              exchangeRate: (1 * (data.rate / this.currencyConversionDetails.toCurrencyRate)).toFixed(6)
            };
            this.exchangeHistoryList.push(historyData);
            rateArray.push(parseFloat(historyData.exchangeRate));
          });
          const sum = rateArray.reduce((a: any, b: any) => a + b, 0);
          this.exchangeHistoryStatisticsData =
            [
              { type: 'Lowest', rate: rateArray.reduce((a: any, b: any) => Math.min(a, b)).toFixed(6) },
              { type: 'Highest', rate: rateArray.reduce((a: any, b: any) => Math.max(a, b)).toFixed(6) },
              { type: 'Average', rate: (sum / rateArray.length).toFixed(6) }
            ];
        });
      }, 1000);
    }
  }

  getFormattedDate(num?: number) {
    num = num ? num : 0;
    const today = new Date();
    today.setDate(today.getDate() - num);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return year + (month < 10 ? '-0' : '-') + month + (day < 10 ? '-0' : '-') + day;
  }

  onDurationChange() {
    this.getExchangeHistory();
  }

  ngOnDestroy() {
    if (this.exchangeHistorySubscription) {
      this.exchangeHistorySubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
