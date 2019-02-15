import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TryToSignIn } from '../../store/auth.actions';
import { AuthCredentials } from '../../auth.model';
import { AuthState } from '../../store/auth.reducer';

@Component({
  selector: 'signIn-container',
  template: `
    <signIn-component (onFormSubmit)="signIn($event)"></signIn-component>
  `
})
export class SignInContainer {

  constructor(
    private store: Store<AuthState>
  ) { }

  signIn(authCredentials: AuthCredentials) {
    this.store.dispatch(new TryToSignIn(authCredentials));
  }

}
