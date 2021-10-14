import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from '../application-list/application-list.component';

@Component({
  selector: 'app-pending-applications-list',
  templateUrl: './pending-applications-list.component.html',
  styleUrls: ['./pending-applications-list.component.scss']
})
export class PendingApplicationsListComponent implements OnInit {
  applicationReqDataSource = new MatTableDataSource<Application>(
    APPLICATION_REQUEST_DATA
  );
  
  applicationReqColumns: string[] = [
    'name',
    'car',
    'fromDate',
    'toDate',
    'actions',
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
export interface ApplicationRequest {
  name: string;
  car: string;
  fromDate: string;
  toDate: string;
}

const APPLICATION_REQUEST_DATA: ApplicationRequest[] = [
  {
    name: 'Devis Ago',
    car: 'VOLVO ASTRA',
    fromDate: new Date().toDateString(),
    toDate: new Date().toDateString(),
  },
];
