System.register("angular2/test/core/compiler/viewport_spec", ["angular2/test_lib", "angular2/src/core/compiler/view", "angular2/src/core/compiler/viewport", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/viewport_spec";
  var describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      View,
      ProtoView,
      ViewPort,
      proxy,
      IMPLEMENTS,
      DOM,
      Node,
      ListWrapper,
      MapWrapper,
      Injector,
      ProtoElementInjector,
      ElementInjector,
      NativeShadowDomStrategy,
      DynamicProtoChangeDetector,
      ChangeDetector,
      Lexer,
      Parser,
      AttachableChangeDetector,
      HydrateAwareFakeView,
      SomeDirective;
  function createView(nodes) {
    var view = new View(null, nodes, new DynamicProtoChangeDetector(), MapWrapper.create());
    view.init([], [], [], [], [], [], []);
    return view;
  }
  function main() {
    describe('viewport', (function() {
      var viewPort,
          parentView,
          protoView,
          dom,
          customViewWithOneNode,
          customViewWithTwoNodes,
          elementInjector;
      beforeEach((function() {
        dom = el("<div><stuff></stuff><div insert-after-me></div><stuff></stuff></div>");
        var insertionElement = dom.childNodes[1];
        parentView = createView([dom.childNodes[0]]);
        protoView = new ProtoView(el('<div>hi</div>'), new DynamicProtoChangeDetector(), new NativeShadowDomStrategy());
        elementInjector = new ElementInjector(null, null, null, null);
        viewPort = new ViewPort(parentView, insertionElement, protoView, elementInjector);
        customViewWithOneNode = createView([el('<div>single</div>')]);
        customViewWithTwoNodes = createView([el('<div>one</div>'), el('<div>two</div>')]);
      }));
      describe('when dehydrated', (function() {
        it('should throw if create is called', (function() {
          expect((function() {
            return viewPort.create();
          })).toThrowError();
        }));
      }));
      describe('when hydrated', (function() {
        function textInViewPort() {
          var out = '';
          for (var i = 2; i < dom.childNodes.length - 1; i++) {
            if (i != 2)
              out += ' ';
            out += DOM.getInnerHTML(dom.childNodes[i]);
          }
          return out;
        }
        beforeEach((function() {
          viewPort.hydrate(new Injector([]), null);
          var fillerView = createView([el('<filler>filler</filler>')]);
          viewPort.insert(fillerView);
        }));
        it('should create new views from protoView', (function() {
          viewPort.create();
          expect(textInViewPort()).toEqual('filler hi');
          expect(viewPort.length).toBe(2);
        }));
        it('should create new views from protoView at index', (function() {
          viewPort.create(0);
          expect(textInViewPort()).toEqual('hi filler');
          expect(viewPort.length).toBe(2);
        }));
        it('should insert new views at the end by default', (function() {
          viewPort.insert(customViewWithOneNode);
          expect(textInViewPort()).toEqual('filler single');
          expect(viewPort.get(1)).toBe(customViewWithOneNode);
          expect(viewPort.length).toBe(2);
        }));
        it('should insert new views at the given index', (function() {
          viewPort.insert(customViewWithOneNode, 0);
          expect(textInViewPort()).toEqual('single filler');
          expect(viewPort.get(0)).toBe(customViewWithOneNode);
          expect(viewPort.length).toBe(2);
        }));
        it('should remove the last view by default', (function() {
          viewPort.insert(customViewWithOneNode);
          viewPort.remove();
          expect(textInViewPort()).toEqual('filler');
          expect(viewPort.length).toBe(1);
        }));
        it('should remove the view at a given index', (function() {
          viewPort.insert(customViewWithOneNode);
          viewPort.insert(customViewWithTwoNodes);
          viewPort.remove(1);
          expect(textInViewPort()).toEqual('filler one two');
          expect(viewPort.get(1)).toBe(customViewWithTwoNodes);
          expect(viewPort.length).toBe(2);
        }));
        it('should detach the last view by default', (function() {
          viewPort.insert(customViewWithOneNode);
          expect(viewPort.length).toBe(2);
          var detachedView = viewPort.detach();
          expect(detachedView).toBe(customViewWithOneNode);
          expect(textInViewPort()).toEqual('filler');
          expect(viewPort.length).toBe(1);
        }));
        it('should detach the view at a given index', (function() {
          viewPort.insert(customViewWithOneNode);
          viewPort.insert(customViewWithTwoNodes);
          expect(viewPort.length).toBe(3);
          var detachedView = viewPort.detach(1);
          expect(detachedView).toBe(customViewWithOneNode);
          expect(textInViewPort()).toEqual('filler one two');
          expect(viewPort.length).toBe(2);
        }));
        it('should keep views hydration state during insert', (function() {
          var hydratedView = new HydrateAwareFakeView(true);
          var dehydratedView = new HydrateAwareFakeView(false);
          viewPort.insert(hydratedView);
          viewPort.insert(dehydratedView);
          expect(hydratedView.hydrated()).toBe(true);
          expect(dehydratedView.hydrated()).toBe(false);
        }));
        it('should dehydrate on remove', (function() {
          var hydratedView = new HydrateAwareFakeView(true);
          viewPort.insert(hydratedView);
          viewPort.remove();
          expect(hydratedView.hydrated()).toBe(false);
        }));
        it('should keep views hydration state during detach', (function() {
          var hydratedView = new HydrateAwareFakeView(true);
          var dehydratedView = new HydrateAwareFakeView(false);
          viewPort.insert(hydratedView);
          viewPort.insert(dehydratedView);
          expect(viewPort.detach().hydrated()).toBe(false);
          expect(viewPort.detach().hydrated()).toBe(true);
        }));
        it('should support adding/removing views with more than one node', (function() {
          viewPort.insert(customViewWithTwoNodes);
          viewPort.insert(customViewWithOneNode);
          expect(textInViewPort()).toEqual('filler one two single');
          viewPort.remove(1);
          expect(textInViewPort()).toEqual('filler single');
        }));
      }));
      describe('should update injectors and parent views.', (function() {
        var fancyView;
        beforeEach((function() {
          var parser = new Parser(new Lexer());
          viewPort.hydrate(new Injector([]), null);
          var pv = new ProtoView(el('<div class="ng-binding">{{}}</div>'), new DynamicProtoChangeDetector(), new NativeShadowDomStrategy());
          pv.bindElement(new ProtoElementInjector(null, 1, [SomeDirective]));
          pv.bindTextNode(0, parser.parseBinding('foo', null));
          fancyView = pv.instantiate(null);
        }));
        it('hydrating should update rootElementInjectors and parent change detector', (function() {
          viewPort.insert(fancyView);
          ListWrapper.forEach(fancyView.rootElementInjectors, (function(inj) {
            return expect(inj.parent).toBe(elementInjector);
          }));
          expect(parentView.changeDetector.children.length).toBe(1);
        }));
        it('dehydrating should update rootElementInjectors and parent change detector', (function() {
          viewPort.insert(fancyView);
          viewPort.remove();
          ListWrapper.forEach(fancyView.rootElementInjectors, (function(inj) {
            return expect(inj.parent).toBe(null);
          }));
          expect(parentView.changeDetector.children.length).toBe(0);
          expect(viewPort.length).toBe(0);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
    }, function($__m) {
      View = $__m.View;
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      proxy = $__m.proxy;
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      DOM = $__m.DOM;
      Node = $__m.Node;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
      ElementInjector = $__m.ElementInjector;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
      ChangeDetector = $__m.ChangeDetector;
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }],
    execute: function() {
      AttachableChangeDetector = (function() {
        var AttachableChangeDetector = function AttachableChangeDetector() {};
        return ($traceurRuntime.createClass)(AttachableChangeDetector, {
          remove: function() {
            this.parent = null;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, AttachableChangeDetector.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(AttachableChangeDetector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ChangeDetector)];
        }});
      HydrateAwareFakeView = (function() {
        var HydrateAwareFakeView = function HydrateAwareFakeView(isHydrated) {
          this.isHydrated = isHydrated;
          this.nodes = [DOM.createElement('div')];
          this.rootElementInjectors = [];
          this.changeDetector = new AttachableChangeDetector();
        };
        return ($traceurRuntime.createClass)(HydrateAwareFakeView, {
          hydrated: function() {
            return this.isHydrated;
          },
          hydrate: function(_, __, ___) {
            this.isHydrated = true;
          },
          dehydrate: function() {
            this.isHydrated = false;
          },
          noSuchMethod: function(i) {
            $traceurRuntime.superGet(this, HydrateAwareFakeView.prototype, "noSuchMethod").call(this, i);
          }
        }, {});
      }());
      Object.defineProperty(HydrateAwareFakeView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(View)];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {
          this.prop = 'foo';
        };
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/viewport_spec.map

//# sourceMappingURL=./viewport_spec.map