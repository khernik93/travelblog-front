import { NotificationActions, NotificationActionTypes } from './notification.actions';
import { Notification, NotificationType } from '../notification.model';

export interface NotificationState {
  notification: Notification
}

export const initialState: NotificationState = {
  notification: null
};

export function notificationReducer(state = initialState, action: NotificationActions): NotificationState {
  switch (action.type) {

    case NotificationActionTypes.SetError: {
      return {
        ...state,
        notification: { message: action.message, type: NotificationType.error }
      }
    }

    case NotificationActionTypes.SetSuccess: {
      return {
        ...state,
        notification: { message: action.message, type: NotificationType.success }
      }
    }

    default: {
      return state;
    }
  }
}
