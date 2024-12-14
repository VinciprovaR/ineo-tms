import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/task-status.enum';
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

  // Abilita la modalità modifica
  enableEdit(): void {
    this.isEditing = true;
    this.editableTask = { ...this.task }; // Crea una copia del task per non modificarlo direttamente
  }

  // Salva le modifiche
  saveEdit(): void {
    this.update.emit(this.editableTask);
    this.isEditing = false;
  }

  // Annulla le modifiche
  cancelEdit(): void {
    this.isEditing = false;
  }

  // Elimina il task
  deleteTask(): void {
    this.delete.emit(this.task.id);
  }
}
