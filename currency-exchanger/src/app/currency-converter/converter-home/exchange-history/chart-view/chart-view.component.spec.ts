import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewComponent } from './chart-view.component';

describe('ChartViewComponent', () => {
  let component: ChartViewComponent;
  let fixture: ComponentFixture<ChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartViewComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[ChartViewComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });
});
