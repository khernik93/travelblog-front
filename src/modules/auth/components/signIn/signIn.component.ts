import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthCredentials } from '../../auth.model';

@Component({
  selector: 'signIn-component',
  styleUrls: ['./signIn.component.scss'],
  templateUrl: './signIn.component.html'
})
export class SignInComponent {

  @Output('onFormSubmit') onFormSubmitEmitter = new EventEmitter<AuthCredentials>();

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  signIn() {
    this.onFormSubmitEmitter.emit(this.signInForm.value);
  }

}
