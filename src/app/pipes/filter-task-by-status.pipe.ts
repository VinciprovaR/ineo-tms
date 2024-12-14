import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTasksByStatus',
  standalone: true,
})
export class FilterTasksByStatusPipe implements PipeTransform {
  /**
   * Filters a list of tasks by their status.
   * This pipe returns only the tasks that match the given status.
   *
   * @param tasks - The array of tasks to be filtered.
   * @param status - The status used to filter the tasks (e.g., 'To Do', 'In Progress', 'Done').
   * @returns A filtered array of tasks where the status matches the given status.
   */
  transform(tasks: Task[], status: string): Task[] {
    if (!tasks) return []; // Return an empty array if tasks are undefined or null
    return tasks.filter((task) => task.status === status); // Filter tasks that match the given status
  }
}
