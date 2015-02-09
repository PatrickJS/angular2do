import {Component, TemplateConfig, Foreach, NgElement} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';

import {Autofocus} from 'decorators/autofocus.js';
import {NgShow} from 'decorators/ng-show.js';
import {NgHide} from 'decorators/ng-hide.js';
import {Style} from 'decorators/style.js';
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
    bind(Firebase).toValue(new Firebase('https://webapi.firebaseio.com/test'))
  ],
  template: new TemplateConfig({
    url: 'app/components/todo-main/todo-main.html',
    directives: [
      Foreach,
      TodoFocus,
      NgShow,
      NgHide,
      Autofocus,
      Style
    ]
  })
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
    this.styles = {
      main: {
        position: 'relative',
        zIndex: '2',
        borderTop: '1px solid #e6e6e6'
      },
      list: {
        margin: '0',
        padding: '0',
        listStyle: 'none'
      },
      todo: {
        position: 'relative',
        fontSize: '24px',
        borderBottom: '1px solid #ededed'
      },
      toggle: {
        textAlign: 'center',
        width: '40px',
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: 'auto',
        position: 'absolute',
        top: '0',
        bottom: '0',
        margin: 'auto 0',
        border: 'none', /* Mobile Safari */
        appearance: 'none'
      },
      label: {
        whiteSpace: 'pre',
        wordBreak: 'break-word',
        padding: '15px 60px 15px 15px',
        marginLeft: '45px',
        display: 'block',
        lineHeight: '1.2',
        transition: 'color 0.4s'
      },
      destroy: {
        display: 'none',
        position: 'absolute',
        top: '0',
        right: '10px',
        bottom: '0',
        width: '40px',
        height: '40px',
        margin: 'auto 0',
        fontSize: '30px',
        color: '#cc9a9a',
        marginBottom: '11px',
        transition: 'color 0.2s ease-out'
      }
    }; // end styles
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


