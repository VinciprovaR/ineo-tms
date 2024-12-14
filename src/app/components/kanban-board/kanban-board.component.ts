import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskStatus } from '../../models/task-status.enum';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  standalone: true,
  imports: [CommonModule, TaskComponent, FormsModule, FilterComponent],
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent {
  statuses = Object.values(TaskStatus);
  filterQuery = signal<string>('');
  sortKey = signal<string>('title');
  sortDirection = signal<'asc' | 'desc'>('asc');

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

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      console.log('Task updated successfully');
    });
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
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
}
