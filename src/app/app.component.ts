import { TaskService } from './services/task.service';
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Todo } from './model/todo';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    HeaderComponent,
    TodoListComponent,
    TodoDetailComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  taskService = inject(TaskService);

  tasks: Todo[] = [];

  selectedId?: number;

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }

  onAdd(): void {
    this.taskService.add('待辦事項 C');
  }

  onRemove(id: number): void {
    this.taskService.remove(id);
  }

  onStateChange({ id, state }: { id: number; state: boolean }): void {
    this.taskService.updateState(id, state);
  }
}
