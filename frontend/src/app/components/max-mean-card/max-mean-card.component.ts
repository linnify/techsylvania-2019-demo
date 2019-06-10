import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '../../types/data.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-max-mean-card',
  template: `
    <mat-card style="height: 258px;">
      <mat-card-title fxLayout="row" fxLayoutAlign="space-between center">
        <div>Max Average Travel Time</div>
        <button mat-button color="primary" (click)="refresh.emit()">
          <mat-icon>refresh</mat-icon> Refresh
        </button>
      </mat-card-title>
      <mat-card-content fxLayout="column">
        <ng-container *ngIf="data && !loading; else noData">
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
          <div class="mat-title">
            Time: {{ data.meanTravelTime | duration }}
          </div>
        </ng-container>
        <ng-template #noData>
          <div class="no-data mat-title">
            No data
          </div>
        </ng-template>
        <div
          *ngIf="loading"
          fxLayout="row"
          fxLayoutAlign="center center"
          class="padding-24"
        >
          <mat-spinner [diameter]="30"></mat-spinner>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./max-mean-card.component.scss']
})
export class MaxMeanCardComponent implements OnInit {
  @Input() data: Data;
  @Input() loading: boolean;

  @Output() refresh = new EventEmitter();

  form: FormGroup;

  constructor() {}

  ngOnInit() {}
}
