import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
 // { path: '', component: HomeComponent },
/*   { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'vehicle/list', component: VehicleListComponent },
  { path: 'application/list', component: ApplicationListComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', component: PageNotFoundComponent }, */
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/components/component.module').then((module) => module.ComponentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
