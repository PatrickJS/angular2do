import {Component, Template} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {AngularFire, FirebaseArray} from 'firebase/AngularFire';

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

  toggleFilter($event) {
    $event.preventDefault();
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


