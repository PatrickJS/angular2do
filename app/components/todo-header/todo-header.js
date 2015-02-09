import {Component, TemplateConfig} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';
import {Autofocus} from 'decorators/autofocus.js';
import {Style} from 'decorators/style.js';

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
    bind(Firebase).toValue(new Firebase('https://webapi.firebaseio.com/test'))
  ],
  template: new TemplateConfig({
    url:    'app/components/todo-header/todo-header.html',
    // cssUrl: 'app/components/todo-header/todo-header.css',
    directives: [
      Autofocus,
      Style
    ]
  }),
  compileChildren: true
})
export class TodoHeader {
  // text: string;
  todoService: FirebaseArray;

  constructor(sync: AngularFire) {
    // TODO: refactor into TodoStorage service
    this.todoService = sync.asArray();
    // this.text = '';
    this.styles = {
      toggleAll: {
        position: 'absolute',
        top: '13px',
        left: '-12px',
        width: '60px',
        height: '34px',
        textAlign: 'center',
        zIndex: '1',
        outline: 'none',
        border: 'none' // Mobile Safari
      },
      toggleAllLabel: {
        display: 'none'
      },
      input: {
        'position': 'relative',
        'margin': '0',
        'width': '100%',
        'fontSize': '24px',
        'fontFamily': 'inherit',
        'fontWeight': 'inherit',
        'lineHeight': '1.4em',
        // 'border': '0',
        'outline': 'none',
        'color': 'inherit',
        // 'border': '1px solid #999',
        'boxSizing': 'border-box',
        'fontSmoothing': 'antialiased',
        'padding': '16px 16px 16px 60px',
        'border': 'none',
        'background': 'rgba(0, 0, 0, 0.003)',
        'boxShadow': 'inset 0 -2px 1px rgba(0,0,0,0.03)'
      }
    };
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


