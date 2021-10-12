import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Application } from '../application-list/application-list.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import {
  UserAddEditDialogComponent,
  UserAddEditDialogModel,
  UserDataModel,
} from '../user-add-edit-dialog/user-add-edit-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  applicationReqColumns: string[] = [
    'name',
    'car',
    'fromDate',
    'toDate',
    'actions',
  ];

  userColumns: string[] = [
    'firstName',
    'lastName',
    'username',
    'email',
    'actions',
  ];
  applicationReqDataSource = new MatTableDataSource<Application>(
    APPLICATION_REQUEST_DATA
  );
  userDataSource = new MatTableDataSource<UserData>(USER_DATA);
  result = '';

  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  openDialog(type: string, user?: UserData) {
    let title = '';
    let action = '';
    let userData = new UserDataModel('', '', '', '');

    if (type === 'add') {
      title = 'Add User';
      action = 'Add';
    } else if (type === 'edit') {
      title = 'Edit User';
      action = 'Edit';
      userData = new UserDataModel(user?.firstName!, user?.lastName!, user?.username!, user?.email!);
    }

    const dialogData = new UserAddEditDialogModel(title, action, userData);
    this.dialogRef.open(UserAddEditDialogComponent, {
      data: dialogData,
    });
  }

  confirmDialog(): void {
    const message = `Are you sure you want to delete this user?`;

    const dialogData = new ConfirmDialogModel("Delete user", message);

    const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }
}

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const USER_DATA: UserData[] = [
  {
    firstName: 'Devis',
    lastName: 'Ago',
    username: 'dago',
    email: 'agodevis98@gmail.com',
  },
];

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
