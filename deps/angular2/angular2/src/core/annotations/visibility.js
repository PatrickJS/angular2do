System.register("angular2/src/core/annotations/visibility", ["angular2/src/facade/lang", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/annotations/visibility";
  var CONST,
      DependencyAnnotation,
      Parent,
      Ancestor;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }, function($__m) {
      DependencyAnnotation = $__m.DependencyAnnotation;
    }],
    execute: function() {
      Parent = $__export("Parent", (function($__super) {
        var Parent = function Parent() {
          $traceurRuntime.superConstructor(Parent).call(this);
        };
        return ($traceurRuntime.createClass)(Parent, {}, {}, $__super);
      }(DependencyAnnotation)));
      Object.defineProperty(Parent, "annotations", {get: function() {
          return [new CONST()];
        }});
      Ancestor = $__export("Ancestor", (function($__super) {
        var Ancestor = function Ancestor() {
          $traceurRuntime.superConstructor(Ancestor).call(this);
        };
        return ($traceurRuntime.createClass)(Ancestor, {}, {}, $__super);
      }(DependencyAnnotation)));
      Object.defineProperty(Ancestor, "annotations", {get: function() {
          return [new CONST()];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/annotations/visibility.map

//# sourceMappingURL=./visibility.map