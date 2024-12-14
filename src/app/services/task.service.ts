import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  // Signal che contiene la lista di task
  tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks(); // Carica i task all'avvio
  }

  // Carica i task dal server
  loadTasks(): void {
    this.http
      .get<Task[]>(this.apiUrl)
      .subscribe((tasks) => this.tasks.set(tasks));
  }

  addTask(task: Task): void {
    this.http.post<Task>(this.apiUrl, task).subscribe(() => {
      this.loadTasks();
    });
  }

  updateTask(task: Task): void {
    this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadTasks();
    });
  }
}
