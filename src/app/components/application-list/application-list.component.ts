import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RentApplication } from 'src/app/core/model/res/rent-application.model';
import { RentApplicationService } from 'src/app/core/service/rent-application.service';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  displayedColumns: string[] = ['car', 'fromDate', 'toDate', 'actions'];
  dataSource = new MatTableDataSource<RentApplication>();
  applications!: RentApplication[];
  result: string = '';

  hasRecords!: boolean;
  totalEntities!: number;
  currentPage!: number;
  perPage!: number;
  totalPages!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialogRef: MatDialog, 
              private applicationService: RentApplicationService) {}

  ngOnInit(): void {
    this.listApplications(1, 5);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listApplications(pageNo: number, pageSize: number) {
    this.applicationService.listApplications(pageNo, pageSize).subscribe((c) => {
      this.applications = c.content;
      this.dataSource.data = this.applications;

      if (c.content.length > 0) {
        this.hasRecords = true;
      } else {
        this.hasRecords = false;
      }
      this.totalEntities = c.totalElements;
      this.currentPage = c.number + 1;
      this.perPage = c.size;
    });
  }

  openDialog(type: string, rentApplication: RentApplication) {
    let title = '';
    let action = '';
    let applicationData: RentApplication = {
      id: null!,
      fromDate: '',
      toDate: '',
      vehicleModel: null!,
    };

    if (type === 'add') {
      title = 'Add Application';
      action = 'Add';
    } else if (type === 'edit') {
      title = 'Edit Application';
      action = 'Edit';
      applicationData = {
        id: rentApplication.id,
        fromDate: rentApplication.fromDate,
        toDate: rentApplication.toDate,
        vehicleModel: rentApplication.vehicleModel,
      };
      
    }

    const dialogData = new ApplicationAddEditDialogModel(title, action, applicationData);

    this.dialogRef
      .open(ApplicationDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if(dialogResult) {
          this.applicationService.listApplications(this.currentPage, this.perPage);
        }
      });
  }

  confirmDeleteApplication(id: number): void {
    const dialogData = new ConfirmDialogModel('Delete application',
     `Are you sure you want to delete this application?`);

    this.dialogRef
    .open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    })
    .afterClosed()
    .subscribe((dialogResult) => {
      if (dialogResult) {
        this.applicationService.deleteApplication(id).subscribe(() => {
          this.listApplications(this.currentPage, this.perPage);
        });
      }
    });
  }
}

export class ApplicationAddEditDialogModel {
  constructor(
    public title: string,
    public action: string,
    public applicationData: RentApplication
  ) {}
}