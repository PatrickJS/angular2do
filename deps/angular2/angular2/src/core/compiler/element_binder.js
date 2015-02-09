System.register("angular2/src/core/compiler/element_binder", ["rtts_assert/rtts_assert", "./element_injector", "angular2/src/facade/lang", "angular2/src/facade/collection", "./directive_metadata", "./view"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/element_binder";
  var assert,
      ProtoElementInjector,
      FIELD,
      MapWrapper,
      DirectiveMetadata,
      List,
      Map,
      ProtoView,
      ElementBinder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }, function($__m) {
      FIELD = $__m.FIELD;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      Map = $__m.Map;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }],
    execute: function() {
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder(protoElementInjector, componentDirective, templateDirective) {
          assert.argumentTypes(protoElementInjector, ProtoElementInjector, componentDirective, DirectiveMetadata, templateDirective, DirectiveMetadata);
          this.protoElementInjector = protoElementInjector;
          this.componentDirective = componentDirective;
          this.templateDirective = templateDirective;
          this.events = null;
          this.textNodeIndices = null;
          this.hasElementPropertyBindings = false;
          this.nestedProtoView = null;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }()));
      Object.defineProperty(ElementBinder, "parameters", {get: function() {
          return [[ProtoElementInjector], [DirectiveMetadata], [DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/element_binder.map

//# sourceMappingURL=./element_binder.map