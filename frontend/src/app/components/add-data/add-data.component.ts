import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-data',
  template: `
    <div class="container">
      <div class="title">
        <h3 class="mat-title">Load Data</h3>
        <button mat-icon-button (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="input-container">
        <input type="file" (change)="onUploadFile($event)" accept=".csv" />
      </div>

      <div *ngIf="startUploading && uploadPercent | async as upload">
        <h3>Uploaded {{ upload }} %</h3>
        <mat-progress-bar
          mode="determinate"
          [value]="upload"
        ></mat-progress-bar>
      </div>
    </div>
  `,
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  uploadPercent: Observable<string>;
  startUploading: boolean;

  constructor(
    private dialogRef: MatDialogRef<AddDataComponent>,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.startUploading = false;
  }

  onUploadFile(event) {
    this.startUploading = true;
    const file = event.target.files[0];
    const task = this.storage.upload(file.name, file);

    this.uploadPercent = task
      .percentageChanges()
      .pipe(map(value => value.toFixed(2)));

    task
      .snapshotChanges()
      .pipe(finalize(() => this.onClose(true)))
      .subscribe();
  }

  onClose(finished?: boolean) {
    this.dialogRef.close(finished);
  }
}
