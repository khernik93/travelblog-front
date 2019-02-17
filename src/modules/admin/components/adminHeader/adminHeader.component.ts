import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'adminHeader-component',
  templateUrl: 'adminHeader.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class AdminHeaderComponent {

  @Output('onGoBack') goBackEmitter = new EventEmitter<void>();
  @Output('onSignOut') signOutEmitter = new EventEmitter<void>();

  goBack() {
    this.goBackEmitter.emit();
  }

  logout() {
    this.signOutEmitter.emit();
  }

}
