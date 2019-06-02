import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-add-data-button',
  template: `
    <button mat-fab color="primary" (click)="add.emit()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styleUrls: ['./add-data-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDataButtonComponent implements OnInit {
  @Output() add = new EventEmitter<File>();

  constructor() {}

  ngOnInit() {}
}
