import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  standalone: true,
  imports: [CommonModule, TaskComponent],
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent {
  statuses = Object.values(TaskStatus);

  // Segnali derivati per ogni stato
  tasksByStatus = computed(() =>
    this.statuses.map((status) => ({
      status,
      tasks: this.taskService.tasks().filter((task) => task.status === status),
    }))
  );

  constructor(public taskService: TaskService) {}

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
