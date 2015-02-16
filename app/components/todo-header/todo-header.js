import {Template, Component, Type} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';
import {number, any, string, int} from 'rtts_assert/rtts_assert';
// import {BindingPropagationConfig} from 'angular2/src/core/compiler/binding_propagation_config';

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
    AngularFire,
    bind(Firebase).toValue(new Firebase('https://angular2do.firebaseio.com/todo'))
  ]
})
@Template({
  url: 'app/components/todo-header/todo-header.html',
  // cssUrl: 'app/components/todo-header/todo-header.css',
  directives: []
})
export class TodoHeader {
  text: string;
  todoService: FirebaseArray;

  constructor( todoService: AngularFire ) {
    // TODO: refactor into TodoStorage service
    this.todoService = todoService.asArray();
    this.text = '';
  }

  enterTodo($event) {
    // ENTER_KEY
    if ($event.which === keymap.enter) {
      // if value
      if ($event.target.value !== '') {
        // this.text = $event.target.value+'';
        this.addTodo($event.target.value);
        $event.target.value = '';
        // this.text = '';
      }
    }
  }
  addTodo(text = this.text) {
    this.todoService.add({
      title: text,
      completed: false
    });
  }
  toggleAll($event) {
    var isComplete = $event.target.checked;
    this.todoService.list.forEach((todo) => {
      todo.completed = isComplete;
      this.todoService.save(todo);
    });
  }
  get remainingCount() {
    return this.todoService.list.filter((todo) => !todo.completed).length;
  }

}


