import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { CurrencyFormatPipe } from 'src/app/shared/pipe/currency-format.pipe';
import { CurrencyConverterService } from '../../services/currency-converter.service';

@Component({
  selector: 'app-converter-entry',
  templateUrl: './converter-entry.component.html',
  styleUrls: [ './converter-entry.component.scss' ]
})
export class ConverterEntryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() viewObj: any;
  public currencyForm!: FormGroup;
  public errorTxt!: string;
  public currencyConversionDetails: any;
  public isLoader !: boolean;
  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private currencyConverterService: CurrencyConverterService,
    private currencyFormatPipe: CurrencyFormatPipe,
    private datePipe: DatePipe
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('viewObj')) {
      this.loadForm();
    }
  }

  ngOnInit(): void {
    if (!this.viewObj) {
      this.loadForm();
    }
  }

  loadForm() {
    this.currencyForm = this.createForm(this.viewObj);
    if (this.viewObj) {
      this.onConvertClick();
    }
  }

  private createForm(viewObj?: any): any {
    const currencyForm = this.formBuilder.group({
      amount: [ (viewObj?.amount) ? viewObj.amount : '', [ Validators.required ] ],
      fromCurrencyCode: [ (viewObj?.fromCurrencyCode) ? viewObj.fromCurrencyCode.toUpperCase() : '', [ Validators.required ] ],
      toCurrencyCode: [ (viewObj?.toCurrencyCode) ? viewObj.toCurrencyCode.toUpperCase() : '', [ Validators.required ] ]
    }, {
      validator: this.validateForm.bind(this)
    });
    return currencyForm;
  }

  public validateForm(currencyForm: FormGroup) {
    const NUMBER_REGEXP = /^[0-9]+([.][0-9]+)?$/g;
    if (!(NUMBER_REGEXP.test(currencyForm?.get('amount')?.value))) {
      currencyForm?.get('amount')?.setErrors({ invalid: { error: true } })
    }
  }

  onConvertClick() {
    this.isLoader = true;
    this.errorTxt = '';
    this.currencyConversionDetails = {};
    const currencyForm = this.currencyForm.getRawValue();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.currencyConverterService.getExchangeRate(currencyForm).subscribe(currencyConversionRateDetails => {
      if (currencyConversionRateDetails?.result) {
        this.saveTransaction(currencyForm);
        this.currencyConversionDetails = {
          fromCurrencyRate: currencyConversionRateDetails.result,
          fromCurrencyRateCode: currencyForm.fromCurrencyCode.toUpperCase(),
          toCurrencyRate: 1,
          toCurrencyRateCode: currencyForm.toCurrencyCode.toUpperCase(),
          convertedAmount: this.currencyFormatPipe.transform((currencyForm.amount
            * (currencyConversionRateDetails.result / 1)),
            currencyForm.amount),
          amount: currencyForm.amount,
          toConversionRate: currencyConversionRateDetails.result,
          fromConversionRate: (1 * (1 / currencyConversionRateDetails.result)).toFixed(6)
        };
        this.currencyConverterService.exchangeHistorySubject.next(this.currencyConversionDetails);
      } else {
        this.errorTxt = 'Please retry with valid currency codes.';
      }
      this.isLoader = false;
    }, (error: any) => {
      this.errorTxt = 'Some error occoured. Nomics.com’s free plan allows for 1 request / second.';
      this.isLoader = false;
      this.currencyConverterService.exchangeHistorySubject.next('');
    })
  }

  saveTransaction(currencyForm: any) {
    if (JSON.parse(localStorage?.getItem('exchangeData')!)?.length) {
      const obj = JSON.parse(localStorage?.getItem('exchangeData')!);
      const newObj = {
        id: obj[ 0 ].id + 1,
        currencyFormData: currencyForm,
        date: this.datePipe.transform(new Date(), Constants.dateTimeFormat)
      }
      localStorage.setItem('exchangeData', JSON.stringify([ newObj ].concat(obj)));
    } else {
      const exchangeData = [ {
        id: 1,
        currencyFormData: currencyForm,
        date: this.datePipe.transform(new Date(), Constants.dateTimeFormat)
      } ]
      localStorage.setItem('exchangeData', JSON.stringify(exchangeData));
    }
  }

  onSwap() {
    const currencyForm = this.currencyForm.getRawValue();
    this.currencyForm.get('fromCurrencyCode')?.setValue(currencyForm.toCurrencyCode);
    this.currencyForm.get('toCurrencyCode')?.setValue(currencyForm.fromCurrencyCode);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
