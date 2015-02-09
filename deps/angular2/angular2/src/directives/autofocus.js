System.register("angular2/src/directives/autofocus", ["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/dom/element", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/autofocus";
  var assert,
      Decorator,
      NgElement,
      isBlank,
      Autofocus;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      Autofocus = $__export("Autofocus", (function() {
        var Autofocus = function Autofocus(el) {
          assert.argumentTypes(el, NgElement);
          this.element = el;
          this.prevCondition = null;
        };
        return ($traceurRuntime.createClass)(Autofocus, {set condition(newCondition) {
            if (this.element.domElement.autofocus) {
              this.element.domElement.focus();
            } else {
              if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
                this.prevCondition = true;
                this.element.domElement.focus();
              } else {
                this.prevCondition = false;
              }
            }
            return newCondition;
          }}, {});
      }()));
      Object.defineProperty(Autofocus, "annotations", {get: function() {
          return [new Decorator({
            selector: '[autofocus]',
            bind: {'autofocus': 'condition'}
          })];
        }});
      Object.defineProperty(Autofocus, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/autofocus.map

//# sourceMappingURL=./autofocus.map