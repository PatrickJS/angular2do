import {assert} from "rtts_assert/rtts_assert";
import {ddescribe,
  describe,
  it,
  iit,
  xit,
  expect,
  beforeEach,
  afterEach,
  el,
  queryView,
  dispatchEvent} from 'angular2/test_lib';
import {Lexer,
  Parser,
  ChangeDetector,
  dynamicChangeDetection} from 'angular2/change_detection';
import {Compiler,
  CompilerCache} from 'angular2/src/core/compiler/compiler';
import {DirectiveMetadataReader} from 'angular2/src/core/compiler/directive_metadata_reader';
import {NativeShadowDomStrategy} from 'angular2/src/core/compiler/shadow_dom_strategy';
import {TemplateLoader} from 'angular2/src/core/compiler/template_loader';
import {MockTemplateResolver} from 'angular2/src/mock/template_resolver_mock';
import {Injector} from 'angular2/di';
import {Component,
  Decorator,
  Template} from 'angular2/core';
import {ControlGroupDirective,
  ControlNameDirective,
  ControlDirective,
  NewControlGroupDirective,
  Control,
  ControlGroup,
  ControlValueAccessor} from 'angular2/forms';
export function main() {
  function detectChanges(view) {
    view.changeDetector.detectChanges();
  }
  function compile(componentType, template, context, callback) {
    var tplResolver = new MockTemplateResolver();
    var compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(), tplResolver);
    tplResolver.setTemplate(componentType, new Template({
      inline: template,
      directives: [ControlGroupDirective, ControlNameDirective, ControlDirective, NewControlGroupDirective, WrappedValue]
    }));
    compiler.compile(componentType).then((pv) => {
      var view = pv.instantiate(null, null);
      view.hydrate(new Injector([]), null, context);
      detectChanges(view);
      callback(view);
    });
  }
  describe("integration tests", () => {
    it("should initialize DOM elements with the given form object", (done) => {
      var ctx = new MyComp(new ControlGroup({"login": new Control("loginValue")}));
      var t = `<div [control-group]="form">
                <input type="text" control-name="login">
              </div>`;
      compile(MyComp, t, ctx, (view) => {
        var input = queryView(view, "input");
        expect(input.value).toEqual("loginValue");
        done();
      });
    });
    it("should update the control group values on DOM change", (done) => {
      var form = new ControlGroup({"login": new Control("oldValue")});
      var ctx = new MyComp(form);
      var t = `<div [control-group]="form">
                <input type="text" control-name="login">
              </div>`;
      compile(MyComp, t, ctx, (view) => {
        var input = queryView(view, "input");
        input.value = "updatedValue";
        dispatchEvent(input, "change");
        expect(form.value).toEqual({"login": "updatedValue"});
        done();
      });
    });
    it("should update DOM elements when rebinding the control group", (done) => {
      var form = new ControlGroup({"login": new Control("oldValue")});
      var ctx = new MyComp(form);
      var t = `<div [control-group]="form">
                <input type="text" control-name="login">
              </div>`;
      compile(MyComp, t, ctx, (view) => {
        ctx.form = new ControlGroup({"login": new Control("newValue")});
        detectChanges(view);
        var input = queryView(view, "input");
        expect(input.value).toEqual("newValue");
        done();
      });
    });
    it("should update DOM element when rebinding the control name", (done) => {
      var ctx = new MyComp(new ControlGroup({
        "one": new Control("one"),
        "two": new Control("two")
      }), "one");
      var t = `<div [control-group]="form">
                <input type="text" [control-name]="name">
              </div>`;
      compile(MyComp, t, ctx, (view) => {
        var input = queryView(view, "input");
        expect(input.value).toEqual("one");
        ctx.name = "two";
        detectChanges(view);
        expect(input.value).toEqual("two");
        done();
      });
    });
    describe("different control types", () => {
      it("should support type=checkbox", (done) => {
        var ctx = new MyComp(new ControlGroup({"checkbox": new Control(true)}));
        var t = `<div [control-group]="form">
                  <input type="checkbox" control-name="checkbox">
                </div>`;
        compile(MyComp, t, ctx, (view) => {
          var input = queryView(view, "input");
          expect(input.checked).toBe(true);
          input.checked = false;
          dispatchEvent(input, "change");
          expect(ctx.form.value).toEqual({"checkbox": false});
          done();
        });
      });
      it("should support custom value accessors", (done) => {
        var ctx = new MyComp(new ControlGroup({"name": new Control("aa")}));
        var t = `<div [control-group]="form">
                  <input type="text" control-name="name" wrapped-value>
                </div>`;
        compile(MyComp, t, ctx, (view) => {
          var input = queryView(view, "input");
          expect(input.value).toEqual("!aa!");
          input.value = "!bb!";
          dispatchEvent(input, "change");
          expect(ctx.form.value).toEqual({"name": "bb"});
          done();
        });
      });
    });
    describe("declarative forms", () => {
      it("should initialize dom elements", (done) => {
        var t = `<div [new-control-group]="{'login': 'loginValue', 'password':'passValue'}">
                  <input type="text" id="login" control="login">
                  <input type="password" id="password" control="password">
                </div>`;
        compile(MyComp, t, new MyComp(), (view) => {
          var loginInput = queryView(view, "#login");
          expect(loginInput.value).toEqual("loginValue");
          var passInput = queryView(view, "#password");
          expect(passInput.value).toEqual("passValue");
          done();
        });
      });
      it("should update the control group values on DOM change", (done) => {
        var t = `<div #form [new-control-group]="{'login': 'loginValue'}">
                  <input type="text" control="login">
                </div>`;
        compile(MyComp, t, new MyComp(), (view) => {
          var input = queryView(view, "input");
          input.value = "updatedValue";
          dispatchEvent(input, "change");
          var form = view.contextWithLocals.get("form");
          expect(form.value).toEqual({'login': 'updatedValue'});
          done();
        });
      });
    });
  });
}
class MyComp {
  constructor(form = null, name = null) {
    this.form = form;
    this.name = name;
  }
}
Object.defineProperty(MyComp, "annotations", {get: function() {
    return [new Component({selector: "my-comp"})];
  }});
class WrappedValueAccessor extends ControlValueAccessor {
  readValue(el) {
    return el.value.substring(1, el.value.length - 1);
  }
  writeValue(el, value) {
    el.value = `!${value}!`;
  }
}
class WrappedValue {
  constructor(cd) {
    assert.argumentTypes(cd, ControlNameDirective);
    cd.valueAccessor = new WrappedValueAccessor();
  }
}
Object.defineProperty(WrappedValue, "annotations", {get: function() {
    return [new Decorator({selector: '[wrapped-value]'})];
  }});
Object.defineProperty(WrappedValue, "parameters", {get: function() {
    return [[ControlNameDirective]];
  }});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/forms/integration_spec.map

//# sourceMappingURL=./integration_spec.map