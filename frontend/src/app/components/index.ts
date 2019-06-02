import { AddDataButtonComponent } from './add-data-button/add-data-button.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ChartDataComponent } from './chart-data/chart-data.component';

export const components = [
  AddDataButtonComponent,
  AppBarComponent,
  AddDataComponent,
  ChartDataComponent
];

export const entryComponents = [AddDataComponent];

export * from './add-data/add-data.component';
export * from './chart-data/chart-data.component';
