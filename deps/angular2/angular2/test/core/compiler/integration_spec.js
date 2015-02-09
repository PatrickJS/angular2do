System.register("angular2/test/core/compiler/integration_spec", ["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template_config", "angular2/src/core/compiler/viewport", "angular2/src/facade/collection", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/integration_spec";
  var assert,
      describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      DOM,
      Injector,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      Decorator,
      Component,
      Template,
      TemplateConfig,
      ViewPort,
      MapWrapper,
      XHRMock,
      MyDir,
      MyComp,
      ChildComp,
      SomeTemplate,
      MyService;
  function main() {
    describe('integration tests', function() {
      var compiler;
      beforeEach((function() {
        compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(new XHRMock()), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy());
      }));
      describe('react to record changes', function() {
        var view,
            ctx,
            cd;
        function createView(pv) {
          ctx = new MyComp();
          view = pv.instantiate(null);
          view.hydrate(new Injector([]), null, ctx);
          cd = view.changeDetector;
        }
        it('should consume text node changes', (function(done) {
          compiler.compile(MyComp, el('<div>{{ctxProp}}</div>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume element binding changes', (function(done) {
          compiler.compile(MyComp, el('<div [id]="ctxProp"></div>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('Hello World!');
            done();
          }));
        }));
        it('should consume directive watch expression change.', (function(done) {
          var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
          compiler.compile(MyComp, el(tpl)).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
            expect(view.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
            done();
          }));
        }));
        it('should support nested components.', (function(done) {
          compiler.compile(MyComp, el('<child-cmp></child-cmp>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
            done();
          }));
        }));
        it('should support different directive types on a single node', (function(done) {
          compiler.compile(MyComp, el('<child-cmp my-dir [elprop]="ctxProp"></child-cmp>')).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            var elInj = view.elementInjectors[0];
            expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
            expect(elInj.get(ChildComp).dirProp).toEqual(null);
            done();
          }));
        }));
        it('should support template directives via `<template>` elements.', (function(done) {
          compiler.compile(MyComp, el('<div><template some-tmplate var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
        it('should support template directives via `template` attribute.', (function(done) {
          compiler.compile(MyComp, el('<div><copy-me template="some-tmplate: var greeting=some-tmpl">{{greeting}}</copy-me></div>')).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            done();
          }));
        }));
        it('should assign the component instance to a var-', (function(done) {
          compiler.compile(MyComp, el('<p><child-cmp var-alice></child-cmp></p>')).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            done();
          }));
        }));
        it('should assign two component instances each with a var-', (function(done) {
          var element = el('<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>');
          compiler.compile(MyComp, element).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('bob')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('alice')).not.toBe(view.contextWithLocals.get('bob'));
            done();
          }));
        }));
        it('should assign the component instance to a var- with shorthand syntax', (function(done) {
          compiler.compile(MyComp, el('<child-cmp #alice></child-cmp>')).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            done();
          }));
        }));
        it('should assign the element instance to a user-defined variable', (function(done) {
          var element = el('<p></p>');
          var div = el('<div var-alice></div>');
          DOM.appendChild(div, el('<i>Hello</i>'));
          DOM.appendChild(element, div);
          compiler.compile(MyComp, element).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            var value = view.contextWithLocals.get('alice');
            expect(value).not.toBe(null);
            expect(value.tagName).toEqual('DIV');
            done();
          }));
        }));
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      ChangeDetector = $__m.ChangeDetector;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Template = $__m.Template;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      MyDir = (function() {
        var MyDir = function MyDir() {
          this.dirProp = '';
        };
        return ($traceurRuntime.createClass)(MyDir, {}, {});
      }());
      Object.defineProperty(MyDir, "annotations", {get: function() {
          return [new Decorator({
            selector: '[my-dir]',
            bind: {'elprop': 'dirProp'}
          })];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.ctxProp = 'initial value';
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({directives: [MyDir, ChildComp, SomeTemplate]})})];
        }});
      ChildComp = (function() {
        var ChildComp = function ChildComp(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp, {}, {});
      }());
      Object.defineProperty(ChildComp, "annotations", {get: function() {
          return [new Component({
            selector: 'child-cmp',
            componentServices: [MyService],
            template: new TemplateConfig({
              directives: [MyDir],
              inline: '{{ctxProp}}'
            })
          })];
        }});
      Object.defineProperty(ChildComp, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeTemplate = (function() {
        var SomeTemplate = function SomeTemplate(viewPort) {
          assert.argumentTypes(viewPort, ViewPort);
          viewPort.create().setLocal('some-tmpl', 'hello');
          viewPort.create().setLocal('some-tmpl', 'again');
        };
        return ($traceurRuntime.createClass)(SomeTemplate, {}, {});
      }());
      Object.defineProperty(SomeTemplate, "annotations", {get: function() {
          return [new Template({selector: '[some-tmplate]'})];
        }});
      Object.defineProperty(SomeTemplate, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      MyService = (function() {
        var MyService = function MyService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(MyService, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/integration_spec.map

//# sourceMappingURL=./integration_spec.map