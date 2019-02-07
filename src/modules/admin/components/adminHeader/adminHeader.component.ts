import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducer';
import { SignOut } from '../../../auth/store/auth.actions';

@Component({
  selector: 'adminHeader-component',
  template: `
    <header>
      <div class="tab">
        <a href="#" (click)="signOut()">SIGN OUT</a>
      </div>
      <div class="tab">
        <a [routerLink]="'/'">BACK TO BLOG</a>
      </div>
    </header>
  `,
  styleUrls: ['./adminHeader.component.scss']
})
export class AdminHeaderComponent {

  constructor(
    private store: Store<AuthState>
  ) { }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
