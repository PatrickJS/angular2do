import {Decorator, NgElement} from 'angular2/angular2';
import {DOM} from 'angular2/src/facade/dom';
import {isBlank} from 'angular2/src/facade/lang';

@Decorator({
  selector: '[ng-show]',
  bind: {
    'ng-show': 'ngShow'
  }
})
export class NgShow {
  element:NgElement;
  constructor(el: NgElement) {
    this.element = el;
  }
  set ngShow(newCondition) {
    if (newCondition) {
      DOM.setStyle(this.element.domElement, 'display', 'block');
    }
    else if (!newCondition) {
      DOM.setStyle(this.element.domElement, 'display', 'none');
    }
    return newCondition;
  }
}
