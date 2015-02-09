import {Decorator, NgElement} from 'angular2/angular2';
import {isBlank} from 'angular2/src/facade/lang';

@Decorator({
  selector: '[autofocus]',
  bind: {
    'autofocus': 'condition'
  }
})
export class Autofocus {
  element:NgElement;
  prevCondition: boolean;

  constructor(el: NgElement) {
    this.element = el;
    this.prevCondition = null;
  }
  set condition(newCondition) {
    if ('autofocus' in this.element.domElement) {
      this.element.domElement.focus();
    }
    else {
      if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
        this.prevCondition = true;
        this.element.domElement.focus();
      } else {
        this.prevCondition = false;
      }
    }
    return newCondition;
  }
}
