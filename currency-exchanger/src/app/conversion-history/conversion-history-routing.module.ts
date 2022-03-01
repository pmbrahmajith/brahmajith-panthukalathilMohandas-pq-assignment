import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryHomeComponent } from './history-home/history-home.component';

const routes: Routes = [ {
  path: '',
  component: HistoryHomeComponent
} ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ConversionHistoryRoutingModule { }
