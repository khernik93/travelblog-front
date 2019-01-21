import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminLayoutComponent } from '../../app/components/adminLayout/adminLayout.component';
import { AdminComponent } from '../admin.component';

import { AuthGuard } from '../../auth/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
