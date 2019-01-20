import { NotificationActions, NotificationActionTypes } from './notification.actions';
import { Notification, NotificationType } from './notification.model';

export interface NotificationState {
  notifications: Notification[]
}

export const initialState: NotificationState = {
  notifications: []
};

export function notificationReducer(state = initialState, action: NotificationActions): NotificationState {
  switch (action.type) {

    case NotificationActionTypes.SetError: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
            type: NotificationType.error
          }
        ]
      }
    }

    case NotificationActionTypes.SetSuccess: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
            type: NotificationType.success
          }
        ]
      }
    }

    default: {
      return state;
    }
  }
}