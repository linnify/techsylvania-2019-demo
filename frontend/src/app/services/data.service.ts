import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Location } from '../types/location.interface';
import { map } from 'rxjs/operators';
import { Data } from '../types/data.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMaxMean(): Observable<Data> {
    return this.http.get<Data>(`${environment.apiUrl}/max-mean`);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/locations`).pipe(
      map(results =>
        results.map(result => ({
          id: result.movement_id,
          name: result.display_name
        }))
      )
    );
  }

  getAverages(sourceId: number, destinationId: number): Observable<Data[]> {
    const params: Params = {
      source: sourceId,
      destination: destinationId
    };
    return this.http.get<Data[]>(`${environment.apiUrl}/averages`, { params });
  }

  getLastModified(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/modified`);
  }
}
