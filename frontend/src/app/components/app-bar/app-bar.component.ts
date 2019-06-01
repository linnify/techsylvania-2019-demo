import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-bar',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <img src="../../../assets/logo-white.png" style="height: 100%" />
        <span>Techsylvania 2019 - Demo</span>
        <span class="fill"></span>

        <button mat-icon-button>
          <mat-icon>account_circle</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
