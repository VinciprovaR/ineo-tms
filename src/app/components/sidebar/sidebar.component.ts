import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isTaskFormOpen$ = signal<boolean>(false);

  /**
   * Toggles the visibility of the task form.
   */
  toggleTaskForm(): void {
    this.isTaskFormOpen$.set(!this.isTaskFormOpen$());
  }

  /**
   * Handles the submission of the task form and closes it.
   * @param task - The task data submitted from the form
   */
  onTaskFormSubmit(task: any): void {
    this.toggleTaskForm();
  }
}
