System.register("angular2/src/directives/if", ["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/viewport", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/if";
  var assert,
      Template,
      ViewPort,
      isBlank,
      If;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      If = $__export("If", (function() {
        var If = function If(viewPort) {
          assert.argumentTypes(viewPort, ViewPort);
          this.viewPort = viewPort;
          this.prevCondition = null;
        };
        return ($traceurRuntime.createClass)(If, {set condition(newCondition) {
            if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
              this.prevCondition = true;
              this.viewPort.create();
            } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
              this.prevCondition = false;
              this.viewPort.clear();
            }
          }}, {});
      }()));
      Object.defineProperty(If, "annotations", {get: function() {
          return [new Template({
            selector: '[if]',
            bind: {'if': 'condition'}
          })];
        }});
      Object.defineProperty(If, "parameters", {get: function() {
          return [[ViewPort]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/if.map

//# sourceMappingURL=./if.map