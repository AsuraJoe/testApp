import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from './_visitmodels/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBill(id): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${environment.visitAPI}/bill/`+id);
  }
}
