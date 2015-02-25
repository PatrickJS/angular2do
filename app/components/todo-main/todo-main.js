import {Component, Template, Foreach, NgElement} from 'angular2/angular2';

import {TodoItem} from 'components/todo-item/todo-item';
import {TodoFocus} from 'decorators/todo-focus';

import {TodoStore} from 'stores/TodoStore';

@Component({
  selector: 'todo-main',
  componentServices: [
    TodoStore
  ]
})
@Template({
  url: System.baseURL+'app/components/todo-main/todo-main.html',
  directives: [
    Foreach,
    TodoFocus,
    TodoItem
  ]
})
export class TodoMain {
  todoService: TodoStore;

  constructor(todoService: TodoStore) {
    this.todoService = todoService;
  }

  getList() {
    // TODO: filter list
    return this.todoService.getFilteredList();
  }

  editTodo(todo) {
    this.todoService.editing(todo);
  }

  toggleComplete(todo) {
    this.todoService.toggleComplete(todo);
  }

}


