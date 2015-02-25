import {Component, Template} from 'angular2/angular2';

import {TodoStore} from 'stores/TodoStore';

@Component({
  selector: 'todo-footer',
  componentServices: [
    TodoStore
  ]
})
@Template({
  url: System.baseURL+'app/components/todo-footer/todo-footer.html',
  directives: []
})
export class TodoFooter {
  todoService: TodoStore;

  constructor(todoService: TodoStore) {

    this.todoService = todoService;
    // TODO: location service
    this.currentFilter = location.hash.replace('#/', '') || 'all';
    this.changeFilter(this.currentFilter);

  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  pluralize(count, word) {
    // TODO: pluralize service
    return word + (count === 1 ? '' : 's');
  }

  changeFilter(filter = 'all', $event) {
    if ($event && $event.preventDefault) {
      $event.preventDefault();
    }

    if (filter === 'all') {
      this.todoService.filterList((todo) => true);
    } else if (filter === 'completed') {
      this.todoService.filterList((todo) => todo.completed);
    } else if (filter === 'active') {
      this.todoService.filterList((todo) => !todo.completed);
    }

    this.currentFilter = filter;
  }

}


