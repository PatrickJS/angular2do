System.register("angular2/test/core/compiler/compiler_spec", ["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/view", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template_config", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/template_loader", "angular2/change_detection", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/compiler_spec";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      el,
      IS_DARTIUM,
      DOM,
      Element,
      TemplateElement,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      Type,
      isBlank,
      PromiseWrapper,
      Compiler,
      CompilerCache,
      ProtoView,
      DirectiveMetadataReader,
      DirectiveMetadata,
      Component,
      TemplateConfig,
      CompileElement,
      CompileStep,
      CompileControl,
      TemplateLoader,
      Lexer,
      Parser,
      dynamicChangeDetection,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      XHRMock,
      XHRParentComponent,
      MainComponent,
      NestedComponent,
      RecursiveComponent,
      TestableCompiler,
      MockStep,
      FakeShadowDomStrategy;
  function main() {
    describe('compiler', function() {
      var reader;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
      }));
      function createCompiler(processClosure) {
        var strategy = arguments[1] !== (void 0) ? arguments[1] : null;
        var xhr = arguments[2] !== (void 0) ? arguments[2] : null;
        assert.argumentTypes(processClosure, assert.type.any, strategy, ShadowDomStrategy, xhr, XHRMock);
        var steps = [new MockStep(processClosure)];
        if (isBlank(strategy)) {
          strategy = new NativeShadowDomStrategy();
        }
        if (isBlank(xhr)) {
          xhr = new XHRMock();
        }
        return new TestableCompiler(reader, steps, strategy, xhr);
      }
      Object.defineProperty(createCompiler, "parameters", {get: function() {
          return [[], [ShadowDomStrategy], [XHRMock]];
        }});
      it('should run the steps and return the ProtoView of the root element', (function(done) {
        var rootProtoView = new ProtoView(null, null, null);
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = rootProtoView;
        }));
        compiler.compile(MainComponent, el('<div></div>')).then((function(protoView) {
          expect(protoView).toBe(rootProtoView);
          done();
        }));
      }));
      it('should use the given element', (function(done) {
        var element = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
        }));
        compiler.compile(MainComponent, element).then((function(protoView) {
          expect(protoView.element).toBe(element);
          done();
        }));
      }));
      it('should use the inline template if no element is given explicitly', (function(done) {
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
        }));
        compiler.compile(MainComponent, null).then((function(protoView) {
          expect(DOM.getInnerHTML(protoView.element)).toEqual('inline component');
          done();
        }));
      }));
      it('should use the shadow dom strategy to process the template', (function(done) {
        if (IS_DARTIUM) {
          done();
          return ;
        }
        var templateHtml = 'processed template';
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
        }), new FakeShadowDomStrategy(templateHtml));
        compiler.compile(MainComponent, null).then((function(protoView) {
          expect(DOM.getInnerHTML(protoView.element)).toEqual('processed template');
          done();
        }));
      }));
      it('should load nested components', (function(done) {
        var mainEl = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
          current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
          if (current.element === mainEl) {
            current.componentDirective = reader.read(NestedComponent);
          }
        }));
        compiler.compile(MainComponent, mainEl).then((function(protoView) {
          var nestedView = protoView.elementBinders[0].nestedProtoView;
          expect(DOM.getInnerHTML(nestedView.element)).toEqual('nested component');
          done();
        }));
      }));
      it('should cache compiled components', (function(done) {
        var element = el('<div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
        }));
        var firstProtoView;
        compiler.compile(MainComponent, element).then((function(protoView) {
          firstProtoView = protoView;
          return compiler.compile(MainComponent, element);
        })).then((function(protoView) {
          expect(firstProtoView).toBe(protoView);
          done();
        }));
      }));
      it('should re-use components being compiled', (function(done) {
        var nestedElBinders = [];
        var mainEl = el('<div><div class="nested"></div><div class="nested"></div></div>');
        var compiler = createCompiler((function(parent, current, control) {
          if (DOM.hasClass(current.element, 'nested')) {
            current.inheritedProtoView = new ProtoView(current.element, null, null);
            current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
            current.componentDirective = reader.read(NestedComponent);
            ListWrapper.push(nestedElBinders, current.inheritedElementBinder);
          }
        }));
        compiler.compile(MainComponent, mainEl).then((function(protoView) {
          expect(nestedElBinders[0].nestedProtoView).toBe(nestedElBinders[1].nestedProtoView);
          done();
        }));
      }));
      it('should allow recursive components', (function(done) {
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(current.element, null, null);
          current.inheritedElementBinder = current.inheritedProtoView.bindElement(null);
          current.componentDirective = reader.read(RecursiveComponent);
        }));
        compiler.compile(RecursiveComponent, null).then((function(protoView) {
          expect(protoView.elementBinders[0].nestedProtoView).toBe(protoView);
          done();
        }));
      }));
      describe('XHR', (function() {
        it('should load template via xhr', (function(done) {
          var xhr = new XHRMock();
          xhr.expect('/parent', 'xhr');
          var compiler = createCompiler((function(parent, current, control) {
            current.inheritedProtoView = new ProtoView(current.element, null, null);
          }), null, xhr);
          compiler.compile(XHRParentComponent).then((function(protoView) {
            expect(DOM.getInnerHTML(protoView.element)).toEqual('xhr');
            done();
          }));
          xhr.flush();
        }));
        it('should return a rejected promise when loading a template fails', (function(done) {
          var xhr = new XHRMock();
          xhr.expect('/parent', null);
          var compiler = createCompiler((function(parent, current, control) {}), null, xhr);
          PromiseWrapper.then(compiler.compile(XHRParentComponent), function(_) {
            throw 'Failure expected';
          }, function(e) {
            expect(e.message).toEqual('Failed to load the template for XHRParentComponent');
            done();
          });
          xhr.flush();
        }));
      }));
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
      TemplateElement = $__m.TemplateElement;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      XHRParentComponent = (function() {
        var XHRParentComponent = function XHRParentComponent() {};
        return ($traceurRuntime.createClass)(XHRParentComponent, {}, {});
      }());
      Object.defineProperty(XHRParentComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({url: '/parent'})})];
        }});
      MainComponent = (function() {
        var MainComponent = function MainComponent() {};
        return ($traceurRuntime.createClass)(MainComponent, {}, {});
      }());
      Object.defineProperty(MainComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({inline: 'inline component'})})];
        }});
      NestedComponent = (function() {
        var NestedComponent = function NestedComponent() {};
        return ($traceurRuntime.createClass)(NestedComponent, {}, {});
      }());
      Object.defineProperty(NestedComponent, "annotations", {get: function() {
          return [new Component({template: new TemplateConfig({inline: 'nested component'})})];
        }});
      RecursiveComponent = (function() {
        var RecursiveComponent = function RecursiveComponent() {};
        return ($traceurRuntime.createClass)(RecursiveComponent, {}, {});
      }());
      Object.defineProperty(RecursiveComponent, "annotations", {get: function() {
          return [new Component({
            template: new TemplateConfig({inline: '<div rec-comp></div>'}),
            selector: 'rec-comp'
          })];
        }});
      TestableCompiler = (function($__super) {
        var TestableCompiler = function TestableCompiler(reader, steps, strategy, xhr) {
          assert.argumentTypes(reader, DirectiveMetadataReader, steps, assert.genericType(List, CompileStep), strategy, ShadowDomStrategy, xhr, XHRMock);
          $traceurRuntime.superConstructor(TestableCompiler).call(this, dynamicChangeDetection, new TemplateLoader(xhr), reader, new Parser(new Lexer()), new CompilerCache(), strategy);
          this.steps = steps;
        };
        return ($traceurRuntime.createClass)(TestableCompiler, {createSteps: function(component) {
            return assert.returnType((this.steps), assert.genericType(List, CompileStep));
          }}, {}, $__super);
      }(Compiler));
      Object.defineProperty(TestableCompiler, "parameters", {get: function() {
          return [[DirectiveMetadataReader], [assert.genericType(List, CompileStep)], [ShadowDomStrategy], [XHRMock]];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      FakeShadowDomStrategy = (function($__super) {
        var FakeShadowDomStrategy = function FakeShadowDomStrategy(templateHtml) {
          assert.argumentTypes(templateHtml, assert.type.string);
          $traceurRuntime.superConstructor(FakeShadowDomStrategy).call(this);
          this.templateHtml = templateHtml;
        };
        return ($traceurRuntime.createClass)(FakeShadowDomStrategy, {processTemplate: function(template, cmpMetadata) {
            assert.argumentTypes(template, Element, cmpMetadata, DirectiveMetadata);
            DOM.setInnerHTML(template, this.templateHtml);
          }}, {}, $__super);
      }(NativeShadowDomStrategy));
      Object.defineProperty(FakeShadowDomStrategy, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeShadowDomStrategy.prototype.processTemplate, "parameters", {get: function() {
          return [[Element], [DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/compiler_spec.map

//# sourceMappingURL=./compiler_spec.map