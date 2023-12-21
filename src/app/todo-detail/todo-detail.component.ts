import { Observable } from 'rxjs';
import { Todo } from './../model/todo';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  numberAttribute,
} from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent implements OnChanges {
  @Input({ transform: numberAttribute })
  id!: number;

  task$!: Observable<Todo | undefined>;

  private readonly taskService = inject(TaskService);

  @HostBinding('class')
  class = 'todo-detail';

  ngOnChanges(): void {
    this.task$ = this.taskService.getById(this.id);
  }
}
