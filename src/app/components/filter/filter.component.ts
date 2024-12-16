import { Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  // Input properties to receive the current filter, sort key, and sort direction
  @Input() filterQuery: string = '';
  @Input() sortKey: string = 'title';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  // Output events to notify parent components of changes in filter, sort key, and sort direction
  @Output() filterQueryChange = new EventEmitter<string>();
  @Output() sortKeyChange = new EventEmitter<string>();
  @Output() sortDirectionChange = new EventEmitter<'asc' | 'desc'>();

  /**
   * Emits the filter query when the user types in the search input.
   *
   * @param event - The input event from the search field.
   */
  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.filterQueryChange.emit(input.value);
  }

  /**
   * Emits the selected sort key when the user changes the sort option.
   *
   * @param event - The change event from the select dropdown.
   */
  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortKeyChange.emit(select.value);
  }

  /**
   * Toggles the sort direction between 'asc' and 'desc' and emits the new direction.
   */
  toggleSortDirection(): void {
    const newDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortDirectionChange.emit(newDirection);
  }
}
