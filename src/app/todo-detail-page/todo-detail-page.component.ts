import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-detail-page',
  standalone: true,
  templateUrl: './todo-detail-page.component.html',
  styleUrl: './todo-detail-page.component.css',
  imports: [CommonModule, TodoDetailComponent],
})
export class TodoDetailPageComponent {
  selectedId?: number;

  readonly router = inject(Router);

  readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        filter((paramMap) => paramMap.has('id')),
        map((paramMap) => +paramMap.get('id')!)
      )
      .subscribe((id) => (this.selectedId = id));
  }

  onReturn(): void {
    this.router.navigate(['home']);
  }
}
