import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginHomeComponent } from './login-home/login-home.component';
import { CommonMaterialModule } from '../common-material/common-material.module';


@NgModule({
  declarations: [
    LoginHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonMaterialModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
