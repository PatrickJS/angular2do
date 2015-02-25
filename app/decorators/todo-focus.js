import {Decorator, NgElement} from 'angular2/angular2';

@Decorator({
  selector: '[todo-focus]',
  bind: {
    'isFocused': 'todo-focus'
  }
})
export class TodoFocus {
  constructor(el: NgElement) {
    this.element = el;
  }
  set isFocused(value) {
    if (value) {
      this.element.domElement.focus();
    }
    return value;
  }
}
