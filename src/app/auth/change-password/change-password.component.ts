import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordReqModel } from 'src/app/core/model/req/change-password-req.model';
import { LoginRequest } from 'src/app/core/model/req/login-request.model';
import { AuthenticationService } from 'src/app/core/service/authetication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  error = "";
  changePasswordReq!: ChangePasswordReqModel;
  returnUrl!:string;
  constructor(    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }
  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      token: ["", Validators.required],
      password: ["", Validators.required]

        });
    this.returnUrl =  "/auth";
  }
  onSubmit() {
    this.changePasswordReq ={
      resetToken: this.changePasswordForm.controls.token.value,
      newPassword: this.changePasswordForm.controls.password.value
    }
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.authenticationService
      .changePassword(this.changePasswordReq)
      .subscribe(
        (data) => {
          this.authenticationService.logout();
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.changePasswordForm.reset();
          this.error = "Something went wrong!";
        }
      );
  }
}
