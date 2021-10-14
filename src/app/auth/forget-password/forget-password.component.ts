import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/model/req/login-request.model';
import { AuthenticationService } from 'src/app/core/service/authetication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm!: FormGroup;
  error = "";
  email!: string;
  returnUrl!:string;
  constructor(    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }
  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ["", Validators.required]
        });
    this.returnUrl =  "/change-password";
  }
  onSubmit() {
    this.email = this.forgetPasswordForm.controls.email.value;
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    this.authenticationService
      .forgetPassword(this.email)
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.forgetPasswordForm.reset();
          this.error = "Something went wrong!";
        }
      );
  }
}
