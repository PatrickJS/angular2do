import {Component, Template} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';

import {NgShow} from 'decorators/ng-show.js';
import {NgHide} from 'decorators/ng-hide.js';
import {Style} from 'decorators/style.js';

@Component({
  selector: 'todo-footer',
  componentServices: [
    AngularFire,
    bind(Firebase).toValue(new Firebase('https://angular2do.firebaseio.com/todo'))
  ]
})
@Template({
  url: 'app/components/todo-footer/todo-footer.html',
  directives: []
})
export class TodoFooter {
  todoService: FirebaseArray;
  todoEdit: any;
  constructor(sync: AngularFire) {
    this.todoService = sync.asArray();
    this.todoEdit = null;
    this.styles = {
      footer: {
        color: '#777',
        padding: '10px 15px',
        height: '20px',
        textAlign: 'center',
        borderTop: '1px solid #e6e6e6'
      },
      count: {
        float: 'left',
        textAlign: 'left'
      },
      countString: {
        fontWeight: '300'
      },
      filters: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        position: 'absolute',
        right: '0',
        left: '0'
      }
    }; // end styles
  }
  clearCompleted() {
    var toClear = {};
    this.todoService.list.forEach((todo) => {
      if (todo.completed) {
        toClear[todo._key] = null;
      }
    });
    this.todoService.bulkUpdate(toClear);
  }
  get remainingCount() {
    return this.todoService.list.filter((todo) => !todo.completed).length;
  }
  get completedCount() {
    return this.todoService.list.filter((todo) => todo.completed).length;
  }
  get locationPath() {
    // dirty checking plz
    // TODO: refactor into service
    return location.hash.replace('#/', '');
  }
}


