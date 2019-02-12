export type Notification = {
  message: string,
  type: NotificationType
};

export enum NotificationType {
  error = 'error',
  success = 'success'
};
