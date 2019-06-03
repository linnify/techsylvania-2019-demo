import { AddDataButtonComponent } from './add-data-button/add-data-button.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { MaxMeanCardComponent } from './max-mean-card/max-mean-card.component';

export const components = [
  AddDataButtonComponent,
  AppBarComponent,
  AddDataComponent,
  ChartDataComponent,
  MaxMeanCardComponent
];

export const entryComponents = [AddDataComponent];

export * from './add-data/add-data.component';
export * from './chart-data/chart-data.component';
export * from './max-mean-card/max-mean-card.component';
