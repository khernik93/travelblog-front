import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'adminHeader-component',
  templateUrl: 'adminHeader.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class AdminHeaderComponent {

  @Output('onSignOut') signOutEmitter = new EventEmitter<void>();

  routes: any = {
    home: '/'
  };

  logout() {
    this.signOutEmitter.emit();
  }

}
