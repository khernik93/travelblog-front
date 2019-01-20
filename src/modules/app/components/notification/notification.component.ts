import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import { Notification } from './notification.model';
import { selectNotifications } from './notification.selectors';
import { CloseNotification } from './notification.actions';
import { fadeToggle } from '../../../../shared/animations';

@Component({
  selector: 'notification-component',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html',
  animations: [fadeToggle]
})
export class NotificationComponent {

  notifications$: Observable<Notification[]>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.notifications$ = this.store.select(selectNotifications);
  }

  closeNotification(index: number): void {
    this.store.dispatch(new CloseNotification(index));
  }

}
