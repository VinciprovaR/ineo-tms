import { Component, computed, effect, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormatStatusPipe],
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent {
  private router = inject(Router);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  taskForm!: FormGroup;

  @Input()
  taskId!: number;
  task$ = computed(() =>
    this.taskService.tasks$().find((t) => t.id === this.taskId)
  );

  statuses = Object.values(TaskStatus);
  isLoading$ = this.taskService.isLoading$;

  constructor() {
    effect(() => {
      const task = this.task$();
      if (task) {
        this.initializeForm(task);
      }
    });
  }

  private initializeForm(task: any) {
    this.taskForm = this.fb.group({
      title: [
        task.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      summary: [
        task.summary,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      description: [
        task.description,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
      status: [task.status, [Validators.required]],
    });
  }

  /**
   * Saves the changes of the task and sends the update to the server.
   */
  saveChanges(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.taskId,
        title: this.taskForm.get('title')?.value,
        summary: this.taskForm.get('summary')?.value,
        description: this.taskForm.get('description')?.value,
        status: this.taskForm.get('status')?.value,
      };

      this.taskService.updateTask(updatedTask);
    }
  }

  /**
   * Deletes the task and redirects to the main page.
   */
  deleteTask(): void {
    this.taskService.deleteTask(this.task$()!);
    this.router.navigate(['/home']);
  }

  /**
   * Checks if the title is valid.
   * @returns true if the title is valid
   */
  isValidTitle(): boolean {
    return (
      this.task$()!.title?.length >= 3 && this.task$()!.title?.length <= 50
    );
  }

  /**
   * Checks if the summary is valid.
   * @returns true if the summary is valid
   */
  isValidSummary(): boolean {
    return (
      this.task$()!.summary?.length >= 5 && this.task$()!.summary?.length <= 80
    );
  }

  /**
   * Checks if the description is valid.
   * @returns true if the description is valid
   */
  isValidDescription(): boolean {
    return (
      this.task$()!.description?.length >= 5 &&
      this.task$()!.description?.length <= 500
    );
  }

  /**
   * Navigates back to the home page.
   */
  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
