System.register("angular2/src/directives/style", ["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/dom/element", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/style";
  var assert,
      Decorator,
      NgElement,
      isBlank,
      Style;
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
      Style = $__export("Style", (function() {
        var Style = function Style(el) {
          assert.argumentTypes(el, NgElement);
          this.element = el;
        };
        return ($traceurRuntime.createClass)(Style, {
          set condition(value) {
            if (value) {
              this.extendStyles(value);
            }
            return value;
          },
          objectToCss: function(object) {
            var css = '';
            for (var key = void 0 in object) {
              css += '' + key + ':' + object[key] + ';';
            }
            ;
            return css;
          },
          extendStyles: function(styles) {
            var dom = this.element.domElement.style;
            for (var key = void 0 in styles) {
              if (key in dom) {
                dom[key] = styles[key];
              }
            }
            return dom;
          }
        }, {});
      }()));
      Object.defineProperty(Style, "annotations", {get: function() {
          return [new Decorator({
            selector: '[style]',
            bind: {'style': 'condition'}
          })];
        }});
      Object.defineProperty(Style, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/style.map

//# sourceMappingURL=./style.map