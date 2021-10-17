import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationRes } from 'src/app/core/model/res/application-res.model';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';
import {
  UserAddEditDialogComponent,
  UserAddEditDialogModel,
} from '../user-add-edit-dialog/user-add-edit-dialog.component';
import { UserResModel } from 'src/app/core/model/res/user-res.model';
import { UserReqModel } from 'src/app/core/model/req/user-req.model';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  constructor() {}

  ngOnInit(): void {}

 
}


