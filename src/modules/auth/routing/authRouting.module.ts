import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from '../auth.component';
import { AuthReversedGuard } from '../guards/authReversed.guard';
import { SignInContainer } from '../containers/signIn/signIn.container';

export const routes: Routes = [
  { 
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthReversedGuard],
    children: [
      { path: '', component: SignInContainer,  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }
