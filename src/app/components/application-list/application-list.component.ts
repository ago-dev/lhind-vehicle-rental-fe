import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationDialogComponent } from '../application-dialog/application-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  displayedColumns: string[] = ['car', 'fromDate', 'toDate', 'actions'];
  dataSource = new MatTableDataSource<Application>(ELEMENT_DATA);
  result: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialogRef.open(ApplicationDialogComponent);
  }
  
  confirmDialog(): void {
    const message = `Are you sure you want to delete this application?`;

    const dialogData = new ConfirmDialogModel("Delete application", message);

    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
}

export interface Application {
  car: string;
  fromDate: string;
  toDate: string;
}

const ELEMENT_DATA: Application[] = [
  {car: 'VOLVO ASTRA', fromDate: new Date().toDateString(), toDate: new Date().toDateString()},
];
