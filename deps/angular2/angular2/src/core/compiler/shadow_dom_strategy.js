System.register("angular2/src/core/compiler/shadow_dom_strategy", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "./view", "./shadow_dom_emulation/content_tag", "./shadow_dom_emulation/light_dom", "./directive_metadata", "./shadow_dom_emulation/shim_css"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/shadow_dom_strategy";
  var assert,
      Type,
      isBlank,
      isPresent,
      DOM,
      Element,
      StyleElement,
      List,
      ListWrapper,
      View,
      Content,
      LightDom,
      DirectiveMetadata,
      shimCssText,
      ShadowDomStrategy,
      EmulatedShadowDomStrategy,
      NativeShadowDomStrategy;
  function moveViewNodesIntoParent(parent, view) {
    for (var i = 0; i < view.nodes.length; ++i) {
      DOM.appendChild(parent, view.nodes[i]);
    }
  }
  function _detachStyles(el) {
    var nodeList = DOM.querySelectorAll(el, 'style');
    var styles = [];
    for (var i = 0; i < nodeList.length; i++) {
      var style = DOM.remove(nodeList[i]);
      ListWrapper.push(styles, style);
    }
    return assert.returnType((styles), assert.genericType(List, StyleElement));
  }
  function _attachStyles(el, styles) {
    assert.argumentTypes(el, Element, styles, assert.genericType(List, StyleElement));
    var firstChild = DOM.firstChild(el);
    for (var i = styles.length - 1; i >= 0; i--) {
      var style = styles[i];
      if (isPresent(firstChild)) {
        DOM.insertBefore(firstChild, style);
      } else {
        DOM.appendChild(el, style);
      }
      firstChild = style;
    }
  }
  function _addAttributeToChildren(el, attrName) {
    assert.argumentTypes(el, assert.type.any, attrName, assert.type.string);
    var children = DOM.querySelectorAll(el, "*");
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      DOM.setAttribute(child, attrName, '');
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
      StyleElement = $__m.StyleElement;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      shimCssText = $__m.shimCssText;
    }],
    execute: function() {
      ShadowDomStrategy = $__export("ShadowDomStrategy", (function() {
        var ShadowDomStrategy = function ShadowDomStrategy() {};
        return ($traceurRuntime.createClass)(ShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, Element, view, View);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, Element);
          },
          polyfillDirectives: function() {
            return assert.returnType((null), assert.genericType(List, Type));
          },
          processTemplate: function(template, cmpMetadata) {
            assert.argumentTypes(template, Element, cmpMetadata, DirectiveMetadata);
            return null;
          }
        }, {});
      }()));
      Object.defineProperty(ShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[Element], [View]];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], [Element]];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.processTemplate, "parameters", {get: function() {
          return [[Element], [DirectiveMetadata]];
        }});
      EmulatedShadowDomStrategy = $__export("EmulatedShadowDomStrategy", (function($__super) {
        var EmulatedShadowDomStrategy = function EmulatedShadowDomStrategy() {
          var styleHost = arguments[0] !== (void 0) ? arguments[0] : null;
          assert.argumentTypes(styleHost, Element);
          $traceurRuntime.superConstructor(EmulatedShadowDomStrategy).call(this);
          if (isBlank(styleHost)) {
            styleHost = DOM.defaultDoc().head;
          }
          this._styleHost = styleHost;
        };
        return ($traceurRuntime.createClass)(EmulatedShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, Element, view, View);
            DOM.clearNodes(el);
            moveViewNodesIntoParent(el, view);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, Element);
            return new LightDom(lightDomView, shadowDomView, el);
          },
          polyfillDirectives: function() {
            return assert.returnType(([Content]), assert.genericType(List, Type));
          },
          processTemplate: function(template, cmpMetadata) {
            assert.argumentTypes(template, Element, cmpMetadata, DirectiveMetadata);
            var templateRoot = DOM.templateAwareRoot(template);
            var attrName = cmpMetadata.annotation.selector;
            var styles = _detachStyles(templateRoot);
            for (var i = 0; i < styles.length; i++) {
              var style = styles[i];
              var processedCss = shimCssText(DOM.getText(style), attrName);
              DOM.setText(style, processedCss);
            }
            _attachStyles(this._styleHost, styles);
            _addAttributeToChildren(templateRoot, attrName);
          }
        }, {}, $__super);
      }(ShadowDomStrategy)));
      Object.defineProperty(EmulatedShadowDomStrategy, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(EmulatedShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[Element], [View]];
        }});
      Object.defineProperty(EmulatedShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], [Element]];
        }});
      Object.defineProperty(EmulatedShadowDomStrategy.prototype.processTemplate, "parameters", {get: function() {
          return [[Element], [DirectiveMetadata]];
        }});
      NativeShadowDomStrategy = $__export("NativeShadowDomStrategy", (function($__super) {
        var NativeShadowDomStrategy = function NativeShadowDomStrategy() {
          $traceurRuntime.superConstructor(NativeShadowDomStrategy).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(NativeShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, Element, view, View);
            moveViewNodesIntoParent(el.createShadowRoot(), view);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, Element);
            return null;
          },
          polyfillDirectives: function() {
            return assert.returnType(([]), assert.genericType(List, Type));
          },
          processTemplate: function(template, cmpMetadata) {
            assert.argumentTypes(template, Element, cmpMetadata, DirectiveMetadata);
            return template;
          }
        }, {}, $__super);
      }(ShadowDomStrategy)));
      Object.defineProperty(NativeShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[Element], [View]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], [Element]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.processTemplate, "parameters", {get: function() {
          return [[Element], [DirectiveMetadata]];
        }});
      Object.defineProperty(_attachStyles, "parameters", {get: function() {
          return [[Element], [assert.genericType(List, StyleElement)]];
        }});
      Object.defineProperty(_addAttributeToChildren, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/shadow_dom_strategy.map

//# sourceMappingURL=./shadow_dom_strategy.map