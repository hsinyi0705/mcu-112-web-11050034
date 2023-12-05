import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from '../model/todo';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, TodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input()
  tasks!: Todo[];

  @Output()
  stateChange = new EventEmitter<{ id: number; state: boolean }>();
}
