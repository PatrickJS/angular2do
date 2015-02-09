System.register("angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec", ["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/dom", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template_config", "angular2/src/core/compiler/viewport", "angular2/src/facade/collection", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec";
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
      LifeCycle,
      DirectiveMetadataReader,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      EmulatedShadowDomStrategy,
      TemplateLoader,
      Decorator,
      Component,
      Template,
      TemplateConfig,
      ViewPort,
      StringMapWrapper,
      MapWrapper,
      XHRMock,
      TestDirectiveMetadataReader,
      ManualTemplateDirective,
      AutoTemplateDirective,
      Simple,
      MultipleContentTagsComponent,
      ConditionalContentComponent,
      OuterWithIndirectNestedComponent,
      OuterComponent,
      InnerComponent,
      InnerInnerComponent,
      MyComp;
  function main() {
    describe('integration tests', function() {
      StringMapWrapper.forEach({
        "native": new NativeShadowDomStrategy(),
        "emulated": new EmulatedShadowDomStrategy()
      }, (function(strategy, name) {
        describe((name + " shadow dom strategy"), (function() {
          var compiler;
          beforeEach((function() {
            compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(new XHRMock()), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), strategy);
          }));
          function compile(template, assertions) {
            compiler.compile(MyComp, el(template)).then(createView).then((function(view) {
              var lc = new LifeCycle(view.changeDetector, false);
              assertions(view, lc);
            }));
          }
          it('should support multiple content tags', (function(done) {
            var temp = '<multiple-content-tags>' + '<div>B</div>' + '<div>C</div>' + '<div class="left">A</div>' + '</multiple-content-tags>';
            compile(temp, (function(view, lc) {
              expect(view.nodes).toHaveText('(A, BC)');
              done();
            }));
          }));
          it('should redistribute only direct children', (function(done) {
            var temp = '<multiple-content-tags>' + '<div>B<div class="left">A</div></div>' + '<div>C</div>' + '</multiple-content-tags>';
            compile(temp, (function(view, lc) {
              expect(view.nodes).toHaveText('(, BAC)');
              done();
            }));
          }));
          it("should redistribute when the light dom changes", (function(done) {
            var temp = '<multiple-content-tags>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '</multiple-content-tags>';
            compile(temp, (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualTemplateDirective);
              expect(view.nodes).toHaveText('(, B)');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('(A, B)');
              dir.hide();
              lc.tick();
              expect(view.nodes).toHaveText('(, B)');
              done();
            }));
          }));
          it("should support nested components", (function(done) {
            var temp = '<outer-with-indirect-nested>' + '<div>A</div>' + '<div>B</div>' + '</outer-with-indirect-nested>';
            compile(temp, (function(view, lc) {
              expect(view.nodes).toHaveText('OUTER(SIMPLE(AB))');
              done();
            }));
          }));
          it("should support nesting with content being direct child of a nested component", (function(done) {
            var temp = '<outer>' + '<div template="manual" class="left">A</div>' + '<div>B</div>' + '<div>C</div>' + '</outer>';
            compile(temp, (function(view, lc) {
              var dir = view.elementInjectors[1].get(ManualTemplateDirective);
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
              dir.show();
              lc.tick();
              expect(view.nodes).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
              done();
            }));
          }));
        }));
      }));
    });
  }
  function createView(pv) {
    var view = pv.instantiate(null);
    view.hydrate(new Injector([]), null, {});
    return view;
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
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedShadowDomStrategy = $__m.EmulatedShadowDomStrategy;
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
      StringMapWrapper = $__m.StringMapWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      TestDirectiveMetadataReader = (function($__super) {
        var TestDirectiveMetadataReader = function TestDirectiveMetadataReader(shadowDomStrategy) {
          $traceurRuntime.superConstructor(TestDirectiveMetadataReader).call(this);
          this.shadowDomStrategy = shadowDomStrategy;
        };
        return ($traceurRuntime.createClass)(TestDirectiveMetadataReader, {parseShadowDomStrategy: function(annotation) {
            assert.argumentTypes(annotation, Component);
            return assert.returnType((this.shadowDomStrategy), ShadowDomStrategy);
          }}, {}, $__super);
      }(DirectiveMetadataReader));
      Object.defineProperty(TestDirectiveMetadataReader.prototype.parseShadowDomStrategy, "parameters", {get: function() {
          return [[Component]];
        }});
      ManualTemplateDirective = (function() {
        var ManualTemplateDirective = function ManualTemplateDirective(viewPort) {
          assert.argumentTypes(viewPort, ViewPort);
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(ManualTemplateDirective, {
          show: function() {
            this.viewPort.create();
          },
          hide: function() {
            this.viewPort.remove(0);
          }
        }, {});
      }());
      Object.defineProperty(ManualTemplateDirective, "annotations", {get: function() {
          return [new Template({selector: '[manual]'})];
        }});
      Object.defineProperty(ManualTemplateDirective, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      AutoTemplateDirective = (function() {
        var AutoTemplateDirective = function AutoTemplateDirective(viewPort) {
          assert.argumentTypes(viewPort, ViewPort);
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(AutoTemplateDirective, {set auto(newValue) {
            assert.argumentTypes(newValue, assert.type.boolean);
            if (newValue) {
              this.viewPort.create();
            } else {
              this.viewPort.remove(0);
            }
          }}, {});
      }());
      Object.defineProperty(AutoTemplateDirective, "annotations", {get: function() {
          return [new Template({
            selector: '[auto]',
            bind: {'auto': 'auto'}
          })];
        }});
      Object.defineProperty(AutoTemplateDirective, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(AutoTemplateDirective.prototype, "auto").set, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Simple = (function() {
        var Simple = function Simple() {};
        return ($traceurRuntime.createClass)(Simple, {}, {});
      }());
      Object.defineProperty(Simple, "annotations", {get: function() {
          return [new Component({
            selector: 'simple',
            template: new TemplateConfig({inline: 'SIMPLE(<content></content>)'})
          })];
        }});
      MultipleContentTagsComponent = (function() {
        var MultipleContentTagsComponent = function MultipleContentTagsComponent() {};
        return ($traceurRuntime.createClass)(MultipleContentTagsComponent, {}, {});
      }());
      Object.defineProperty(MultipleContentTagsComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'multiple-content-tags',
            template: new TemplateConfig({inline: '(<content select=".left"></content>, <content></content>)'})
          })];
        }});
      ConditionalContentComponent = (function() {
        var ConditionalContentComponent = function ConditionalContentComponent() {
          this.cond = false;
        };
        return ($traceurRuntime.createClass)(ConditionalContentComponent, {
          showLeft: function() {
            this.cond = true;
          },
          hideLeft: function() {
            this.cond = false;
          }
        }, {});
      }());
      Object.defineProperty(ConditionalContentComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'conditional-content',
            template: new TemplateConfig({
              inline: '<div>(<div template="auto: cond"><content select=".left"></content></div>, <content></content>)</div>',
              directives: [AutoTemplateDirective]
            })
          })];
        }});
      OuterWithIndirectNestedComponent = (function() {
        var OuterWithIndirectNestedComponent = function OuterWithIndirectNestedComponent() {};
        return ($traceurRuntime.createClass)(OuterWithIndirectNestedComponent, {}, {});
      }());
      Object.defineProperty(OuterWithIndirectNestedComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'outer-with-indirect-nested',
            template: new TemplateConfig({
              inline: 'OUTER(<simple><div><content></content></div></simple>)',
              directives: [Simple]
            })
          })];
        }});
      OuterComponent = (function() {
        var OuterComponent = function OuterComponent() {};
        return ($traceurRuntime.createClass)(OuterComponent, {}, {});
      }());
      Object.defineProperty(OuterComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'outer',
            template: new TemplateConfig({
              inline: 'OUTER(<inner><content></content></inner>)',
              directives: [InnerComponent]
            })
          })];
        }});
      InnerComponent = (function() {
        var InnerComponent = function InnerComponent() {};
        return ($traceurRuntime.createClass)(InnerComponent, {}, {});
      }());
      Object.defineProperty(InnerComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'inner',
            template: new TemplateConfig({
              inline: 'INNER(<innerinner><content></content></innerinner>)',
              directives: [InnerInnerComponent]
            })
          })];
        }});
      InnerInnerComponent = (function() {
        var InnerInnerComponent = function InnerInnerComponent() {};
        return ($traceurRuntime.createClass)(InnerInnerComponent, {}, {});
      }());
      Object.defineProperty(InnerInnerComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'innerinner',
            template: new TemplateConfig({inline: 'INNERINNER(<content select=".left"></content>,<content></content>)'})
          })];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {};
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({
            selector: 'my-comp',
            template: new TemplateConfig({directives: [MultipleContentTagsComponent, ManualTemplateDirective, ConditionalContentComponent, OuterWithIndirectNestedComponent, OuterComponent]})
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/shadow_dom/shadow_dom_emulation_integration_spec.map

//# sourceMappingURL=./shadow_dom_emulation_integration_spec.map