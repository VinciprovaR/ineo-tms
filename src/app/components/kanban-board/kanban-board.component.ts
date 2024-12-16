import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus, TaskStatusClass } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FilterComponent } from '../filter/filter.component';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterComponent,
    DragDropModule,
    KanbanColumnComponent,
    FormatStatusPipe,
  ],
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  isLoading$ = this.taskService.isLoading$;
  statuses = Object.values(TaskStatus);
  filterQuery = signal<string>('');
  sortKey = signal<string>('title');
  sortDirection = signal<'asc' | 'desc'>('asc');
  collapsedColumns: { [key: string]: boolean } = {};

  tasksByStatus = computed(() =>
    this.statuses.map((status) => ({
      status,
      tasks: this.taskService.tasks$().filter((task) => task.status === status),
    }))
  );

  connectedLists = this.statuses.map((status) => `kanban-column-${status}`);

  constructor() {}

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      console.log('Task updated successfully');
    });
  }

  filterAndSortTasks(tasks: Task[]): Task[] {
    return tasks
      .filter((task) => this.filterTask(task))
      .sort((a, b) => this.sortTasks(a, b));
  }

  filterTask(task: Task): boolean {
    const query = this.filterQuery().toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query)
    );
  }

  sortTasks(a: Task, b: Task): number {
    const key = this.sortKey() as keyof Task;
    const valueA = a[key] ? a[key]!.toString().toLowerCase() : '';
    const valueB = b[key] ? b[key]!.toString().toLowerCase() : '';
    const order = this.sortDirection() === 'asc' ? 1 : -1;

    if (valueA < valueB) return -1 * order;
    if (valueA > valueB) return 1 * order;
    return 0;
  }

  onFilterQueryChange(query: string): void {
    this.filterQuery.set(query);
  }

  onSortKeyChange(key: string): void {
    this.sortKey.set(key);
  }

  onSortDirectionChange(direction: 'asc' | 'desc'): void {
    this.sortDirection.set(direction);
  }

  toggleCollapse(status: string) {
    this.collapsedColumns[status] = !this.collapsedColumns[status];
  }

  isCollapsed(status: string): boolean {
    return this.collapsedColumns[status] || false;
  }

  getColumnHeaderColor(status: string): string {
    return TaskStatusClass[status] || 'bg-gray-500';
  }
}
