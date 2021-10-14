import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationRequest } from 'src/app/core/model/res/application-request.model';
import { RentApplicationService } from 'src/app/core/service/rent-application.service';
import { Application } from '../application-list/application-list.component';

@Component({
  selector: 'app-pending-applications-list',
  templateUrl: './pending-applications-list.component.html',
  styleUrls: ['./pending-applications-list.component.scss']
})
export class PendingApplicationsListComponent implements OnInit {
  applicationRequests!: ApplicationRequest[];
  applicationReqDataSource = new MatTableDataSource<Application>(
    this.applicationRequests
  );
  
  applicationReqColumns: string[] = [
    'name',
    'car',
    'fromDate',
    'toDate',
    'actions',
  ];

  constructor(private applicationService: RentApplicationService) { 

  }

  ngOnInit(): void {
    this.listPendingApplications(1, 5);
  }

  listPendingApplications(pageNo: number, pageSize: number) {
    this.applicationService.getPendingApplications(pageNo, pageSize).subscribe((c) => {
      this.applicationRequests = c.content;
      this.applicationReqDataSource.data = this.applicationRequests;
    });
  }

}