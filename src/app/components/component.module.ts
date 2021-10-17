import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from '../core/core.module';
import { HeaderComponent } from '../layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ApplicationDialogComponent } from './application-dialog/application-dialog.component';
import { LoginComponent } from '../auth/login/login.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { PageNotFoundComponent } from '../layout/page-not-found/page-not-found.component';
import { PendingApplicationsListComponent } from './pending-applications-list/pending-applications-list.component';
import { SideNavComponent } from '../layout/side-nav/side-nav.component';
import { UserAddEditDialogComponent } from './user-add-edit-dialog/user-add-edit-dialog.component';
import { UserListComponent } from './user-list/user-list.component';
import { VehicleCategoryListComponent } from './vehicle-category-list/vehicle-category-list.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../auth/interceptor/jwt.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vehicle/list', component: VehicleListComponent },
  { path: 'application/list', component: ApplicationListComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    VehicleCategoryListComponent,
    VehicleListComponent,
    ApplicationDialogComponent,
    ApplicationListComponent,
    ConfirmDialogComponent,
    AdminDashboardComponent,
    UserAddEditDialogComponent,
    UserListComponent,
    PendingApplicationsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    LayoutModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeComponent,
    VehicleCategoryListComponent,
    VehicleListComponent,
    ApplicationDialogComponent,
    ApplicationListComponent,
    ConfirmDialogComponent,
    AdminDashboardComponent,
    UserAddEditDialogComponent,
    UserListComponent,
    PendingApplicationsListComponent,
  ],
  providers: [
    CoreModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class ComponentModule {}
