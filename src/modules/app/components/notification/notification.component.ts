import { Component, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../containers/notification/notification.model';

@Component({
  selector: 'notification-component',
  styleUrls: ['./notification.component.scss'],
  template: `
    <div [class]="'notify bar-top do-show type-' + (notification$ | async).type" 
         *ngIf="notification$ | async"
         #notification>
      {{ (notification$ | async).message }}
    </div>
  `
})
export class NotificationComponent implements OnChanges {

  @ViewChild('notification') el: ElementRef;
  @Input() notification$: Observable<Notification>;

  ngOnChanges() {
    if (this.el) {
      this.el.nativeElement.style.animation = 'none';
      this.el.nativeElement.offsetHeight;
      this.el.nativeElement.style.animation = null;
    }
  }

}
