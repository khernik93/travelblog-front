import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../app.reducers';
import { Notification } from './notification.model';
import { selectNotifications } from './notification.selectors';

@Component({
  selector: 'notification-component',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {

  notifications$: Observable<Notification[]>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.notifications$ = this.store.select(selectNotifications);
  }

  getBackgroundColor() {
    
  }

}
