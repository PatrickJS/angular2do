System.register("angular2/src/directives/non_bindable", ["angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/non_bindable";
  var Decorator,
      NonBindable;
  return {
    setters: [function($__m) {
      Decorator = $__m.Decorator;
    }],
    execute: function() {
      NonBindable = $__export("NonBindable", (function() {
        var NonBindable = function NonBindable() {};
        return ($traceurRuntime.createClass)(NonBindable, {}, {});
      }()));
      Object.defineProperty(NonBindable, "annotations", {get: function() {
          return [new Decorator({
            selector: '[non-bindable]',
            compileChildren: false
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/non_bindable.map

//# sourceMappingURL=./non_bindable.map