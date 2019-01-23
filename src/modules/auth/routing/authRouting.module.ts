import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from '../auth.component';
import { SignInComponent } from '../components/signIn/signIn.component';
import { AuthReversedGuard } from '../guards/authReversed.guard';

export const routes: Routes = [
  { 
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthReversedGuard],
    children: [
      { path: '', component: SignInComponent,  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }
