import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/app.reducers';
import { Notification } from './notification.model';
import { selectNotification } from './store/notification.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'notification-component',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  @ViewChild('notification') el: ElementRef;
  notification$: Observable<Notification>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.notification$ = this.store.select(selectNotification);
  }

  ngOnInit() {
    this.notification$
      .pipe(
        filter((notification: Notification) => !!notification && !!this.el)
      )
      .subscribe(() => {
        this.el.nativeElement.style.animation = 'none';
        this.el.nativeElement.offsetHeight;
        this.el.nativeElement.style.animation = null;
      });
  }

}
