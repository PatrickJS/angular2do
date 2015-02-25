System.register(["rtts_assert/rtts_assert", "../../annotations/annotations", "./light_dom", "angular2/di", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/dom/element"], function($__export) {
  "use strict";
  var assert,
      Decorator,
      SourceLightDom,
      DestinationLightDom,
      LightDom,
      Inject,
      Element,
      Node,
      DOM,
      isPresent,
      List,
      ListWrapper,
      NgElement,
      _scriptTemplate,
      ContentStrategy,
      RenderedContent,
      IntermediateContent,
      Content;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      SourceLightDom = $__m.SourceLightDom;
      DestinationLightDom = $__m.DestinationLightDom;
      LightDom = $__m.LightDom;
    }, function($__m) {
      Inject = $__m.Inject;
    }, function($__m) {
      Element = $__m.Element;
      Node = $__m.Node;
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }],
    execute: function() {
      _scriptTemplate = DOM.createScriptTag('type', 'ng/content');
      ContentStrategy = (function() {
        var ContentStrategy = function ContentStrategy() {};
        return ($traceurRuntime.createClass)(ContentStrategy, {insert: function(nodes) {
            assert.argumentTypes(nodes, assert.genericType(List, Node));
          }}, {});
      }());
      Object.defineProperty(ContentStrategy.prototype.insert, "parameters", {get: function() {
          return [[assert.genericType(List, Node)]];
        }});
      RenderedContent = (function($__super) {
        var RenderedContent = function RenderedContent(contentEl) {
          assert.argumentTypes(contentEl, Element);
          $traceurRuntime.superConstructor(RenderedContent).call(this);
          this._replaceContentElementWithScriptTags(contentEl);
          this.nodes = [];
        };
        return ($traceurRuntime.createClass)(RenderedContent, {
          insert: function(nodes) {
            assert.argumentTypes(nodes, assert.genericType(List, Node));
            this.nodes = nodes;
            DOM.insertAllBefore(this.endScript, nodes);
            this._removeNodesUntil(ListWrapper.isEmpty(nodes) ? this.endScript : nodes[0]);
          },
          _replaceContentElementWithScriptTags: function(contentEl) {
            assert.argumentTypes(contentEl, Element);
            this.beginScript = DOM.clone(_scriptTemplate);
            this.endScript = DOM.clone(_scriptTemplate);
            DOM.insertBefore(contentEl, this.beginScript);
            DOM.insertBefore(contentEl, this.endScript);
            DOM.removeChild(DOM.parentElement(contentEl), contentEl);
          },
          _removeNodesUntil: function(node) {
            assert.argumentTypes(node, Node);
            var p = DOM.parentElement(this.beginScript);
            for (var next = DOM.nextSibling(this.beginScript); next !== node; next = DOM.nextSibling(this.beginScript)) {
              DOM.removeChild(p, next);
            }
          }
        }, {}, $__super);
      }(ContentStrategy));
      Object.defineProperty(RenderedContent, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(RenderedContent.prototype.insert, "parameters", {get: function() {
          return [[assert.genericType(List, Node)]];
        }});
      Object.defineProperty(RenderedContent.prototype._replaceContentElementWithScriptTags, "parameters", {get: function() {
          return [[Element]];
        }});
      Object.defineProperty(RenderedContent.prototype._removeNodesUntil, "parameters", {get: function() {
          return [[Node]];
        }});
      IntermediateContent = (function($__super) {
        var IntermediateContent = function IntermediateContent(destinationLightDom) {
          assert.argumentTypes(destinationLightDom, LightDom);
          $traceurRuntime.superConstructor(IntermediateContent).call(this);
          this.destinationLightDom = destinationLightDom;
          this.nodes = [];
        };
        return ($traceurRuntime.createClass)(IntermediateContent, {insert: function(nodes) {
            assert.argumentTypes(nodes, assert.genericType(List, Node));
            this.nodes = nodes;
            this.destinationLightDom.redistribute();
          }}, {}, $__super);
      }(ContentStrategy));
      Object.defineProperty(IntermediateContent, "parameters", {get: function() {
          return [[LightDom]];
        }});
      Object.defineProperty(IntermediateContent.prototype.insert, "parameters", {get: function() {
          return [[assert.genericType(List, Node)]];
        }});
      Content = $__export("Content", (function() {
        var Content = function Content(destinationLightDom, contentEl) {
          assert.argumentTypes(destinationLightDom, assert.type.any, contentEl, NgElement);
          this.select = contentEl.getAttribute('select');
          this._strategy = isPresent(destinationLightDom) ? new IntermediateContent(destinationLightDom) : new RenderedContent(contentEl.domElement);
        };
        return ($traceurRuntime.createClass)(Content, {
          nodes: function() {
            return assert.returnType((this._strategy.nodes), assert.genericType(List, Node));
          },
          insert: function(nodes) {
            assert.argumentTypes(nodes, assert.genericType(List, Node));
            this._strategy.insert(nodes);
          }
        }, {});
      }()));
      Object.defineProperty(Content, "annotations", {get: function() {
          return [new Decorator({selector: 'content'})];
        }});
      Object.defineProperty(Content, "parameters", {get: function() {
          return [[new Inject(DestinationLightDom)], [NgElement]];
        }});
      Object.defineProperty(Content.prototype.insert, "parameters", {get: function() {
          return [[assert.genericType(List, Node)]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/shadow_dom_emulation/content_tag.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/shadow_dom_emulation/content_tag.js.map