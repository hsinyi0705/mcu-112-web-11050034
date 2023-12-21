import { Observable, Subject, startWith, switchMap } from 'rxjs';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Todo } from './model/todo';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TaskRemoteService } from './services/task-remote.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HeaderComponent,
    TodoListComponent,
    TodoDetailComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskService = inject(TaskRemoteService);

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
    this.taskService.remove(id);
  }

  onStateChange({ id, state }: { id: number; state: boolean }): void {
    this.taskService.updateState(id, state);
  }
}
