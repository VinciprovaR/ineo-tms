import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task.model';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormatStatusPipe],
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  taskForm: FormGroup;
  taskStatuses = Object.values(TaskStatus);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  constructor() {
    // Initialize the form with default values and validators for each field
    this.taskForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      summary: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      status: [TaskStatus.TO_DO, Validators.required],
    });
  }

  /**
   * Submits the form to add a new task.
   * If the form is valid, it sends the task data to the TaskService to create a new task.
   * After successful submission, the form is reset with default values.
   */
  addTask(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value); // Call the TaskService to create a new task
      this.taskForm.reset({
        title: '',
        description: '',
        status: TaskStatus.TO_DO, // Reset the status to the default 'To Do'
      });
    }
  }

  /**
   * Getter for the title form control.
   * Used to access the 'title' form control directly from the template.
   *
   * @returns The form control for the 'title' field.
   */
  get title() {
    return this.taskForm.get('title');
  }

  /**
   * Getter for the summary form control.
   * Used to access the 'summary' form control directly from the template.
   *
   * @returns The form control for the 'summary' field.
   */
  get summary() {
    return this.taskForm.get('summary');
  }

  /**
   * Getter for the description form control.
   * Used to access the 'description' form control directly from the template.
   *
   * @returns The form control for the 'description' field.
   */
  get description() {
    return this.taskForm.get('description');
  }

  /**
   * Getter for the status form control.
   * Used to access the 'status' form control directly from the template.
   *
   * @returns The form control for the 'status' field.
   */
  get status() {
    return this.taskForm.get('status');
  }
}
