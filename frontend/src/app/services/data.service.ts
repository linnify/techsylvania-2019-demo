import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Location } from '../types/location.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMaxMean(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/max-mean`);
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
}
