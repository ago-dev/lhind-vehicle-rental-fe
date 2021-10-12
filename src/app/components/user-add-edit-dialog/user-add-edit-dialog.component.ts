import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-user-add-edit-dialog',
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrls: ['./user-add-edit-dialog.component.scss'],
})
export class UserAddEditDialogComponent implements OnInit {
  title!: string;
  action!: string;
  userData!: UserDataModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserAddEditDialogModel) {
    this.title = data.title;
    this.action = data.action;
    this.userData = data.userData;
  }

  ngOnInit(): void {}
}

export class UserDataModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string
  ) {}
}

export class UserAddEditDialogModel {
  constructor(public title: string, public action: string, public userData: UserDataModel) {}
}
