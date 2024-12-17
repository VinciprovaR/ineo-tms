import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  notifications: { type: 'success' | 'error'; message: string }[] = [];
  private readonly notificationService = inject(NotificationService);

  constructor() {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  removeNotification(notification: {
    type: 'success' | 'error';
    message: string;
  }) {
    this.notificationService.removeNotificationOnClick(notification);
  }
}
