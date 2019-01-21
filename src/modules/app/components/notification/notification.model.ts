export type Notification = {
  message: string,
  type?: NotificationType
};

export enum NotificationType {
  error = 'red',
  success = 'green'
};
