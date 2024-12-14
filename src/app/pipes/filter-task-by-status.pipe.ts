import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterTasksByStatus',
  standalone: true,
})
export class FilterTasksByStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    if (!tasks) return [];
    return tasks.filter((task) => task.status === status);
  }
}
