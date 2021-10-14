import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserReqModel } from 'src/app/core/model/req/user-req.model';
import { UserResModel } from 'src/app/core/model/res/user-res.model';
import { UserService } from 'src/app/core/service/user.service';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../confirm-dialog/confirm-dialog.component';
import {
  UserAddEditDialogComponent,
  UserAddEditDialogModel,
} from '../user-add-edit-dialog/user-add-edit-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users!: UserResModel[];
  hasRecords!: boolean;
  totalEntities!: number;
  currentPage!: number;
  perPage!: number;
  totalPages!: number;

  result = '';
  userColumns: string[] = [
    'firstName',
    'lastName',
    'username',
    'email',
    'actions',
  ];

  userDataSource = new MatTableDataSource<UserResModel>(this.users);

  constructor(
    private dialogRef: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listUser(1, 5);
  }

  listUser(pageNo: number, pageSize: number) {
    this.userService.getUsersPage(pageNo, pageSize).subscribe((c) => {
      this.users = c.content;
      this.userDataSource.data = this.users;

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

  openDialog(type: string, user?: UserResModel) {
    let title = '';
    let action = '';
    let userData: UserReqModel = {
      id: null!,
      firstName: '',
      lastName: '',
      username: '',
      email: '',
    };

    if (type === 'add') {
      title = 'Add User';
      action = 'Add';
    } else if (type === 'edit') {
      title = 'Edit User';
      action = 'Edit';
      userData = {
        id: user?.id!,
        firstName: user?.firstName!,
        lastName: user?.lastName!,
        username: user?.username!,
        email: user?.email!,
      };
    }

    const dialogData = new UserAddEditDialogModel(title, action, userData);

    this.dialogRef
      .open(UserAddEditDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if(dialogResult) {
          this.listUser(this.currentPage, this.perPage);
        }
      });
  }

  confirmDeleteUser(id: number): void {
    const dialogData = new ConfirmDialogModel(
      'Delete user',
      `Are you sure you want to delete this user?`
    );

    this.dialogRef
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.userService.deleteUser(id).subscribe(() => {
            this.listUser(this.currentPage, this.perPage);
          });
        }
      });
  }
}
