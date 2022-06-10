import { INotification } from './INotification';

export interface INotifyMethod {
  (notification: INotification): void;
}
