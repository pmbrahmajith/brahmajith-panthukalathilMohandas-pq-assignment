import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewComponent } from './table-view.component';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableViewComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('[TableViewComponent-create ] - should create the component', () => {
    expect(component).toBeTruthy();
  });
});
