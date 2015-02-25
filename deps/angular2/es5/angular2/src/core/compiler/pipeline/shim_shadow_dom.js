System.register(["rtts_assert/rtts_assert", "./compile_step", "./compile_element", "./compile_control", "angular2/src/facade/lang", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/shadow_dom_emulation/shim_component"], function($__export) {
  "use strict";
  var assert,
      CompileStep,
      CompileElement,
      CompileControl,
      isPresent,
      DirectiveMetadata,
      ShadowDomStrategy,
      ShimComponent,
      ShimShadowDom;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      ShimComponent = $__m.ShimComponent;
    }],
    execute: function() {
      ShimShadowDom = $__export("ShimShadowDom", (function($__super) {
        var ShimShadowDom = function ShimShadowDom(cmpMetadata, strategy) {
          assert.argumentTypes(cmpMetadata, DirectiveMetadata, strategy, ShadowDomStrategy);
          $traceurRuntime.superConstructor(ShimShadowDom).call(this);
          this._strategy = strategy;
          this._shimComponent = strategy.getShimComponent(cmpMetadata.type);
        };
        return ($traceurRuntime.createClass)(ShimShadowDom, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (current.ignoreBindings) {
              return ;
            }
            this._shimComponent.shimContentElement(current.element);
            var host = current.componentDirective;
            if (isPresent(host)) {
              var shimComponent = this._strategy.getShimComponent(host.type);
              shimComponent.shimHostElement(current.element);
            }
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ShimShadowDom, "parameters", {get: function() {
          return [[DirectiveMetadata], [ShadowDomStrategy]];
        }});
      Object.defineProperty(ShimShadowDom.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/shim_shadow_dom.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/shim_shadow_dom.js.map