import { NotificationActions, NotificationActionTypes } from './notification.actions';
import { Notification, NotificationType } from './notification.model';

export interface NotificationState {
  notifications: Notification[]
}

export const initialState: NotificationState = {
  notifications: []
};

const createNotification = (notification: Notification, type: NotificationType): any => {
  return { ...notification, type: type };
};

export function notificationReducer(state = initialState, action: NotificationActions): NotificationState {
  switch (action.type) {

    case NotificationActionTypes.SetError: {
      return {
        ...state,
        notifications: [
          ...state.notifications, 
          createNotification(action.notification, NotificationType.error)
        ]
      }
    }

    case NotificationActionTypes.SetSuccess: {
      return {
        ...state,
        notifications: [
          ...state.notifications, 
          createNotification(action.notification, NotificationType.success)
        ]
      }
    }

    case NotificationActionTypes.CloseNotification: {
      return {
        ...state,
        notifications: state.notifications.filter((_: any, i: number) => (
          i !== action.index
        ))
      }
    }

    default: {
      return state;
    }
  }
}
