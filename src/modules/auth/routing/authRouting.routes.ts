import { Routes } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { AuthReversedGuard } from '../guards/authReversed.guard';
import { SignInContainer } from '../containers/signIn/signIn.container';

export const authRoutesTree: Routes = [
  { 
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthReversedGuard],
    children: [
      { path: '', component: SignInContainer,  }
    ]
  }
];
