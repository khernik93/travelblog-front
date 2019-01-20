import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/app/app.module';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { AppState } from '../../../../../src/modules/app/app.reducers';
import { NotificationComponent } from '../../../../../src/modules/app/components/notification/notification.component';
import notificationState from './helpers/notification.state';
import * as notificationActions from '../../../../../src/modules/app/components/notification/notification.actions';

describe('NotificationComponent', () => {

  let store: MockStore<AppState>;

  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {

    store = SharedStubs.getMockStoreStub<AppState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    store.setState(notificationState);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN all notifications should be shown
  `, () => {
    const notifications = fixture.debugElement.queryAll(By.css('.notification'));
    expect(notifications.length).toBe(3);
  });

  it(`
    WHEN the component is loaded
    THEN all notifications should be shown
  `, () => {
    const secondCross = fixture.nativeElement.querySelector('.notification:nth-child(2) .notification-cross');
    secondCross.click();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new notificationActions.CloseNotification(1));
  });

});
