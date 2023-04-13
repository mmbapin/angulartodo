import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoText: string = '';
  buttonName: string = 'Add';
  categoryId: any = '';
  todoList: Array<any> = [];
  constructor(
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.todoService.loadTodos(this.categoryId).subscribe((val) => {
      console.log(val);
      this.todoList = val;
    });
  }

  onSubmit(f: NgForm) {
    console.log(f);
    let todo = {
      todo: f.value.todoText,
      isCompleted: false,
    };
    this.todoService.saveTodo(this.categoryId, todo);
    f.resetForm();
  }
}
