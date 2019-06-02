import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddDataComponent } from './components';

@Component({
  selector: 'app-root',
  template: `
    <app-app-bar></app-app-bar>
    <app-chart-data></app-chart-data>
    <app-add-data-button (add)="onAdd()"></app-add-data-button>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

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
