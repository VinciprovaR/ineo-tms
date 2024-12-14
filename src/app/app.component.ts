import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    KanbanBoardComponent,
    TaskFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isTaskFormOpen = signal<boolean>(false); // Signal per controllare la visibilità della sidebar

  toggleTaskForm(): void {
    this.isTaskFormOpen.set(!this.isTaskFormOpen());
  }

  onTaskFormSubmit(task: any): void {
    console.log('Task submitted:', task);
    this.toggleTaskForm();
  }
}
