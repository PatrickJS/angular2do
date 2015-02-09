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
    bind(Firebase).toValue(new Firebase('https://angular2do.firebaseio.com/todo'))
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
        listStyle: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        KhtmlUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
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
        appearance: 'none',
        outline: 'none'
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
        margin: '0',
        padding: '0',
        border: '0',
        background: 'none',
        fontSize: '100%',
        verticalAlign: 'baseline',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        appearance: 'none',
        fontSmoothing: 'antialiased',
        outline: 'none'
      },
      editButton: {
        position: 'relative',
        margin: '0',
        width: '100%',
        fontSize: '24px',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        lineHeight: '1.4em',
        outline: 'none',
        color: 'inherit',
        padding: '6px',
        border: '1px solid #999',
        boxShadow: 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
        msBoxSizing: 'border-box',
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        MozFontSmoothing: 'antialiased',
        msFontSmoothing: 'antialiased',
        fontSmoothing: 'antialiased'
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


