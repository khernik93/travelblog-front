import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';
import { SignOut } from '../../store/auth.actions';

@Component({
  selector: 'signOut-component',
  styleUrls: ['./signOut.component.scss'],
  template: '<a href="#" (click)="signOut()">SIGN OUT</a>'
})
export class SignOutComponent {

  constructor(
    private store: Store<AuthState>
  ) { }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
