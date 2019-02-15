import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducer';
import { SignOut } from '../../../auth/store/auth.actions';
import { PreviousRouteService } from '../../../../shared/services/previousRoute.service';

@Component({
  selector: 'adminHeader-container',
  template: `
    <adminHeader-component (onGoBack)="goBack()"
                           (onSignOut)="signOut()">
    </adminHeader-component>
  `
})
export class AdminHeaderContainer {

  constructor(
    private store: Store<AuthState>,
    private previousRouteService: PreviousRouteService
  ) { }

  goBack() {
    this.previousRouteService.goBack();
  }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
