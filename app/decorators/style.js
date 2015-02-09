import {Decorator, NgElement} from 'angular2/angular2';
import {isBlank} from 'angular2/src/facade/lang';

@Decorator({
  selector: '[style]',
  bind: {
    'style': 'condition'
  }
})
export class Style {
  element:NgElement;
  constructor(el: NgElement) {
    this.element = el;
  }
  set condition(value) {
    if (value) {
      if (typeof value === 'object') {
        this.extendStyles(value);
      }
      else if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          this.extendStyles(value[i])
        };
      }
    }
    return value;
  }
  objectToCss(object) {
    var css = '';
    for (var key in object) {
      css += ''+ key +':'+ object[key] +';';
    };
    return css;
  }
  extendStyles(styles) {
    var dom = this.element.domElement.style;
    for (var key in styles) {
      if (key in dom) {
        dom[key] = styles[key];
      }
    }
    return dom;
  }
}
