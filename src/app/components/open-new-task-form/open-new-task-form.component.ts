import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-open-new-task-form',
  standalone: true,
  imports: [],
  templateUrl: './open-new-task-form.component.html',
  styleUrl: './open-new-task-form.component.css',
})
export class OpenNewTaskFormComponent implements OnInit {
  ngOnInit(): void {
    console.log('OpenNewTaskFormComponent');
  }
  @Input({ required: true })
  appSidebar!: SidebarComponent;

  toggleTaskForm(): void {
    this.appSidebar.toggleTaskForm();
  }
}
