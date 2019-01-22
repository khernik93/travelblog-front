import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.reducers';
import { Notification } from './notification.model';
import { selectNotifications } from './store/notification.selectors';
import { CloseNotification } from './store/notification.actions';
import { fadeToggle } from '../../../../shared/animations';
import { map } from 'rxjs/operators';

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

  areNotificationsActive(): Observable<boolean> {
    return this.notifications$
      .pipe(
        map((notifications: Notification[]) => {
          return !!(notifications && notifications.length);
        })
      );
  }

}
