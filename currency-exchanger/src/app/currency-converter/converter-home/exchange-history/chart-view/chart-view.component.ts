import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: [ './chart-view.component.scss' ]
})
export class ChartViewComponent implements OnInit, OnChanges {

  @Input() exchangeHistoryList!: any[];
  @Input() exchangeHistoryStatisticsData!: any;
  public chartOptions: any;
  public chartType: any = 'line';
  public chartLabels!: Label[];
  public chartData!: ChartDataSets[];
  public chartColors: Array<any> = [
    {
      pointRadius: 4,
      backgroundColor: 'rgba(143,201,143,.1)',
      borderColor: 'rgba(109,184,109,1)',
      hoverBackgroundColor: 'rgba(143,201,143,.8)',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgba(109,184,109,1)'
    },
    {
      pointRadius: 4,
      backgroundColor: 'rgba(130,193,211,.1)',
      borderColor: 'rgba(111,184,204,1)',
      hoverBackgroundColor: 'rgba(130,193,211,1)',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgba(111,184,204,1)'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.setChartOptions();
    this.loadExchangeHistoryStatisticsData();
  }

  ngOnChanges(): void {
    this.loadExchangeHistoryStatisticsData();
  }

  loadExchangeHistoryStatisticsData() {
    if (this.exchangeHistoryList?.length) {
      this.chartLabels = this.exchangeHistoryList.map((data: any) => data.date);
      this.chartData = [ {
        label: 'Exchange rate',
        data: this.exchangeHistoryList.map((data: any) => data.exchangeRate),
      } ];
    }
  }

  setChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: { tension: 0 }
      },
      layout: {
        padding: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5,
        }
      },
      scales: {
        xAxes: [ {
          categorySpacing: 0,
          categoryPercentage: 0.5,
          barThickness: 11,
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 10
          }
        } ],
        yAxes: [ {
          display: true,
          gridLines: {
            drawBorder: false,
          },
          ticks: {
            callback: (value: any) => {
              return value;
            },
            fontSize: 10
          }
        } ]
      }
    };
  }

}
