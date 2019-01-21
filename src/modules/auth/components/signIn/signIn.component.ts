import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  signIn() {
    const signInForm = this.signInForm.value;
    const email = signInForm.email;
    const password = signInForm.password;
  }

}
