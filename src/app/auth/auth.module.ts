import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: "",
    redirectTo:"login",
    pathMatch:"full"
    
  },
    {
    path: "login",
    component: LoginComponent,
    data: { title: "login" }, 
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent,
    data: { title: "forget-password" }, 
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    data: { title: "change-password" }, 
  },
];

@NgModule({
  declarations: [LoginComponent,ForgetPasswordComponent,ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent,ForgetPasswordComponent,ChangePasswordComponent],
  providers:[CoreModule]
})
export class AuthModule {}
