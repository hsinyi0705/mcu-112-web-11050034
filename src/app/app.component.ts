import { TaskService } from './services/task.service';
import { Component, Injectable, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Todo } from './model/todo';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TodoListComponent, FooterComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskService = inject(TaskService);

  tasks = [new Todo(1, '待辦事項 A'), new Todo(2, '待辦事項 B')];

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
