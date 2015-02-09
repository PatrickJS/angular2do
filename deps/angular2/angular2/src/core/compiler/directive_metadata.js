System.register("angular2/src/core/compiler/directive_metadata", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/core/annotations/annotations", "angular2/src/facade/collection", "angular2/src/core/compiler/shadow_dom_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/directive_metadata";
  var assert,
      Type,
      Directive,
      List,
      ShadowDomStrategy,
      DirectiveMetadata;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
    }, function($__m) {
      Directive = $__m.Directive;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      DirectiveMetadata = $__export("DirectiveMetadata", (function() {
        var DirectiveMetadata = function DirectiveMetadata(type, annotation, componentDirectives) {
          assert.argumentTypes(type, Type, annotation, Directive, componentDirectives, assert.genericType(List, Type));
          this.annotation = annotation;
          this.type = type;
          this.componentDirectives = componentDirectives;
        };
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {});
      }()));
      Object.defineProperty(DirectiveMetadata, "parameters", {get: function() {
          return [[Type], [Directive], [assert.genericType(List, Type)]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/directive_metadata.map

//# sourceMappingURL=./directive_metadata.map