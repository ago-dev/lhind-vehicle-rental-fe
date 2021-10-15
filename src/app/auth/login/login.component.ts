import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/model/req/login-request.model';
import { AuthenticationService } from 'src/app/core/service/authetication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  error = "";
  loginReq!: LoginRequest;
  returnUrl!:string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }
  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/home";
  }
  onSubmit() {
    console.log(this.loginForm.invalid);
    this.loginReq = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.loginReq)
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.loginForm.reset();
          this.error = "Authentification failed! Wrong username or password. Please try again!";
        }
      );
  }
}
