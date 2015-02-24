import {Component, Template} from 'angular2/angular2';

import {TodoHeader} from 'components/todo-header/todo-header.js';
import {TodoMain} from 'components/todo-main/todo-main.js';
import {TodoFooter} from 'components/todo-footer/todo-footer.js';


@Component({
  selector: 'todo-app'
})
@Template({
  url: 'app/components/todo-app/todo-app.html',
  directives: [
    TodoHeader,
    TodoMain,
    TodoFooter
  ]
})
export class TodoApp {

  constructor() {

  }

}


