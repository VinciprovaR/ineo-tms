import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnInit,
  Signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
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

  ngOnInit(): void {}

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
   * Salva le modifiche della task e invia l'aggiornamento al server.
   */
  saveChanges(): void {
    if (this.isValidTitle() && this.isValidSummary()) {
      this.taskService.updateTask(this.task$()!).subscribe({
        next: () => {
          this.router.navigate(['/home']); // Dopo il salvataggio, reindirizza alla Kanban
        },
      });
    }
  }

  /**
   * Elimina la task e reindirizza alla pagina principale.
   */
  deleteTask(): void {
    this.taskService.deleteTask(this.task$()!.id);
    this.router.navigate(['/home']);
  }

  /**
   * Verifica se il titolo è valido.
   * @returns true se il titolo è valido
   */
  isValidTitle(): boolean {
    return (
      this.task$()!.title?.length >= 3 && this.task$()!.title?.length <= 50
    );
  }

  /**
   * Verifica se la descrizione (summary) è valida.
   * @returns true se la descrizione è valida
   */
  isValidSummary(): boolean {
    return (
      this.task$()!.summary?.length >= 5 && this.task$()!.summary?.length <= 80
    );
  }

  /**
   * Verifica se la descrizione (description) è valida.
   * @returns true se la descrizione è valida
   */
  isValidDescription(): boolean {
    return (
      this.task$()!.description?.length >= 5 &&
      this.task$()!.description?.length <= 500
    );
  }

  /**
   * Torna alla pagina principale.
   */
  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
