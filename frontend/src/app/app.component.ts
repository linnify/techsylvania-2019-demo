import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddDataComponent } from './components';
import { Observable } from 'rxjs';
import { Data } from './types/data.interface';
import { DataService } from './services/data.service';
import { Location } from './types/location.interface';
import { tap } from 'rxjs/operators';
import { Path } from './types/path.interface';

@Component({
  selector: 'app-root',
  template: `
    <app-app-bar></app-app-bar>
    <div fxLayout="column" fxLayoutGap="16px" style="margin: 32px">
      <div class="full-width" fxLayout="row" fxLayoutGap="16px">
        <app-max-mean-card
          fxFlex="50%"
          [data]="data$ | async"
        ></app-max-mean-card>

        <app-select-locations-card
          fxFlex="50%"
          [locations]="locations$ | async"
          [loading]="loadingChart"
          (apply)="onApply($event)"
        ></app-select-locations-card>
      </div>
      <app-chart-data [data]="averages$ | async"></app-chart-data>
    </div>
    <app-add-data-button (add)="onAdd()"></app-add-data-button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data$: Observable<Data>;
  locations$: Observable<Location[]>;
  averages$: Observable<Data[]>;
  loadingChart = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.data$ = this.dataService
      .getMaxMean()
      .pipe(
        tap(
          (data: Data) =>
            (this.averages$ = this.dataService.getAverages(
              data.sourceId,
              data.destinationId
            ))
        )
      );
    this.locations$ = this.dataService.getLocations();
  }

  onAdd() {
    this.dialog
      .open(AddDataComponent, { autoFocus: false })
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.snackBar.open('Data was uploaded ', 'Dismiss', {
            duration: 3000
          });
        }
      });
  }

  onApply(path: Path) {
    this.loadingChart = true;
    this.averages$ = this.dataService
      .getAverages(path.sourceId, path.destinationId)
      .pipe(tap(() => (this.loadingChart = false)));
  }
}
