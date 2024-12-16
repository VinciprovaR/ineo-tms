import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { TaskStatus, TaskStatusClass } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  providers: [FormatStatusPipe],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private formatStatusPipe = inject(FormatStatusPipe);

  // Tasks divise per stato
  tasks$ = this.taskService.tasks$;
  statuses = Object.values(TaskStatus);
  totalTasks = computed(() => this.tasks$().length);
  tasksByStatus = computed(() => this.getTasksByStatus());

  // Statistiche derivate per ciascuno stato in modo dinamico
  statusCounts = computed(() =>
    this.statuses.map((status) => ({
      status,
      class: TaskStatusClass[status],
      count: this.getTaskCountByStatus(status),
    }))
  );

  // Dati per i grafici
  pieChartData: any[] = [];
  barChartData: any[] = [];

  constructor() {
    effect(() => {
      this.prepareChartData();
    });
  }

  ngOnInit(): void {
    this.prepareChartData();
  }

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

  prepareChartData() {
    const tasksByStatus = this.getTasksByStatus();

    this.pieChartData = Object.keys(tasksByStatus).map((status) => ({
      name: this.formatStatusPipe.transform(status),
      value: tasksByStatus[status],
    }));

    this.barChartData = Object.keys(tasksByStatus).map((status) => ({
      name: this.formatStatusPipe.transform(status),
      value: tasksByStatus[status],
    }));
  }

  getChartWidth(): number {
    return Math.min(window.innerWidth * 0.95, 1280);
  }

  getChartHeight(): number {
    return this.getChartWidth() * 0.5625; // Rapporto 16:9
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {}
}
