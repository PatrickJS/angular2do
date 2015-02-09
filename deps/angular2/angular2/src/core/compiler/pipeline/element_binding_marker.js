System.register("angular2/src/core/compiler/pipeline/element_binding_marker", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/dom", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/pipeline/element_binding_marker";
  var assert,
      isPresent,
      MapWrapper,
      DOM,
      CompileStep,
      CompileElement,
      CompileControl,
      NG_BINDING_CLASS,
      ElementBindingMarker;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }],
    execute: function() {
      NG_BINDING_CLASS = 'ng-binding';
      ElementBindingMarker = $__export("ElementBindingMarker", (function($__super) {
        var ElementBindingMarker = function ElementBindingMarker() {
          $traceurRuntime.superConstructor(ElementBindingMarker).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(ElementBindingMarker, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var hasBindings = (isPresent(current.textNodeBindings) && MapWrapper.size(current.textNodeBindings) > 0) || (isPresent(current.propertyBindings) && MapWrapper.size(current.propertyBindings) > 0) || (isPresent(current.variableBindings) && MapWrapper.size(current.variableBindings) > 0) || (isPresent(current.eventBindings) && MapWrapper.size(current.eventBindings) > 0) || (isPresent(current.decoratorDirectives) && current.decoratorDirectives.length > 0) || isPresent(current.templateDirective) || isPresent(current.componentDirective);
            if (hasBindings) {
              var element = current.element;
              DOM.addClass(element, NG_BINDING_CLASS);
              current.hasBindings = true;
            }
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ElementBindingMarker.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/pipeline/element_binding_marker.map

//# sourceMappingURL=./element_binding_marker.map