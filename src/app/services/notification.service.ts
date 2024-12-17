import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<
    { type: 'success' | 'error'; message: string }[]
  >([]);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  showSuccess(message: string) {
    this.addNotification('success', message);
  }

  showError(message: string) {
    this.addNotification('error', message);
  }

  private addNotification(type: 'success' | 'error', message: string) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([
      ...currentNotifications,
      { type, message },
    ]);

    // Remove the notification after 3 seconds
    setTimeout(() => this.removeNotification({ type, message }), 4000);
  }

  private removeNotification(notification: {
    type: 'success' | 'error';
    message: string;
  }) {
    const currentNotifications = this.notificationsSubject.getValue();
    const filteredNotifications = currentNotifications.filter(
      (n) => n.type !== notification.type || n.message !== notification.message
    );
    this.notificationsSubject.next(filteredNotifications);
  }

  removeNotificationOnClick(notification: {
    type: 'success' | 'error';
    message: string;
  }) {
    this.removeNotification(notification);
  }
}
