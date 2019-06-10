import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Data } from '../../types/data.interface';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-chart-data',
  template: `
    <mat-card>
      <canvas
        baseChart
        height="80px"
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
      label: 'Mean Travel Time',
      // xAxisID: 'Hour Of Day',
      // yAxisID: 'Travel Time',
      fill: false
    }
  ];

  @Input() set data(value: Data[]) {
    if (value) {
      this.lineChartData[0].data = value.map((dataRow: Data) => ({
        x: dataRow.hourOfDay,
        y: dataRow.meanTravelTime
      }));
    }
  }

  lineChartLabels: number[] = Array.from(Array(24), (x, index) => index);
  lineChartColors: Color[] = [
    {
      borderColor: '#00838f'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
