import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';
import { SignOut } from '../../store/auth.actions';

@Component({
  selector: 'signOut-component',
  template: '<a href="#" (click)="signOut()">Sign out</a>'
})
export class SignOutComponent {

  constructor(
    private store: Store<AuthState>
  ) { }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
