import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonMaterialModule } from '../common-material/common-material.module';
import { NavbarComponent } from './layout/header/navbar/navbar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonMaterialModule,
    RouterModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
