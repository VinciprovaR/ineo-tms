import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isTaskFormOpen = signal<boolean>(false);

  toggleTaskForm(): void {
    this.isTaskFormOpen.set(!this.isTaskFormOpen());
  }

  onTaskFormSubmit(task: any): void {
    this.toggleTaskForm();
  }
}
