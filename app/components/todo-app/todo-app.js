import {Component, Template} from 'angular2/angular2';

import {TodoHeader} from 'components/todo-header/todo-header';
import {TodoMain} from 'components/todo-main/todo-main';
import {TodoFooter} from 'components/todo-footer/todo-footer';

import {TodoStore} from 'stores/TodoStore';

@Component({
  selector: 'todo-app',
  componentServices: [
    TodoStore
  ]
})
@Template({
  url: System.baseURL+'app/components/todo-app/todo-app.html',
  directives: [
    TodoHeader,
    TodoMain,
    TodoFooter
  ]
})
export class TodoApp {
  constructor(todoStore: TodoStore) {
    console.log('init app');
    this.todoStore = todoStore;
  }

}


