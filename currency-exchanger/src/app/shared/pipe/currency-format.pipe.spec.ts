import { CurrencyPipe } from '@angular/common';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyFormatPipe ],
      imports: [ BrowserAnimationsModule ],
      providers: [ CurrencyPipe ]
    }).compileComponents();
  });

  it('[CurrencyFormatPipe-create ] - should create the pipe', inject([ CurrencyPipe ], (currencyPipe: CurrencyPipe) => {
    const pipe = new CurrencyFormatPipe(currencyPipe);
    expect(pipe).toBeTruthy();
  }));

  it('[CurrencyFormatPipe-test ] - should check currencyPipe to transform amount with decimal',
    inject([ CurrencyPipe ], (currencyPipe: CurrencyPipe) => {
      const pipe = new CurrencyFormatPipe(currencyPipe);
      expect(pipe.transform(85.85, 'EUR', '1.2-3')).toBe('85,85');
    }));

  it('[CurrencyFormatPipe-test ] - should check currencyPipe to transform amount greater than 10000',
    inject([ CurrencyPipe ], (currencyPipe: CurrencyPipe) => {
      const pipe = new CurrencyFormatPipe(currencyPipe);
      expect(pipe.transform(10000.85, 'EUR', '1.2-3')).toBe('10 000,85');
    }));

});


