import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddDataComponent } from './components';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from './types/data.interface';
import { DataService } from './services/data.service';
import { Location } from './types/location.interface';
import { filter, switchMap, tap } from 'rxjs/operators';
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
          [loading]="loadingMaxAverageTravelTime$ | async"
          (refresh)="onRefreshMaxMean()"
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
  loadingMaxAverageTravelTime$ = new BehaviorSubject<boolean>(true);
  path$ = new BehaviorSubject<Path>(null);

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.data$ = this.loadingMaxAverageTravelTime$.pipe(
      filter(loading => loading),
      switchMap(() => this.loadGetMaxMean())
    );

    this.averages$ = this.path$.pipe(
      filter(path => !!path),
      tap(() => (this.loadingChart = true)),
      switchMap((path: Path) =>
        this.dataService.getAverages(path.sourceId, path.destinationId)
      ),
      tap(() => (this.loadingChart = false))
    );

    this.locations$ = this.dataService.getLocations();
  }

  onRefreshMaxMean() {
    this.loadingMaxAverageTravelTime$.next(true);
  }

  private loadGetMaxMean(): Observable<Data> {
    return this.dataService.getMaxMean().pipe(
      tap(() => this.loadingMaxAverageTravelTime$.next(false)),
      filter(data => !!data),
      filter(
        data =>
          !this.path$.value ||
          (data.destinationId === this.path$.value.destinationId &&
            data.sourceId === this.path$.value.sourceId)
      ),
      tap((data: Data) =>
        this.path$.next({
          sourceId: data.sourceId,
          destinationId: data.destinationId
        })
      )
    );
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
    this.path$.next(path);

    // this.loadingChart = true;
    // this.averages$ = this.dataService
    //   .getAverages(path.sourceId, path.destinationId)
    //   .pipe(tap(() => (this.loadingChart = false)));
  }
}
