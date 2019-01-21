import { notificationReducer, initialState } from '../../../../src/modules/app/components/notification/notification.reducer';
import * as notificationActions from '../../../../src/modules/app/components/notification/notification.actions';
import { Notification, NotificationType } from '../../../../src/modules/app/components/notification/notification.model';

const SAMPLE_NOTIFICATION: Notification = {message: 'sample message'};

const SAMPLE_MULTIPLE_NOTIFICATIONS: Notification[] = [
  { message: 'aaa', type: NotificationType.error },
  { message: 'bbb', type: NotificationType.success }
];

const assertNotification = (action: any, type: NotificationType): void => {
  const result = notificationReducer(initialState, action);
  expect(result).toEqual({
    ...initialState,
    notifications: [{ ...SAMPLE_NOTIFICATION, type: type }]
  });
};

describe('NotificationReducer', () => {

  it(`
    WHEN SetError action is dispatched with notification
    THEN the notification with error type is stored in the store
  `, () => {
    const action = new notificationActions.SetError(SAMPLE_NOTIFICATION);
    assertNotification(action, NotificationType.error);
  });

  it(`
    WHEN SetSuccess action is dispatched with notification
    THEN the notification with success type is stored in the store
  `, () => {  
    const action = new notificationActions.SetSuccess(SAMPLE_NOTIFICATION);
    assertNotification(action, NotificationType.success);
  });

  it(`
    WHEN CloseNotification action is dispatched with notification index
    THEN zero tabs should be present in the store
    AND selected tab value in the store should be reset
  `, () => {
    const stateWithMultipleNotifications = {
      ...initialState,
      notifications: SAMPLE_MULTIPLE_NOTIFICATIONS
    };
    const action = new notificationActions.CloseNotification(0);
    const result = notificationReducer(stateWithMultipleNotifications, action);
    expect(result).toEqual({
      ...initialState,
      notifications: [stateWithMultipleNotifications.notifications[1]]
    });
  });

});
