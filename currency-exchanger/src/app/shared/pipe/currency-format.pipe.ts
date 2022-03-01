import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) { }

  transform(amountValue: any, currencyCode?: any, digitsInfo?: string): any {
    digitsInfo = digitsInfo ? digitsInfo : '1.2-3';
    const value = this.currencyPipe.transform(amountValue, currencyCode, 'symbol-narrow', digitsInfo);
    const amount = this.formatAmountValue(amountValue, 2, 3, ' ', ',');
    return amount;
  }

  // function to modify the amount in space and decimal to comma format eg: 4294967295.00 = 4 294 967 295,00
  public formatAmountValue(value: any, n: any, x: any, s: any, c: any) {
    const reg = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
    const num = value.toFixed(Math.max(0, (n / 1)));
    return (c ? num.replace('.', c) : num).replace(new RegExp(reg, 'g'), '$&' + (s || ','));
  }
}