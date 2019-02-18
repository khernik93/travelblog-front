import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducer';
import { SignOut } from '../../../auth/store/auth.actions';

@Component({
  selector: 'adminHeader-container',
  template: `
    <adminHeader-component (onSignOut)="signOut()">
    </adminHeader-component>
  `
})
export class AdminHeaderContainer {

  constructor(
    private store: Store<AuthState>
  ) { }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
