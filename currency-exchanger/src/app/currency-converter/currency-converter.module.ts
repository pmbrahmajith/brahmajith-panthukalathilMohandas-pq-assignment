import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { CurrencyConverterRoutingModule } from './currency-converter-routing.module';
import { ConverterHomeComponent } from './converter-home/converter-home.component';
import { ConverterEntryComponent } from './converter-home/converter-entry/converter-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMaterialModule } from '../common-material/common-material.module';
import { ExchangeHistoryComponent } from './converter-home/exchange-history/exchange-history.component';
import { ChartViewComponent } from './converter-home/exchange-history/chart-view/chart-view.component';
import { TableViewComponent } from './converter-home/exchange-history/table-view/table-view.component';
import { ChartsModule } from 'ng2-charts';
import { CurrencyFormatPipe } from '../shared/pipe/currency-format.pipe';


@NgModule({
  declarations: [
    ConverterHomeComponent,
    ConverterEntryComponent,
    ExchangeHistoryComponent,
    ChartViewComponent,
    TableViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    CommonMaterialModule,
    ChartsModule,
    CurrencyConverterRoutingModule
  ],
  providers: [
    CurrencyFormatPipe,
    CurrencyPipe,
    DatePipe
  ]
})
export class CurrencyConverterModule { }
