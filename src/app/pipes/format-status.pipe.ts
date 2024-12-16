import { Pipe, PipeTransform } from '@angular/core';
import { statusMapLabel } from '../models/task.model';

@Pipe({
  name: 'formatStatus',
  standalone: true,
})
export class FormatStatusPipe implements PipeTransform {
  /**
   * Transforms a status string like "TO_DO" into "To Do" using a pre-defined map.
   *
   * @param value - The input status string to be formatted.
   * @returns A formatted string based on the mapping, or the original value if no match is found.
   */
  transform(value: string): string {
    if (!value) return '';

    // Return the formatted status from the map, or fallback to the original value
    return statusMapLabel[value] || value;
  }
}
