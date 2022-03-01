import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticationGuard } from './user-authentication/user-authentication.guard';

const routes: Routes = [ {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
},
{
  path: 'currency-converter',
  loadChildren: () => import('./currency-converter/currency-converter.module').then(mod => mod.CurrencyConverterModule),
  canActivate: [ UserAuthenticationGuard ]
},
{
  path: 'view-conversion-history',
  loadChildren: () => import('./conversion-history/conversion-history.module').then(mod => mod.ConversionHistoryModule),
  canActivate: [ UserAuthenticationGuard ]
},
{
  path: '**',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
