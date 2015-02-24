import {Component, Template, Foreach, NgElement} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';

import {TodoFocus} from 'decorators/todo-focus.js';

var keymap = {
  tab: 9,
  enter: 13,
  esc: 27,
  up: 38,
  down: 40
};

@Component({
  selector: 'todo-main',
  componentServices: [
    AngularFire,
    bind(Firebase).toValue(new Firebase('https://angular2do.firebaseio.com/todo'))
  ]
  // template: new
})
@Template({
  url: 'app/components/todo-main/todo-main.html',
  directives: [
    Foreach,
    TodoFocus
  ]
})
export class TodoMain {
  text: string;
  todoService: FirebaseArray;
  todoEdit: any;

  constructor(sync: AngularFire) {
    // TODO: refactor into TodoStorage service
    this.todoService = sync.asArray();
    this.text = '';
    this.todoEdit = null;
  }

  editTodo($event, todo) {
    this.todoEdit = todo;
  }

  completeMe(todo) {
    todo.completed = !todo.completed;
    this.todoService.save(todo);
  }

  deleteMe(todo) {
    this.todoService.remove(todo);
  }


  doneEditing($event, todo) {
    var which = $event.which;
    var target = $event.target;
    if (which === keymap.enter) {
      todo.title = target.value;
      this.todoService.save(todo);
      this.todoEdit = null;
    }
    else if (which === keymap.esc) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }

}


