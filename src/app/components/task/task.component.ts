import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, FormatStatusPipe],
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();

  isEditing: boolean = false;
  editableTask!: Task;
  statuses = Object.values(TaskStatus);

  /**
   * Enables edit mode for the task.
   */
  enableEdit(): void {
    this.isEditing = true;
    this.editableTask = { ...this.task };
  }

  /**
   * Saves the edited task and emits the update event.
   */
  saveEdit(): void {
    if (this.isValidTitle() && this.isValidSummary()) {
      this.update.emit(this.editableTask);
      this.isEditing = false;
    }
  }

  /**
   * Cancels the edit mode and restores the original task values.
   */
  cancelEdit(): void {
    this.isEditing = false;
  }

  /**
   * Emits a delete event for the current task.
   */
  deleteTask(): void {
    this.delete.emit(this.task);
  }

  /**
   * Validates the task title.
   * @returns true if the title is valid
   */
  isValidTitle(): boolean {
    return (
      this.editableTask?.title?.length >= 3 &&
      this.editableTask?.title?.length <= 50
    );
  }

  /**
   * Validates the task summary.
   * @returns true if the summary is valid
   */
  isValidSummary(): boolean {
    return (
      this.editableTask?.summary?.length >= 5 &&
      this.editableTask?.summary?.length <= 80
    );
  }
}
