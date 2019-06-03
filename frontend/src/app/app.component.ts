import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddDataComponent } from './components';
import { Observable } from 'rxjs';
import { Data } from './types/data.interface';
import { DataService } from './services/data.service';

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
      </div>
      <app-chart-data></app-chart-data>
    </div>
    <app-add-data-button (add)="onAdd()"></app-add-data-button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data$: Observable<Data>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.data$ = this.dataService.getMaxMean();
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
}
