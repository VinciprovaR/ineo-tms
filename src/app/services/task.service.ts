import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { delay, finalize, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;
  tasks$ = signal<Task[]>([]);
  isLoading$ = signal<boolean>(false);
  private isInitialLoad = true;

  constructor() {
    this.loadTasks();
  }

  /**
   * Loads the list of tasks from the server.
   * Makes an HTTP GET request to fetch tasks and updates the `tasks$` signal.
   */
  loadTasks(): void {
    this.isLoading$.set(true);
    this.http
      .get<Task[]>(this.apiUrl)
      .pipe(
        delay(this.isInitialLoad ? 30 : 0),
        finalize(() => {
          this.isLoading$.set(false);
          this.isInitialLoad = false;
        })
      )
      .subscribe({
        next: (tasks) => this.tasks$.set(tasks),
        error: () =>
          this.notificationService.showError('Failed to load tasks.'),
      });
  }

  /**
   * Adds a new task to the task list.
   * Sends an HTTP POST request to create a new task on the server.
   * After the task is created, it reloads the task list.
   *
   * @param task - The task object to be created.
   */
  addTask(task: Task): void {
    this.isLoading$.set(true);
    this.http
      .post<Task>(this.apiUrl, task)
      .pipe(
        tap(() => {
          this.notificationService.showSuccess(
            `Task '${task.title}' created successfully!`
          );
        }),
        finalize(() => this.isLoading$.set(false))
      )
      .subscribe({
        next: () => this.loadTasks(),
        error: () =>
          this.notificationService.showError(
            `Failed to create task ${task.title}.`
          ),
      });
  }

  /**
   * Updates an existing task.
   * Sends an HTTP PUT request to update the task data on the server.
   * After the update is complete, it reloads the task list.
   *
   * @param task - The task object containing the updated data.
   * @returns An observable of the updated task.
   */
  updateTask(task: Task): void {
    this.isLoading$.set(true);
    this.http
      .put<Task>(`${this.apiUrl}/${task.id}`, task)
      .pipe(
        tap(() => {
          this.notificationService.showSuccess(
            `Task '${task.title}' updated successfully!`
          );
          this.router.navigate(['/home']); // Redirezione alla home
        }),
        finalize(() => this.isLoading$.set(false))
      )
      .subscribe({
        next: () => this.loadTasks(),
        error: () =>
          this.notificationService.showError(
            `Failed to update task ${task.title}.`
          ),
      });
  }

  /**
   * Deletes a task from the server.
   * Sends an HTTP DELETE request to remove the task by its ID.
   * After the task is deleted, it reloads the task list.
   *
   * @param task - The task object containing the updated data.
   */
  deleteTask(task: Task): void {
    this.isLoading$.set(true);
    this.http
      .delete<void>(`${this.apiUrl}/${task.id}`)
      .pipe(
        tap(() => {
          this.notificationService.showSuccess(
            `Task '${task.title}' deleted successfully!`
          );
          this.router.navigate(['/home']);
        }),
        finalize(() => this.isLoading$.set(false))
      )
      .subscribe({
        next: () => this.loadTasks(),
        error: () =>
          this.notificationService.showError(
            `Failed to delete task '${task.title}'.`
          ),
      });
  }
}
