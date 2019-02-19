import { Component, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../../containers/notification/notification.model';
import { takeUntil, filter } from 'rxjs/operators';

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
export class NotificationComponent implements OnInit, OnDestroy {

  @ViewChild('notification') el: ElementRef;
  @Input() notification$: Observable<Notification>;

  private destroy$ = new Subject();

  ngOnInit() {
    this.notification$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !!this.el)
      )
      .subscribe(() => this.restartAnimation());
  }

  private restartAnimation() {
    this.el.nativeElement.style.animation = 'none';
    this.el.nativeElement.offsetHeight;
    this.el.nativeElement.style.animation = null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
