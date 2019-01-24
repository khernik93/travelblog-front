import cloneDeep from 'lodash-es/cloneDeep';

import { notificationReducer, initialState } from '../../../../src/modules/app/components/notification/store/notification.reducer';
import * as notificationActions from '../../../../src/modules/app/components/notification/store/notification.actions';
import { Notification, NotificationType } from '../../../../src/modules/app/components/notification/notification.model';
import { NotificationState } from './helpers/notification.state';

describe('NotificationReducer', () => {

  let ClonedNotificationState: typeof NotificationState;

  beforeEach(() => {
    ClonedNotificationState = cloneDeep(NotificationState);
  });

  it(`
    WHEN SetError action is dispatched with notification
    THEN the notification with error type is stored in the store
  `, () => {
    const action = new notificationActions.SetError('sample-message');
    Helper.assertNotification(action, {
      type: NotificationType.error,
      message: 'sample-message'
    });
  });

  it(`
    WHEN SetError action is dispatched with notification
    THEN the notification with error type is stored in the store
  `, () => {
    const action = new notificationActions.SetSuccess('sample-message');
    Helper.assertNotification(action, {
      type: NotificationType.success, 
      message: 'sample-message'
    });
  });

  it(`
    WHEN CloseNotification action is dispatched with notification index
    THEN zero tabs should be present in the store
    AND selected tab value in the store should be reset
  `, () => {
    const action = new notificationActions.CloseNotification(0);
    const newInitialState = ClonedNotificationState.notification;
    const result = notificationReducer(newInitialState, action);
    expect(result).toEqual({
      ...initialState,
      notifications: newInitialState.notifications.slice(1)
    });
  });

  class Helper {

    static assertNotification (action: any, expectedNotification: Notification): void {
      const result = notificationReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        notifications: [expectedNotification]
      });
    };

  }

});
