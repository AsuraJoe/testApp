import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import { BillService } from '../bill.service';
import { first } from 'rxjs';
import { Bill } from '../_visitmodels/bill';
import { Visit } from '../_visitmodels/visit';
import { VisitService } from '../visit.service';

export interface Patient {
  name: string;
  visitDate: string;
  visitReason: string;
}

export interface UserData {
  patientTreatment: string;
  quantity: number;
  cost: number;
} 

@Component({
  selector: 'app-viewable-patientcheckout',
  templateUrl: './viewable-patientcheckout.component.html',
  styleUrls: ['./viewable-patientcheckout.component.css']
})
export class ViewablePatientcheckoutComponent implements OnInit {
  urlParams = new URLSearchParams(window.location.search);
  
  folders: Patient[] = [
  {
    name: this.urlParams.get('name'),
    visitDate: this.urlParams.get('visitDate'),
    visitReason: this.urlParams.get('reason'),
  }];

  displayedColumns: string[] = ['patientTreatment', 'quantity', 'cost'];
  dataSource: MatTableDataSource<Bill>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private billService:BillService, private visitService: VisitService) { }

  ngOnInit(): void {
    this.loadBill();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadBill(){
    this.billService.getBill(this.urlParams.get('visitid')).pipe(first())
    .subscribe(data => this.dataSource = new MatTableDataSource(data));
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.treatment_cost * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  onSubmit() {
    const visit: Visit = {
      patientid: this.urlParams.get('patientid'),
      status: 'Ready for Checkout',
      visit_reason: 'Checkout',
      visit_summary: 'Patient is ready for checkout'
    };
    console.log(visit);
    this.visitService.addVisit(visit).pipe(first()).subscribe(data => {
      this.router.navigate(['/home/visitation-queue']);
      console.log(data);
    }, error => {
      alert('Error: Could not submit');
    });
  }

}