import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Task>();

  isEditing: boolean = false;
  editableTask!: Task;
  statuses = Object.values(TaskStatus);

  enableEdit(): void {
    this.isEditing = true;
    this.editableTask = { ...this.task };
  }

  saveEdit(): void {
    this.update.emit(this.editableTask);
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  deleteTask(): void {
    this.delete.emit(this.task.id);
  }
}
