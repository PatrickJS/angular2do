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

  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  pluralize(count, word) {
    // TODO: pluralize service
    return word + (count === 1 ? '' : 's');
  }

  changeFilter(filter = 'all', $event) {
    // if ($event && $event.preventDefault) {
    //   $event.preventDefault();
    // }
    this.todoService.filterList(filter);
  }

}


