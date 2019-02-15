import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.reducers';
import { Notification } from './notification.model';
import { selectNotification } from './store/notification.selectors';

@Component({
  selector: 'notification-container',
  template: `
    <notification-component [notification$]="notification$"></notification-component>
  `
})
export class NotificationContainer {

  notification$: Observable<Notification>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.notification$ = this.store.select(selectNotification);
  }

}
