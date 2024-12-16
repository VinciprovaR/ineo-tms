import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard',
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
