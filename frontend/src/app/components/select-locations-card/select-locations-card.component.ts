import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '../../types/location.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Path } from '../../types/path.interface';

@Component({
  selector: 'app-select-locations-card',
  template: `
    <mat-card>
      <mat-card-title>
        Select a source and a destination
      </mat-card-title>
      <mat-card-content fxLayout="column">
        <ng-container *ngIf="locations; else noData">
          <form [formGroup]="form">
            <app-filterable-select
              [title]="'Source'"
              [control]="source"
              [options]="locations"
            ></app-filterable-select>

            <app-filterable-select
              [title]="'Destination'"
              [control]="destination"
              [options]="locations"
            ></app-filterable-select>
          </form>
          <app-loading-button
            class="full-width"
            [name]="'Apply'"
            [disabled]="!form.valid || loading"
            [loading]="loading"
            (press)="onApply()"
          >
          </app-loading-button>
        </ng-container>

        <ng-template #noData>
          <div fxLayout="row" fxLayoutAlign="center center" class="padding-24">
            <mat-spinner [diameter]="30"></mat-spinner>
          </div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./select-locations-card.component.scss']
})
export class SelectLocationsCardComponent implements OnInit {
  @Input() locations: Location[];
  @Input() loading: boolean;
  @Output() apply = new EventEmitter<Path>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });
  }

  ngOnInit() {}

  get source() {
    return this.form.get('source') as FormControl;
  }

  get destination() {
    return this.form.get('destination') as FormControl;
  }

  onApply() {
    const path: Path = {
      sourceId: this.source.value,
      destinationId: this.destination.value
    };
    this.apply.emit(path);
  }
}
