import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart-data',
  template: `
    <mat-card>
      <canvas
        baseChart
        height="60px"
        [datasets]="lineChartData"
        [colors]="lineChartColors"
        [labels]="lineChartLabels"
        [chartType]="'line'"
      >
      </canvas>
    </mat-card>
  `,
  styleUrls: ['./chart-data.component.scss']
})
export class ChartDataComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {
      data: [
        {
          x: 0,
          y: 20
        },
        {
          x: 1,
          y: 30
        },
        {
          x: 2,
          y: 25
        },
        {
          x: 3,
          y: 20
        },
        {
          x: 4,
          y: 50
        },
        {
          x: 5,
          y: 15
        },
        {
          x: 6,
          y: 70
        },
        {
          x: 7,
          y: 36.3
        },
        {
          x: 8,
          y: 29
        }
      ],
      label: 'Mean average Time',
      fill: false
    }
  ];
  public lineChartLabels: number[] = Array.from(Array(24), (x, index) => index);
  public lineChartColors: Color[] = [
    {
      borderColor: '#00838f'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
