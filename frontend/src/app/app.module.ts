import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import * as fromComponents from './components';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ...fromComponents.components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ChartsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [{ provide: StorageBucket, useValue: 'techsylvania_travel_data' }],
  bootstrap: [AppComponent],
  entryComponents: [...fromComponents.entryComponents]
})
export class AppModule {}
