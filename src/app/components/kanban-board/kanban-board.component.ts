import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus, TaskStatusClass } from '../../models/task.model';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';
import { TaskService } from '../../services/task.service';
import { FilterComponent } from '../filter/filter.component';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';

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

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete.
   */
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  /**
   * Updates the specified task.
   * @param updatedTask - The updated task data.
   */
  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      console.log('Task updated successfully');
    });
  }

  /**
   * Filters and sorts the given list of tasks.
   * @param tasks - The list of tasks to filter and sort.
   * @returns A filtered and sorted array of tasks.
   */
  filterAndSortTasks(tasks: Task[]): Task[] {
    return tasks
      .filter((task) => this.filterTask(task))
      .sort((a, b) => this.sortTasks(a, b));
  }

  /**
   * Checks if a task matches the filter query.
   * @param task - The task to check against the filter.
   * @returns true if the task matches the filter query.
   */
  filterTask(task: Task): boolean {
    const query = this.filterQuery().toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query)
    );
  }

  /**
   * Sorts two tasks based on the current sort key and direction.
   * @param a - The first task to compare.
   * @param b - The second task to compare.
   * @returns A number indicating the sort order.
   */
  sortTasks(a: Task, b: Task): number {
    const key = this.sortKey() as keyof Task;
    const valueA = a[key] ? a[key]!.toString().toLowerCase() : '';
    const valueB = b[key] ? b[key]!.toString().toLowerCase() : '';
    const order = this.sortDirection() === 'asc' ? 1 : -1;

    if (valueA < valueB) return -1 * order;
    if (valueA > valueB) return 1 * order;
    return 0;
  }

  /**
   * Updates the filter query.
   * @param query - The new filter query.
   */
  onFilterQueryChange(query: string): void {
    this.filterQuery.set(query);
  }

  /**
   * Updates the sort key for sorting tasks.
   * @param key - The new sort key.
   */
  onSortKeyChange(key: string): void {
    this.sortKey.set(key);
  }

  /**
   * Updates the sort direction for sorting tasks.
   * @param direction - The new sort direction ('asc' or 'desc').
   */
  onSortDirectionChange(direction: 'asc' | 'desc'): void {
    this.sortDirection.set(direction);
  }

  /**
   * Toggles the collapse state of the specified column.
   * @param status - The status of the column to collapse or expand.
   */
  toggleCollapse(status: string): void {
    this.collapsedColumns[status] = !this.collapsedColumns[status];
  }

  /**
   * Checks if the specified column is collapsed.
   * @param status - The status of the column to check.
   * @returns true if the column is collapsed.
   */
  isCollapsed(status: string): boolean {
    return this.collapsedColumns[status] || false;
  }

  /**
   * Gets the header color for a given task status.
   * @param status - The status of the task.
   * @returns The CSS class for the header color.
   */
  getColumnHeaderColor(status: string): string {
    return TaskStatusClass[status] || 'bg-gray-500';
  }
}
