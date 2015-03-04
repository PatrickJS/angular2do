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
    this.filterBy = {
      'all': this.filterAll,
      'active': this.filterActive,
      'completed': this.filterCompleted
    }
  }

  filterAll(todo) {
    return todo;
  }
  filterActive(todo) {
    return !todo.completed
  }
  filterCompleted(todo) {
    return todo.completed;
  }

  filter(list, current) {
    // TODO: filter list in template via pipe
    return list.filter(this.filterBy[current]);
  }

  editTodo(todo) {
    this.todoService.editingTodo(todo);
  }

  toggleComplete(todo) {
    this.todoService.toggleComplete(todo);
  }

}


