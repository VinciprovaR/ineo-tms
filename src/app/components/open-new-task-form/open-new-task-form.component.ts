import { Component, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-open-new-task-form',
  standalone: true,
  imports: [],
  templateUrl: './open-new-task-form.component.html',
})
export class OpenNewTaskFormComponent {
  @Input({ required: true })
  appSidebar!: SidebarComponent;

  /**
   * Toggles the visibility of the task form in the sidebar.
   */
  toggleTaskForm(): void {
    this.appSidebar.toggleTaskForm();
  }
}
