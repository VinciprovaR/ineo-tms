import { Component } from '@angular/core';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { OpenNewTaskFormComponent } from '../open-new-task-form/open-new-task-form.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [KanbanBoardComponent, SidebarComponent, OpenNewTaskFormComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
