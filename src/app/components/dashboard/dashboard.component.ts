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
import { customColorsCharts } from '../../models/task.model';

@Component({
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormatStatusPipe],
  providers: [FormatStatusPipe],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private formatStatusPipe = inject(FormatStatusPipe);
  customColorsCharts = customColorsCharts;
  tasks$ = this.taskService.tasks$;
  statuses = Object.values(TaskStatus);
  totalTasks = computed(() => this.tasks$().length);
  tasksByStatus = computed(() => this.getTasksByStatus());
  statusOrder = ['To Do', 'In Progress', 'In Testing', 'Done'];

  statusCounts = computed(() =>
    this.statuses.map((status) => ({
      status,
      class: TaskStatusClass[status],
      count: this.getTaskCountByStatus(status),
    }))
  );

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
   * Counts how many tasks exist for each status.
   * @returns An object with task counts per status.
   */
  getTasksByStatus() {
    const tasksByStatus: Record<string, number> = {};
    this.tasks$().forEach((task) => {
      tasksByStatus[task.status] = (tasksByStatus[task.status] || 0) + 1;
    });
    return tasksByStatus;
  }

  /**
   * Returns the count of tasks for a specific status.
   * @param status - The status to count tasks for.
   * @returns The number of tasks for the given status.
   */
  getTaskCountByStatus(status: TaskStatus) {
    return this.tasks$().filter((task) => task.status === status).length;
  }

  /**
   * Calculates the completion percentage of tasks.
   * @returns The percentage of tasks completed.
   */
  getCompletionPercentage() {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return ((this.getTaskCountByStatus(TaskStatus.DONE) / total) * 100).toFixed(
      2
    );
  }

  /**
   * Prepares the chart data based on tasks by status.
   */
  prepareChartData() {
    const tasksByStatus = this.getTasksByStatus();
    this.barChartData = Object.keys(tasksByStatus)
      .map((status) => ({
        name: this.formatStatusPipe.transform(status),
        value: tasksByStatus[status],
      }))
      .sort(
        (a, b) =>
          this.statusOrder.indexOf(a.name) - this.statusOrder.indexOf(b.name)
      );
  }

  /**
   * Calculates the width of the chart.
   * @returns The width of the chart.
   */
  getChartWidth(): number {
    return Math.min(window.innerWidth * 0.95, 1280);
  }

  /**
   * Calculates the height of the chart based on a 16:9 aspect ratio.
   * @returns The height of the chart.
   */
  getChartHeight(): number {
    return this.getChartWidth() * 0.5625;
  }

  /**
   * Listens for window resize events and handles the resize logic.
   * @param event - The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {}
}
