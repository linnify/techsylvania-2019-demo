import { AddDataButtonComponent } from './add-data-button/add-data-button.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AddDataComponent } from './add-data/add-data.component';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { MaxMeanCardComponent } from './max-mean-card/max-mean-card.component';
import { SelectLocationsCardComponent } from './select-locations-card/select-locations-card.component';
import { FilterableSelectComponent } from './filterable-select/filterable-select.component';

export const components = [
  AddDataButtonComponent,
  AppBarComponent,
  AddDataComponent,
  ChartDataComponent,
  MaxMeanCardComponent,
  SelectLocationsCardComponent,
  FilterableSelectComponent
];

export const entryComponents = [AddDataComponent];

export * from './add-data/add-data.component';
export * from './chart-data/chart-data.component';
export * from './max-mean-card/max-mean-card.component';
