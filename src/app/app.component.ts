import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OpenNewTaskFormComponent } from './components/open-new-task-form/open-new-task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    KanbanBoardComponent,
    SidebarComponent,
    OpenNewTaskFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
