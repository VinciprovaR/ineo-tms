import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() filterQuery: string = '';
  @Input() sortKey: string = 'title';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  @Output() filterQueryChange = new EventEmitter<string>();
  @Output() sortKeyChange = new EventEmitter<string>();
  @Output() sortDirectionChange = new EventEmitter<'asc' | 'desc'>();

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterQueryChange.emit(input.value);
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortKeyChange.emit(select.value);
  }

  toggleSortDirection(): void {
    const newDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortDirectionChange.emit(newDirection);
  }
}
