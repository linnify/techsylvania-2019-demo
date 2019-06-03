import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filterable-select',
  template: `
    <mat-form-field class="full-width" appearance="outline">
      <mat-icon matPrefix>place</mat-icon>
      <mat-label>{{ title | titlecase }}</mat-label>
      <mat-select [formControl]="control">
        <div class="filter sticky" fxLayout="row">
          <mat-icon matPrefix class="margin">search</mat-icon>
          <input
            matInput
            placeholder="Filter"
            type="text"
            [formControl]="filterControl"
            (keydown.Space)="$event.stopPropagation()"
          />
        </div>
        <mat-option
          *ngFor="let item of filteredItems | async"
          [value]="item.id"
        >
          {{ displayFn(item) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./filterable-select.component.scss']
})
export class FilterableSelectComponent implements OnInit {
  filterControl: FormControl = new FormControl();
  filteredItems: Observable<any[]>;
  options: any[];

  @Input() title: string;

  @Input('options') set items(options: any[]) {
    if (options) {
      this.initFilter();
      this.options = options;
    }
  }
  @Input() control: FormControl;
  @Input() displayFn = item => item.name;

  constructor() {}

  ngOnInit() {}

  initFilter() {
    this.filteredItems = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(filterBy =>
        filterBy ? this.filteredBy(filterBy) : this.options.slice()
      )
    );
  }

  filteredBy(filterBy: string) {
    if (!this.options) {
      return [];
    }

    return this.options.filter(
      item =>
        this.displayFn(item)
          .toLowerCase()
          .indexOf(filterBy.toLowerCase()) > -1
    );
  }
}
