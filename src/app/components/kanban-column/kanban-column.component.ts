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

  /**
   * Handles the drag-and-drop action for tasks within and between columns.
   * @param event - The drag and drop event containing information about the source and destination of the task.
   */
  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
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
   * Adds the 'is-dragging' class to the body when dragging starts.
   */
  onDragStarted(): void {
    document.body.classList.add('is-dragging');
  }

  /**
   * Removes the 'is-dragging' class from the body when dragging ends.
   */
  onDragEnded(): void {
    document.body.classList.remove('is-dragging');
  }

  /**
   * Emits a delete event for the specified task.
   * @param id - The ID of the task to be deleted.
   */
  deleteTask(id: number): void {
    this.taskDeleted.emit(id);
  }

  /**
   * Emits an update event for the specified task.
   * @param task - The task to be updated.
   */
  updateTask(task: Task): void {
    this.taskUpdated.emit(task);
  }
}
