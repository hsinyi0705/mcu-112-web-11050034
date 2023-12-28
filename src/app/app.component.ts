import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Observable, Subject, startWith, switchMap } from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Todo } from './model/todo';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TaskRemoteService } from './services/task-remote.service';
import { TaskService } from './services/task.service';
import { TodoSearchComponent } from './todo-search/todo-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HeaderComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoSearchComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskService = inject(TaskService);

  tasks$!: Observable<Todo[]>;

  readonly refresh$ = new Subject<void>();

  selectedId?: number;

  ngOnInit(): void {
    this.tasks$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.taskService.getAll())
    );
  }

  onAdd(): void {
    this.taskService.add('待辦事項 C').subscribe(() => this.refresh$.next());
  }

  onRemove(id: number): void {
    this.taskService.remove(id).subscribe(() => this.refresh$.next());
  }

  onStateChange({ task, state }: { task: Todo; state: boolean }): void {
    this.taskService
      .updateState(task, state)
      .subscribe(() => this.refresh$.next());
  }
}
