import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/kanban-board/kanban-board.component').then(
        (m) => m.KanbanBoardComponent
      ),
    title: 'Home',
  },
  {
    path: 'tasks/:taskId',
    loadComponent: () =>
      import('./components/task-detail/task-detail.component').then(
        (m) => m.TaskDetailComponent
      ),
    title: 'Task Detail',
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
