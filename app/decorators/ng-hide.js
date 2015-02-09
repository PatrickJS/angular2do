import {Decorator, NgElement} from 'angular2/angular2';
import {DOM} from 'angular2/src/facade/dom';
import {isBlank} from 'angular2/src/facade/lang';

@Decorator({
  selector: '[ng-hide]',
  bind: {
    'ng-hide': 'ngHide'
  }
})
export class NgHide {
  element:NgElement;
  constructor(el: NgElement) {
    this.element = el;
  }
  set ngHide(newCondition) {
    if (newCondition) {
      DOM.setStyle(this.element.domElement, 'display', 'none');
    }
    else if (!newCondition) {
      DOM.setStyle(this.element.domElement, 'display', 'block');
    }
    return newCondition;
  }
}
