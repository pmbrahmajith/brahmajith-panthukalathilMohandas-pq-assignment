import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonMaterialModule } from 'src/app/common-material/common-material.module';

import { HistoryHomeComponent } from './history-home.component';

describe('HistoryHomeComponent', () => {
  let component: HistoryHomeComponent;
  let fixture: ComponentFixture<HistoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryHomeComponent ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule, CommonMaterialModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[HistoryHomeComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('[HistoryHomeComponent-title ] - should check the page title', () => {
    let titleDiv = fixture.debugElement.query(By.css('#page-title')).nativeElement.innerText;
    expect(titleDiv).toBe('Conversion history');
  });
});
