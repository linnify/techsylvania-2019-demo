import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../../types/data.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-max-mean-card',
  template: `
    <mat-card>
      <mat-card-title>
        Max Average Travel Time
      </mat-card-title>
      <mat-card-content fxLayout="column">
        <ng-container *ngIf="data; else noData">
          <mat-form-field class="full-width" appearance="outline">
            <mat-label>Source</mat-label>
            <input matInput [value]="data.sourceName" disabled />
            <mat-icon matPrefix>place</mat-icon>
          </mat-form-field>
          <mat-form-field class="full-width" appearance="outline">
            <mat-label>Destination</mat-label>
            <input matInput [value]="data.destinationName" disabled />
            <mat-icon matPrefix>place</mat-icon>
          </mat-form-field>
          <div class="mat-title">Time: {{ data.meanTravelTime }}</div>
        </ng-container>
        <ng-template #noData>
          <div fxLayout="row" fxLayoutAlign="center center" class="padding-24">
            <mat-spinner [diameter]="30"></mat-spinner>
          </div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./max-mean-card.component.scss']
})
export class MaxMeanCardComponent implements OnInit {
  @Input() data: Data;

  form: FormGroup;

  constructor() {}

  ngOnInit() {}
}
