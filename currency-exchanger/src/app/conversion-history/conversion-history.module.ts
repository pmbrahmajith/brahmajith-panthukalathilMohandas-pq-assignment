import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversionHistoryRoutingModule } from './conversion-history-routing.module';
import { CommonMaterialModule } from '../common-material/common-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HistoryHomeComponent } from './history-home/history-home.component';
import { HistoryListComponent } from './history-home/history-list/history-list.component';


@NgModule({
  declarations: [
    HistoryHomeComponent,
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CommonMaterialModule,
    ConversionHistoryRoutingModule
  ]
})
export class ConversionHistoryModule { }
