import { Component, computed, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus, TaskStatusClass } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);

  // Tasks divise per stato
  tasks$ = this.taskService.tasks$;
  statuses = Object.values(TaskStatus);

  totalTasks = computed(() => this.tasks$().length); // Numero totale di task
  tasksByStatus = computed(() => this.getTasksByStatus()); // Task divise per stato

  // Statistiche derivate per ciascuno stato in modo dinamico
  statusCounts = computed(() =>
    this.statuses.map((status) => ({
      status,
      count: this.getTaskCountByStatus(status),
    }))
  );

  constructor() {}

  ngOnInit(): void {}

  /**
   * Conta quante task ci sono per ogni stato.
   */
  getTasksByStatus() {
    const tasksByStatus: Record<string, number> = {};
    this.tasks$().forEach((task) => {
      tasksByStatus[task.status] = (tasksByStatus[task.status] || 0) + 1;
    });
    return tasksByStatus;
  }

  /**
   * Ritorna il conteggio delle task per uno specifico stato.
   */
  getTaskCountByStatus(status: TaskStatus) {
    return this.tasks$().filter((task) => task.status === status).length;
  }

  /**
   * Ottiene la percentuale di completamento delle task.
   */
  getCompletionPercentage() {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return ((this.getTaskCountByStatus(TaskStatus.DONE) / total) * 100).toFixed(
      2
    );
  }
}
