import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-form-page',
  standalone: true,
  templateUrl: './todo-form-page.component.html',
  styleUrl: './todo-form-page.component.css',
  imports: [CommonModule, TodoFormComponent],
})
export class TodoFormPageComponent {
  taskService = inject(TaskService);

  readonly router = inject(Router);

  onSave(task: Todo): void {
    this.taskService.add(task).subscribe(() => this.onCancel());
  }

  onCancel(): void {
    this.router.navigate(['home']);
  }
}
