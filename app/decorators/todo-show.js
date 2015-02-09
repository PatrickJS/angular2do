import {Decorator, NgElement} from 'angular2/angular2';

@Decorator({
  selector: '[todo-show]',
  bind: {
    'todo-show': 'show'
  }
})
class TodoShow {
  element:NgElement;
  set show(value) {
    var el = this.element.domElement;
    if (value) {
      el.style.display = 'none';
      DOM.removeClass(el, 'visible');
      DOM.addClass(el, 'hidden');
    } else {
      el.style.display = 'block';
      DOM.removeClass(el, 'hidden');
      DOM.addClass(el, 'visible');
    }
    return value;
  }
  constructor(el: NgElement) {
    console.log('todo-show', el);
    this.element = el;
  }
  toggleClass() {
    this.element.domElement

  }
  toggleVisible
}
