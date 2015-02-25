import {Template, Component} from 'angular2/angular2';

import {TodoItem} from 'components/todo-item/todo-item';

import {TodoStore} from 'stores/TodoStore';

var keymap = {
  tab: 9,
  enter: 13,
  esc: 27,
  up: 38,
  down: 40
};

@Component({
  selector: 'todo-header',
  componentServices: [
    TodoStore
  ]
})
@Template({
  url: System.baseURL+'app/components/todo-header/todo-header.html',
  directives: [
    TodoItem
  ]
})
export class TodoHeader {
  todoService: TodoStore;

  constructor( todoService: TodoStore ) {
    this.todoService = todoService;
  }

  enterTodo($event) {
    // ENTER_KEY
    if ($event.which === keymap.enter) {
      $event.preventDefault();
      // if value
      if ($event.target.value !== '') {
        this.addTodo($event.target.value);
        $event.target.value = '';
      }
    }
  }

  addTodo(text) {
    if (!text) return;
    this.todoService.create({
      content: text,
      completed: false
    });
  }

  toggleAll(isComplete) {
    this.todoService.toggleAll(isComplete);
  }


}


