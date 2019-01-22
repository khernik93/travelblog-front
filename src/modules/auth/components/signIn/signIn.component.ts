import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { TryToSignIn } from '../../store/auth.actions';
import { AuthCredentials } from '../../auth.model';
import { AuthState } from '../../store/auth.reducer';

@Component({
  selector: 'signIn-component',
  styleUrls: ['./signIn.component.scss'],
  templateUrl: './signIn.component.html'
})
export class SignInComponent {

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private store: Store<AuthState>
  ) { }

  signIn() {
    const signInForm = this.signInForm.value;
    const credentials: AuthCredentials = signInForm;
    this.store.dispatch(new TryToSignIn(credentials));
  }

}
