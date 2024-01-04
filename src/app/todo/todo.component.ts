import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input({ required: true })
  task!: Todo;

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  remove = new EventEmitter<void>();

  @Output()
  view = new EventEmitter<void>();

  @Output()
  readonly stateChange = new EventEmitter<boolean>();

  @HostBinding('class')
  class = 'app-todo';

  ngOnInit(): void {
    console.log('ng on init');
  }

  onSetStatus(hasFinished: boolean): void {
    this.stateChange.emit(hasFinished);
  }
}
