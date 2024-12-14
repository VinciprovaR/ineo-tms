import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStatus } from '../../models/task-status.enum';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FilterComponent } from '../filter/filter.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    FormsModule,
    FilterComponent,
    SkeletonLoaderComponent,
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

  tasksByStatus = computed(() =>
    this.statuses.map((status) => ({
      status,
      tasks: this.taskService.tasks$().filter((task) => task.status === status),
    }))
  );

  constructor() {}

  /**
   * Deletes a task by its ID.
   * Calls the TaskService to remove a task from the list of tasks.
   *
   * @param id - The unique identifier of the task to delete.
   */
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  /**
   * Updates a task with new data.
   * Calls the TaskService to update an existing task.
   *
   * @param updatedTask - The updated task object with new data.
   */
  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      console.log('Task updated successfully');
    });
  }

  /**
   * Filters and sorts the list of tasks displayed on the Kanban board.
   * The function filters tasks based on the filter query and then sorts them
   * based on the selected sort key and direction.
   *
   * @param tasks - The list of tasks to be filtered and sorted.
   * @returns A filtered and sorted array of tasks.
   */
  filterAndSortTasks(tasks: Task[]): Task[] {
    return tasks
      .filter((task) => this.filterTask(task))
      .sort((a, b) => this.sortTasks(a, b));
  }

  /**
   * Filters a single task based on the current filter query.
   * The task matches if its title, description, or status contains the filter query.
   *
   * @param task - The task to check against the filter query.
   * @returns True if the task matches the filter query, otherwise false.
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
   * Sorts two tasks based on the selected sort key and direction.
   * The sort key determines which property to compare (e.g., title, description, status).
   * The sort direction can be 'asc' for ascending or 'desc' for descending.
   *
   * @param a - The first task to compare.
   * @param b - The second task to compare.
   * @returns A sorting order value: -1 if a < b, 1 if a > b, 0 if a === b.
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
   * Updates the current filter query with a new query string.
   * Triggered when the user updates the input for the task filter.
   *
   * @param query - The new filter query string.
   */
  onFilterQueryChange(query: string): void {
    this.filterQuery.set(query);
  }

  /**
   * Updates the current sort key with a new key.
   * Triggered when the user selects a new key to sort tasks.
   *
   * @param key - The new sort key (e.g., title, description, status).
   */
  onSortKeyChange(key: string): void {
    this.sortKey.set(key);
  }

  /**
   * Updates the current sort direction with a new direction.
   * Triggered when the user toggles the sort direction (ascending/descending).
   *
   * @param direction - The new sort direction ('asc' for ascending, 'desc' for descending).
   */
  onSortDirectionChange(direction: 'asc' | 'desc'): void {
    this.sortDirection.set(direction);
  }
}
