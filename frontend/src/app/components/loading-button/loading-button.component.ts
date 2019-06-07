import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  template: `
    <button
      mat-raised-button
      color="primary"
      [disabled]="disabled"
      (click)="onClick()"
      class="with-loading full-width"
    >
      <mat-progress-spinner
        *ngIf="loading"
        class="spinner"
        mode="indeterminate"
        [diameter]="24"
        [strokeWidth]="3"
        color="primary"
      >
      </mat-progress-spinner>
      <span *ngIf="!loading"> {{ name }}</span>
    </button>
  `,
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input() name: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Output() press: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.press.emit();
  }
}
