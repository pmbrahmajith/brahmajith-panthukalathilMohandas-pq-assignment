import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: [ './table-view.component.scss' ]
})
export class TableViewComponent implements OnInit, OnChanges {

  @Input() exchangeHistoryList!: any[];
  @Input() exchangeHistoryStatisticsData!: any;
  public rateDataSource: any;
  public displayedRateColumns: any;
  public statsDataSource: any;
  public displayedStatsColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  rateColumns = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: any) => element.date ? `${element.date}` : '-',
      style: { width: '80px', 'min-width': '80px' },
    },
    {
      columnDef: 'exchangeRate',
      header: 'Exchange rate',
      cell: (element: any) => element.exchangeRate ? `${element.exchangeRate}` : '-',
      style: { width: '100px', 'min-width': '100px' },
    }
  ];

  statsColumns = [
    {
      columnDef: 'stats',
      header: 'Statistics',
      cell: (element: any) => element.type ? `${element.type}` : '-',
      style: { width: '80px', 'min-width': '80px' },
    },
    {
      columnDef: 'rate',
      header: '',
      cell: (element: any) => element.rate ? `${element.rate}` : '-',
      style: { width: '100px', 'min-width': '100px' },
    }
  ];

  constructor(
    private matPaginator: MatPaginatorIntl
  ) {
    this.matPaginator.getRangeLabel = (page, pageSize, length) => {
      if (length === 0 || pageSize === 0) {
        return `0 records`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} of ${length}`;
    }
    this.matPaginator.itemsPerPageLabel = 'Records per page';
  }

  ngOnChanges(): void {
    this.loadExchangeHistoryStatisticsData();
  }

  ngOnInit(): void {
    this.loadExchangeHistoryStatisticsData();
  }

  loadExchangeHistoryStatisticsData() {
    this.rateDataSource = (this.exchangeHistoryList?.length) ?
      new MatTableDataSource(this.exchangeHistoryList) : [];
    this.displayedRateColumns = this.rateColumns.map(c => c.columnDef);
    this.statsDataSource = (this.exchangeHistoryStatisticsData?.length) ?
      new MatTableDataSource(this.exchangeHistoryStatisticsData) : [];
    this.displayedStatsColumns = this.statsColumns.map(c => c.columnDef);
    this.rateDataSource.paginator = this.paginator;
  }
}
