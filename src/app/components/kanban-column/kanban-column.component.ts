import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskComponent } from '../task/task.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    DragDropModule,
    SkeletonLoaderComponent,
  ],
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.css'],
})
export class KanbanColumnComponent {
  @Input() status!: string;
  @Input() tasks: Task[] = [];
  @Input() connectedLists: string[] = [];
  @Input() isCollapsed = false;
  @Input() isLoading = false;

  @Output() taskMoved = new EventEmitter<{
    task: Task;
    newStatus: TaskStatus;
  }>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<Task>();

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return; // Se la posizione è la stessa, non fare nulla
    }

    if (event.previousContainer === event.container) {
      // Spostamento nella stessa lista
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Spostamento in una lista diversa
      const task = event.previousContainer.data[event.previousIndex];
      task.status = this.status as TaskStatus;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.taskMoved.emit({ task, newStatus: this.status as TaskStatus });
    }
  }

  /**
   * Aggiunge la classe is-dragging al body quando il drag inizia
   */
  onDragStarted(): void {
    document.body.classList.add('is-dragging');
  }

  /**
   * Rimuove la classe is-dragging dal body quando il drag termina
   */
  onDragEnded(): void {
    document.body.classList.remove('is-dragging');
  }

  deleteTask(id: number): void {
    this.taskDeleted.emit(id);
  }

  updateTask(task: Task): void {
    this.taskUpdated.emit(task);
  }
}
