System.register(["rtts_assert/rtts_assert", "angular2/src/facade/dom", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      DOM,
      Element,
      normalizeBlank,
      NgElement;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      normalizeBlank = $__m.normalizeBlank;
    }],
    execute: function() {
      NgElement = $__export("NgElement", (function() {
        var NgElement = function NgElement(domElement) {
          assert.argumentTypes(domElement, Element);
          this.domElement = domElement;
        };
        return ($traceurRuntime.createClass)(NgElement, {getAttribute: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return normalizeBlank(DOM.getAttribute(this.domElement, name));
          }}, {});
      }()));
      Object.defineProperty(NgElement, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(NgElement.prototype.getAttribute, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/dom/element.map

//# sourceMappingURL=../../../../angular2/src/core/dom/element.js.map