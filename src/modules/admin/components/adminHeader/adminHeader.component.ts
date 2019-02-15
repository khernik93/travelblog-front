import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'adminHeader-component',
  template: `
    <header>
      <div class="tab">
        <a href="#" (click)="signOut()">SIGN OUT</a>
      </div>
      <div class="tab">
        <a (click)="goBack()">BACK TO BLOG</a>
      </div>
    </header>
  `,
  styleUrls: ['./adminHeader.component.scss']
})
export class AdminHeaderComponent {

  @Output('onGoBack') goBackEmitter = new EventEmitter<void>();
  @Output('onSignOut') signOutEmitter = new EventEmitter<void>();

  goBack() {
    this.goBackEmitter.emit();
  }

  signOut() {
    this.signOutEmitter.emit();
  }

}
