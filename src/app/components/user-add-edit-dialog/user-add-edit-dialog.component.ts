import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserReqModel } from 'src/app/core/model/req/user-req.model';
import { UserService } from 'src/app/core/service/user.service';
import { UserResModel } from 'src/app/core/model/res/user-res.model';

@Component({
  selector: 'app-user-add-edit-dialog',
  templateUrl: './user-add-edit-dialog.component.html',
  styleUrls: ['./user-add-edit-dialog.component.scss'],
})
export class UserAddEditDialogComponent implements OnInit {
  title!: string;
  action!: string;
  user!: UserResModel;

  addEditUserForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  username!: FormControl;
  email!: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserAddEditDialogModel,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserAddEditDialogComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.user = data.userData;

    this.firstName = new FormControl(this.user ? this.user.firstName : '');
    this.lastName = new FormControl(this.user ? this.user.lastName : '');
    this.username = new FormControl(this.user ? this.user.username : '');
    this.email = new FormControl(this.user ? this.user.email : '');
  }

  ngOnInit(): void {
    this.addEditUserForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
    });
  }

  addUpdateUser() {
    let req: UserReqModel = {
      username: this.addEditUserForm.controls.username.value,
      email: this.addEditUserForm.controls.email.value,
      firstName: this.addEditUserForm.controls.firstName.value,
      lastName: this.addEditUserForm.controls.lastName.value,
    };

    if (this.user.id) {
      this.userService.updateUser(this.user.id, req).subscribe();
    } else {
      this.userService.createUser(req).subscribe();
    }

    this.dialogRef.close(true);
  }

  onClose() {
    this.dialogRef.close(true);
  }
}

export class UserAddEditDialogModel {
  constructor(
    public title: string,
    public action: string,
    public userData: UserResModel
  ) {}
}
