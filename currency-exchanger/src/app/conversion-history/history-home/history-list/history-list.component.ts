import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: [ './history-list.component.scss' ]
})
export class HistoryListComponent implements OnInit {
  public historyList: any = [];
  public dataSource: any;
  public displayedColumns: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public selectedId!: number;

  columns = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: any) => element.date ? `${element.date}` : '-',
      style: { width: '180px', 'min-width': '180px' },
    },
    {
      columnDef: 'event',
      header: 'Event',
      cell: (element: any) => element.currencyFormData ?
        `Converted an amount of ${element.currencyFormData.amount} from ${element.currencyFormData.fromCurrencyCode.toUpperCase()} to ${element.currencyFormData.toCurrencyCode.toUpperCase()}` : '-',
      style: { width: '410px', 'min-width': '410px' },
    },
    {
      columnDef: 'actions',
      header: 'Actions',
      cell: (element: any) => element.id ? `${element.id}` : '',
      style: { width: '270px', 'min-width': '270px' },
    }
  ];

  constructor(
    private router: Router,
    private matPaginator: MatPaginatorIntl
  ) {
    this.historyList = JSON.parse(localStorage?.getItem('exchangeData')!);
    this.matPaginator.getRangeLabel = (page, pageSize, length) => {
      if (length === 0 || pageSize === 0) {
        return `0 records`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} of ${length} records`;
    }
    this.matPaginator.itemsPerPageLabel = 'Records per page';
  }

  ngOnInit(): void {
    this.dataSource = (this.historyList?.length) ?
      new MatTableDataSource(this.historyList) : [];
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id: any) {
    let selectedIndex = -1;
    this.historyList.forEach((data: any, index: any) => {
      if (parseInt(id, 10) === data.id) {
        selectedIndex = index;
      }
    });
    this.historyList.splice(selectedIndex, 1);
    this.dataSource = new MatTableDataSource(this.historyList);
    localStorage.setItem('exchangeData', JSON.stringify(this.historyList));
  }

  onView(id: any) {
    const viewObj = this.historyList.filter((data: any) => parseInt(id, 10) === data.id)[ 0 ].currencyFormData;
    const navigationExtras: NavigationExtras = {
      state: {
        viewObj
      }
    };
    this.router.navigate([ 'currency-converter' ], navigationExtras);
  }

}
