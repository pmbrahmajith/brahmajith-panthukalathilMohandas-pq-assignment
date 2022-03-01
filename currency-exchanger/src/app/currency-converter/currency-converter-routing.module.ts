import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterHomeComponent } from './converter-home/converter-home.component';

const routes: Routes = [ {
  path: '',
  component: ConverterHomeComponent
} ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CurrencyConverterRoutingModule { }
