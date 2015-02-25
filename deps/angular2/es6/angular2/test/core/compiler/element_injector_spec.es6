import {assert} from "rtts_assert/rtts_assert";
import {describe,
  ddescribe,
  it,
  iit,
  xit,
  xdescribe,
  expect,
  beforeEach,
  SpyObject,
  proxy} from 'angular2/test_lib';
import {isBlank,
  isPresent,
  FIELD,
  IMPLEMENTS} from 'angular2/src/facade/lang';
import {ListWrapper,
  MapWrapper,
  List} from 'angular2/src/facade/collection';
import {ProtoElementInjector,
  PreBuiltObjects,
  DirectiveBinding} from 'angular2/src/core/compiler/element_injector';
import {Parent,
  Ancestor} from 'angular2/src/core/annotations/visibility';
import {EventEmitter} from 'angular2/src/core/annotations/events';
import {onDestroy} from 'angular2/src/core/annotations/annotations';
import {Injector,
  Inject,
  bind} from 'angular2/di';
import {View} from 'angular2/src/core/compiler/view';
import {ViewContainer} from 'angular2/src/core/compiler/view_container';
import {NgElement} from 'angular2/src/core/dom/element';
import {LightDom,
  SourceLightDom,
  DestinationLightDom} from 'angular2/src/core/compiler/shadow_dom_emulation/light_dom';
import {Directive} from 'angular2/src/core/annotations/annotations';
import {BindingPropagationConfig} from 'angular2/src/core/compiler/binding_propagation_config';
class DummyView extends SpyObject {
  noSuchMethod(m) {
    super.noSuchMethod(m);
  }
}
Object.defineProperty(DummyView, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(View)];
  }});
class DummyLightDom extends SpyObject {
  noSuchMethod(m) {
    super.noSuchMethod(m);
  }
}
Object.defineProperty(DummyLightDom, "annotations", {get: function() {
    return [new proxy, new IMPLEMENTS(LightDom)];
  }});
class SimpleDirective {}
class SomeOtherDirective {}
class NeedsDirective {
  constructor(dependency) {
    assert.argumentTypes(dependency, SimpleDirective);
    this.dependency = dependency;
  }
}
Object.defineProperty(NeedsDirective, "parameters", {get: function() {
    return [[SimpleDirective]];
  }});
class NeedDirectiveFromParent {
  constructor(dependency) {
    assert.argumentTypes(dependency, SimpleDirective);
    this.dependency = dependency;
  }
}
Object.defineProperty(NeedDirectiveFromParent, "parameters", {get: function() {
    return [[SimpleDirective, new Parent()]];
  }});
class NeedDirectiveFromAncestor {
  constructor(dependency) {
    assert.argumentTypes(dependency, SimpleDirective);
    this.dependency = dependency;
  }
}
Object.defineProperty(NeedDirectiveFromAncestor, "parameters", {get: function() {
    return [[SimpleDirective, new Ancestor()]];
  }});
class NeedsService {
  constructor(service) {
    this.service = service;
  }
}
Object.defineProperty(NeedsService, "parameters", {get: function() {
    return [[new Inject("service")]];
  }});
class NeedsEventEmitter {
  constructor(clickEmitter) {
    assert.argumentTypes(clickEmitter, Function);
    this.clickEmitter = clickEmitter;
  }
  click() {
    this.clickEmitter(null);
  }
}
Object.defineProperty(NeedsEventEmitter, "parameters", {get: function() {
    return [[Function, new EventEmitter('click')]];
  }});
class A_Needs_B {
  constructor(dep) {}
}
class B_Needs_A {
  constructor(dep) {}
}
class NeedsView {
  constructor(view) {
    this.view = view;
  }
}
Object.defineProperty(NeedsView, "parameters", {get: function() {
    return [[new Inject(View)]];
  }});
class DirectiveWithDestroy {
  constructor() {
    this.onDestroyCounter = 0;
  }
  onDestroy() {
    this.onDestroyCounter++;
  }
}
export function main() {
  var defaultPreBuiltObjects = new PreBuiltObjects(null, null, null, null, null);
  function humanize(tree, names) {
    var lookupName = (item) => ListWrapper.last(ListWrapper.find(names, (pair) => pair[0] === item));
    if (tree.children.length == 0)
      return lookupName(tree);
    var children = tree.children.map((m) => humanize(m, names));
    return [lookupName(tree), children];
  }
  Object.defineProperty(humanize, "parameters", {get: function() {
      return [[], [List]];
    }});
  function injector(bindings, lightDomAppInjector = null, shadowDomAppInjector = null, preBuiltObjects = null) {
    if (isBlank(lightDomAppInjector))
      lightDomAppInjector = new Injector([]);
    var proto = new ProtoElementInjector(null, 0, bindings, isPresent(shadowDomAppInjector));
    var inj = proto.instantiate(null, null, null);
    var preBuilt = isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
    inj.instantiateDirectives(lightDomAppInjector, shadowDomAppInjector, preBuilt);
    return inj;
  }
  function parentChildInjectors(parentBindings, childBindings, parentPreBuildObjects = null) {
    if (isBlank(parentPreBuildObjects))
      parentPreBuildObjects = defaultPreBuiltObjects;
    var inj = new Injector([]);
    var protoParent = new ProtoElementInjector(null, 0, parentBindings);
    var parent = protoParent.instantiate(null, null, null);
    parent.instantiateDirectives(inj, null, parentPreBuildObjects);
    var protoChild = new ProtoElementInjector(protoParent, 1, childBindings, false, 1);
    var child = protoChild.instantiate(parent, null, null);
    child.instantiateDirectives(inj, null, defaultPreBuiltObjects);
    return child;
  }
  function hostShadowInjectors(hostBindings, shadowBindings, hostPreBuildObjects = null) {
    if (isBlank(hostPreBuildObjects))
      hostPreBuildObjects = defaultPreBuiltObjects;
    var inj = new Injector([]);
    var shadowInj = inj.createChild([]);
    var protoParent = new ProtoElementInjector(null, 0, hostBindings, true);
    var host = protoParent.instantiate(null, null, null);
    host.instantiateDirectives(inj, shadowInj, hostPreBuildObjects);
    var protoChild = new ProtoElementInjector(protoParent, 0, shadowBindings, false, 1);
    var shadow = protoChild.instantiate(null, host, null);
    shadow.instantiateDirectives(shadowInj, null, null);
    return shadow;
  }
  describe("ProtoElementInjector", () => {
    describe("direct parent", () => {
      it("should return parent proto injector when distance is 1", () => {
        var distance = 1;
        var protoParent = new ProtoElementInjector(null, 0, []);
        var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
        expect(protoChild.directParent()).toEqual(protoParent);
      });
      it("should return null otherwise", () => {
        var distance = 2;
        var protoParent = new ProtoElementInjector(null, 0, []);
        var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
        expect(protoChild.directParent()).toEqual(null);
      });
    });
  });
  describe("ElementInjector", function() {
    describe("instantiate", function() {
      it("should create an element injector", function() {
        var protoParent = new ProtoElementInjector(null, 0, []);
        var protoChild1 = new ProtoElementInjector(protoParent, 1, []);
        var protoChild2 = new ProtoElementInjector(protoParent, 2, []);
        var p = protoParent.instantiate(null, null, null);
        var c1 = protoChild1.instantiate(p, null, null);
        var c2 = protoChild2.instantiate(p, null, null);
        expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']])).toEqual(["parent", ["child1", "child2"]]);
      });
      describe("direct parent", () => {
        it("should return parent injector when distance is 1", () => {
          var distance = 1;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          var p = protoParent.instantiate(null, null, null);
          var c = protoChild.instantiate(p, null, null);
          expect(c.directParent()).toEqual(p);
        });
        it("should return null otherwise", () => {
          var distance = 2;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          var p = protoParent.instantiate(null, null, null);
          var c = protoChild.instantiate(p, null, null);
          expect(c.directParent()).toEqual(null);
        });
      });
    });
    describe("hasBindings", function() {
      it("should be true when there are bindings", function() {
        var p = new ProtoElementInjector(null, 0, [SimpleDirective]);
        expect(p.hasBindings).toBeTruthy();
      });
      it("should be false otherwise", function() {
        var p = new ProtoElementInjector(null, 0, []);
        expect(p.hasBindings).toBeFalsy();
      });
    });
    describe("hasInstances", function() {
      it("should be false when no directives are instantiated", function() {
        expect(injector([]).hasInstances()).toBe(false);
      });
      it("should be true when directives are instantiated", function() {
        expect(injector([SimpleDirective]).hasInstances()).toBe(true);
      });
    });
    describe("instantiateDirectives", function() {
      it("should instantiate directives that have no dependencies", function() {
        var inj = injector([SimpleDirective]);
        expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
      });
      it("should instantiate directives that depend on other directives", function() {
        var inj = injector([SimpleDirective, NeedsDirective]);
        var d = inj.get(NeedsDirective);
        expect(d).toBeAnInstanceOf(NeedsDirective);
        expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
      });
      it("should instantiate directives that depend on app services", function() {
        var appInjector = new Injector([bind("service").toValue("service")]);
        var inj = injector([NeedsService], appInjector);
        var d = inj.get(NeedsService);
        expect(d).toBeAnInstanceOf(NeedsService);
        expect(d.service).toEqual("service");
      });
      it("should instantiate directives that depend on pre built objects", function() {
        var view = new DummyView();
        var inj = injector([NeedsView], null, null, new PreBuiltObjects(view, null, null, null, null));
        expect(inj.get(NeedsView).view).toBe(view);
      });
      it("should instantiate directives that depend on the containing component", function() {
        var shadow = hostShadowInjectors([SimpleDirective], [NeedsDirective]);
        var d = shadow.get(NeedsDirective);
        expect(d).toBeAnInstanceOf(NeedsDirective);
        expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
      });
      it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", () => {
        expect(() => {
          hostShadowInjectors([SomeOtherDirective, SimpleDirective], [NeedsDirective]);
        }).toThrowError('No provider for SimpleDirective! (NeedsDirective -> SimpleDirective)');
      });
      it("should instantiate component directives that depend on app services in the shadow app injector", () => {
        var shadowAppInjector = new Injector([bind("service").toValue("service")]);
        var inj = injector([NeedsService], null, shadowAppInjector);
        var d = inj.get(NeedsService);
        expect(d).toBeAnInstanceOf(NeedsService);
        expect(d.service).toEqual("service");
      });
      it("should not instantiate other directives that depend on app services in the shadow app injector", () => {
        var shadowAppInjector = new Injector([bind("service").toValue("service")]);
        expect(() => {
          injector([SomeOtherDirective, NeedsService], null, shadowAppInjector);
        }).toThrowError('No provider for service! (NeedsService -> service)');
      });
      it("should return app services", function() {
        var appInjector = new Injector([bind("service").toValue("service")]);
        var inj = injector([], appInjector);
        expect(inj.get('service')).toEqual('service');
      });
      it("should get directives from parent", function() {
        var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromParent]);
        var d = child.get(NeedDirectiveFromParent);
        expect(d).toBeAnInstanceOf(NeedDirectiveFromParent);
        expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
      });
      it("should not return parent's directives on self", function() {
        expect(() => {
          injector([SimpleDirective, NeedDirectiveFromParent]);
        }).toThrowError();
      });
      it("should get directives from ancestor", function() {
        var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromAncestor]);
        var d = child.get(NeedDirectiveFromAncestor);
        expect(d).toBeAnInstanceOf(NeedDirectiveFromAncestor);
        expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
      });
      it("should throw when no SimpleDirective found", function() {
        expect(() => injector([NeedDirectiveFromParent])).toThrowError('No provider for SimpleDirective! (NeedDirectiveFromParent -> SimpleDirective)');
      });
      it("should accept SimpleDirective bindings instead of SimpleDirective types", function() {
        var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
        expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
      });
      it("should allow for direct access using getDirectiveAtIndex", function() {
        var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
        expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
        expect(() => inj.getDirectiveAtIndex(-1)).toThrowError('Index -1 is out-of-bounds.');
        expect(() => inj.getDirectiveAtIndex(10)).toThrowError('Index 10 is out-of-bounds.');
      });
      it("should allow for direct access using getBindingAtIndex", function() {
        var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
        expect(inj.getDirectiveBindingAtIndex(0)).toBeAnInstanceOf(DirectiveBinding);
        expect(() => inj.getDirectiveBindingAtIndex(-1)).toThrowError('Index -1 is out-of-bounds.');
        expect(() => inj.getDirectiveBindingAtIndex(10)).toThrowError('Index 10 is out-of-bounds.');
      });
      it("should handle cyclic dependencies", function() {
        expect(() => {
          var bAneedsB = bind(A_Needs_B).toFactory((a) => new A_Needs_B(a), [B_Needs_A]);
          var bBneedsA = bind(B_Needs_A).toFactory((a) => new B_Needs_A(a), [A_Needs_B]);
          injector([DirectiveBinding.createFromBinding(bAneedsB, null), DirectiveBinding.createFromBinding(bBneedsA, null)]);
        }).toThrowError('Cannot instantiate cyclic dependency! ' + '(A_Needs_B -> B_Needs_A -> A_Needs_B)');
      });
      it("should call onDestroy on directives subscribed to this event", function() {
        var inj = injector([DirectiveBinding.createFromType(DirectiveWithDestroy, new Directive({lifecycle: [onDestroy]}))]);
        var destroy = inj.get(DirectiveWithDestroy);
        inj.clearDirectives();
        expect(destroy.onDestroyCounter).toBe(1);
      });
    });
    describe("pre built objects", function() {
      it("should return view", function() {
        var view = new DummyView();
        var inj = injector([], null, null, new PreBuiltObjects(view, null, null, null, null));
        expect(inj.get(View)).toEqual(view);
      });
      it("should return element", function() {
        var element = new NgElement(null);
        var inj = injector([], null, null, new PreBuiltObjects(null, element, null, null, null));
        expect(inj.get(NgElement)).toEqual(element);
      });
      it('should return viewContainer', function() {
        var viewContainer = new ViewContainer(null, null, null, null, null);
        var inj = injector([], null, null, new PreBuiltObjects(null, null, viewContainer, null, null));
        expect(inj.get(ViewContainer)).toEqual(viewContainer);
      });
      it('should return bindingPropagationConfig', function() {
        var config = new BindingPropagationConfig(null);
        var inj = injector([], null, null, new PreBuiltObjects(null, null, null, null, config));
        expect(inj.get(BindingPropagationConfig)).toEqual(config);
      });
      describe("light DOM", () => {
        var lightDom,
            parentPreBuiltObjects;
        beforeEach(() => {
          lightDom = new DummyLightDom();
          parentPreBuiltObjects = new PreBuiltObjects(null, null, null, lightDom, null);
        });
        it("should return destination light DOM from the parent's injector", function() {
          var child = parentChildInjectors([], [], parentPreBuiltObjects);
          expect(child.get(DestinationLightDom)).toEqual(lightDom);
        });
        it("should return null when parent's injector is a component boundary", function() {
          var child = hostShadowInjectors([], [], parentPreBuiltObjects);
          expect(child.get(DestinationLightDom)).toBeNull();
        });
        it("should return source light DOM from the closest component boundary", function() {
          var child = hostShadowInjectors([], [], parentPreBuiltObjects);
          expect(child.get(SourceLightDom)).toEqual(lightDom);
        });
      });
    });
    describe('event emitters', () => {
      it('should be injectable and callable', () => {
        var inj = injector([NeedsEventEmitter]);
        inj.get(NeedsEventEmitter).click();
      });
      it('should be queryable through hasEventEmitter', () => {
        var inj = injector([NeedsEventEmitter]);
        expect(inj.hasEventEmitter('click')).toBe(true);
        expect(inj.hasEventEmitter('move')).toBe(false);
      });
    });
  });
}

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/element_injector_spec.map

//# sourceMappingURL=./element_injector_spec.map