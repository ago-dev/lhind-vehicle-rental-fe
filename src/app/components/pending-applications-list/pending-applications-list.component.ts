import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RentApplicationService } from 'src/app/core/service/rent-application.service';
import {ApplicationRes} from 'src/app/core/model/res/application-res.model';

@Component({
  selector: 'app-pending-applications-list',
  templateUrl: './pending-applications-list.component.html',
  styleUrls: ['./pending-applications-list.component.scss']
})
export class PendingApplicationsListComponent implements OnInit {
  applicationRequests!: ApplicationRes[];
  applicationReqDataSource = new MatTableDataSource<ApplicationRes>(
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
    console.log('Heyyyy');

    this.applicationService.getPendingApplications(pageNo, pageSize).subscribe((c) => {
      console.log('Pending appl '+c.content);
      this.applicationRequests = c.content;
      this.applicationReqDataSource.data = this.applicationRequests;
    });
  }

}