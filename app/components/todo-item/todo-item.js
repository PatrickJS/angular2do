import {Component, Template} from 'angular2/angular2';

import {TodoFocus} from 'decorators/todo-focus';

import {TodoStore} from 'stores/TodoStore';

var keymap = {
  tab: 9,
  enter: 13,
  esc: 27,
  up: 38,
  down: 40
};

@Component({
  selector: 'todo-item',
  componentServices: [
    TodoStore
  ],
  bind: {
    'todo': 'value'
  }
})
@Template({
  url: System.baseURL+'app/components/todo-item/todo-item.html',
  directives: [
    TodoFocus
  ]
})
export class TodoItem {
  todoService: TodoStore;

  constructor(todoService: TodoStore) {
    this.todoService = todoService;
    this.todo = null;
  }

  deleteMe(todo) {
    this.todoService.remove(todo.id);
  }

  doneEditing($event, todo) {
    var which = $event.which;
    var target = $event.target;
    if (which === keymap.enter) {

      todo.content = target.value;
      this.todoService.update(todo);
      this.todoService.editing(null);

    } else if (which === keymap.esc) {

      this.todoService.update(todo);
      this.todoService.editing(null);

    }
  }
}


