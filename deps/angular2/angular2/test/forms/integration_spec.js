System.register("angular2/test/forms/integration_spec", ["angular2/test_lib", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/di", "angular2/src/facade/dom", "angular2/core", "angular2/forms", "angular2/src/core/compiler/template_loader", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/forms/integration_spec";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      queryView,
      dispatchEvent,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      Injector,
      DOM,
      Component,
      TemplateConfig,
      ControlDirective,
      ControlNameDirective,
      ControlGroupDirective,
      NewControlGroupDirective,
      Control,
      ControlGroup,
      TemplateLoader,
      XHRMock,
      MyComp;
  function main() {
    function detectChanges(view) {
      view.changeDetector.detectChanges();
    }
    function compile(componentType, template, context, callback) {
      var compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(new XHRMock()), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy());
      compiler.compile(componentType, el(template)).then((function(pv) {
        var view = pv.instantiate(null);
        view.hydrate(new Injector([]), null, context);
        detectChanges(view);
        callback(view);
      }));
    }
    function formComponent(view) {
      return view.elementInjectors[0].getComponent();
    }
    describe("integration tests", (function() {
      it("should initialize DOM elements with the given form object", (function(done) {
        var ctx = new MyComp(new ControlGroup({"login": new Control("loginValue")}));
        var t = "<div [control-group]=\"form\">\n                <input [control-name]=\"'login'\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("loginValue");
          done();
        }));
      }));
      it("should update the control group values on DOM change", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input [control-name]=\"'login'\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          input.value = "updatedValue";
          dispatchEvent(input, "change");
          expect(form.value).toEqual({"login": "updatedValue"});
          done();
        }));
      }));
      it("should update DOM elements when rebinding the control group", (function(done) {
        var form = new ControlGroup({"login": new Control("oldValue")});
        var ctx = new MyComp(form);
        var t = "<div [control-group]=\"form\">\n                <input [control-name]=\"'login'\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          ctx.form = new ControlGroup({"login": new Control("newValue")});
          detectChanges(view);
          var input = queryView(view, "input");
          expect(input.value).toEqual("newValue");
          done();
        }));
      }));
      it("should update DOM element when rebinding the control name", (function(done) {
        var ctx = new MyComp(new ControlGroup({
          "one": new Control("one"),
          "two": new Control("two")
        }), "one");
        var t = "<div [control-group]=\"form\">\n                <input [control-name]=\"name\">\n              </div>";
        compile(MyComp, t, ctx, (function(view) {
          var input = queryView(view, "input");
          expect(input.value).toEqual("one");
          ctx.name = "two";
          detectChanges(view);
          expect(input.value).toEqual("two");
          done();
        }));
      }));
      describe("declarative forms", (function() {
        it("should initialize dom elements", (function(done) {
          var t = "<div [new-control-group]=\"{'login': 'loginValue', 'password':'passValue'}\">\n                  <input id=\"login\" [control]=\"'login'\">\n                  <input id=\"password\" [control]=\"'password'\">\n                </div>";
          compile(MyComp, t, new MyComp(), (function(view) {
            var loginInput = queryView(view, "#login");
            expect(loginInput.value).toEqual("loginValue");
            var passInput = queryView(view, "#password");
            expect(passInput.value).toEqual("passValue");
            done();
          }));
        }));
        it("should update the control group values on DOM change", (function(done) {
          var t = "<div [new-control-group]=\"{'login': 'loginValue'}\">\n                  <input [control]=\"'login'\">\n                </div>";
          compile(MyComp, t, new MyComp(), (function(view) {
            var input = queryView(view, "input");
            input.value = "updatedValue";
            dispatchEvent(input, "change");
            expect(formComponent(view).value).toEqual({'login': 'updatedValue'});
            done();
          }));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
      queryView = $__m.queryView;
      dispatchEvent = $__m.dispatchEvent;
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
      Injector = $__m.Injector;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Component = $__m.Component;
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      ControlDirective = $__m.ControlDirective;
      ControlNameDirective = $__m.ControlNameDirective;
      ControlGroupDirective = $__m.ControlGroupDirective;
      NewControlGroupDirective = $__m.NewControlGroupDirective;
      Control = $__m.Control;
      ControlGroup = $__m.ControlGroup;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      MyComp = (function() {
        var MyComp = function MyComp() {
          var form = arguments[0] !== (void 0) ? arguments[0] : null;
          var name = arguments[1] !== (void 0) ? arguments[1] : null;
          this.form = form;
          this.name = name;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({
            selector: "my-comp",
            template: new TemplateConfig({
              inline: "",
              directives: [ControlGroupDirective, ControlNameDirective, ControlDirective, NewControlGroupDirective]
            })
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/forms/integration_spec.map

//# sourceMappingURL=./integration_spec.map