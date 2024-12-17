// loading-bar.component.ts
import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.css',
})
export class LoadingBarComponent {
  private taskService = inject(TaskService);
  isLoading$ = this.taskService.isLoading$;
  constructor() {}
}
