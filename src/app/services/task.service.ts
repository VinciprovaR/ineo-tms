import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { delay, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/tasks'; //to-do refractor token e cambiare host
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
        delay(this.isInitialLoad ? 3000 : 0),
        finalize(() => {
          this.isLoading$.set(false);
          this.isInitialLoad = false;
        })
      )
      .subscribe((tasks) => this.tasks$.set(tasks));
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
      .pipe(finalize(() => this.isLoading$.set(false)))
      .subscribe(() => {
        this.loadTasks();
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
  updateTask(task: Task): Observable<Task> {
    this.isLoading$.set(true);
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      tap(() => this.loadTasks()),
      finalize(() => this.isLoading$.set(false))
    );
  }

  /**
   * Deletes a task from the server.
   * Sends an HTTP DELETE request to remove the task by its ID.
   * After the task is deleted, it reloads the task list.
   *
   * @param id - The unique identifier of the task to delete.
   */
  deleteTask(id: number): void {
    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.isLoading$.set(false)))
      .subscribe(() => {
        this.loadTasks();
      });
  }
}
