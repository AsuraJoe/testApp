import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { PeopleService } from '../people.service';
import { Patient } from '../_visitmodels/patient';

@Injectable({
  providedIn: 'root'
})
export class ViewableVisitationrecordResolver implements Resolve<Patient[]|void> {
  urlParams = new URLSearchParams(window.location.search);
  id = this.urlParams.get('id');
  constructor(private peopleService: PeopleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient[]|void> {
    // if(this.id != null) {
    //   console.log(this.id);
    //   return this.peopleService.getPatient(this.id).pipe(catchError(async (err) => alert(err)));}
    return this.peopleService.getPatients().pipe(catchError(async (err) => alert(err)));
  }
}
