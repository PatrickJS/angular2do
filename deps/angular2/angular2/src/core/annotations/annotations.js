System.register("angular2/src/core/annotations/annotations", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./template_config"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/annotations/annotations";
  var assert,
      ABSTRACT,
      CONST,
      normalizeBlank,
      isPresent,
      ListWrapper,
      List,
      TemplateConfig,
      Directive,
      Component,
      Decorator,
      Template,
      onDestroy,
      onChange;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ABSTRACT = $__m.ABSTRACT;
      CONST = $__m.CONST;
      normalizeBlank = $__m.normalizeBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }],
    execute: function() {
      Directive = $__export("Directive", (function() {
        var Directive = function Directive() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes,
              lifecycle = $__1.lifecycle;
          this.selector = selector;
          this.lightDomServices = lightDomServices;
          this.implementsTypes = implementsTypes;
          this.bind = bind;
          this.lifecycle = lifecycle;
        };
        return ($traceurRuntime.createClass)(Directive, {hasLifecycleHook: function(hook) {
            assert.argumentTypes(hook, assert.type.string);
            return assert.returnType((isPresent(this.lifecycle) ? ListWrapper.contains(this.lifecycle, hook) : false), assert.type.boolean);
          }}, {});
      }()));
      Object.defineProperty(Directive, "annotations", {get: function() {
          return [new ABSTRACT(), new CONST()];
        }});
      Object.defineProperty(Directive.prototype.hasLifecycleHook, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Component = $__export("Component", (function($__super) {
        var Component = function Component() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              template = $__1.template,
              lightDomServices = $__1.lightDomServices,
              shadowDomServices = $__1.shadowDomServices,
              componentServices = $__1.componentServices,
              implementsTypes = $__1.implementsTypes,
              lifecycle = $__1.lifecycle;
          $traceurRuntime.superConstructor(Component).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes,
            lifecycle: lifecycle
          });
          this.template = template;
          this.lightDomServices = lightDomServices;
          this.shadowDomServices = shadowDomServices;
          this.componentServices = componentServices;
          this.lifecycle = lifecycle;
        };
        return ($traceurRuntime.createClass)(Component, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Component, "annotations", {get: function() {
          return [new CONST()];
        }});
      Decorator = $__export("Decorator", (function($__super) {
        var Decorator = function Decorator() {
          var $__2;
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes,
              lifecycle = $__1.lifecycle,
              compileChildren = ($__2 = $__1.compileChildren) === void 0 ? true : $__2;
          this.compileChildren = compileChildren;
          $traceurRuntime.superConstructor(Decorator).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes,
            lifecycle: lifecycle
          });
        };
        return ($traceurRuntime.createClass)(Decorator, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Decorator, "annotations", {get: function() {
          return [new CONST()];
        }});
      Template = $__export("Template", (function($__super) {
        var Template = function Template() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              bind = $__1.bind,
              lightDomServices = $__1.lightDomServices,
              implementsTypes = $__1.implementsTypes,
              lifecycle = $__1.lifecycle;
          $traceurRuntime.superConstructor(Template).call(this, {
            selector: selector,
            bind: bind,
            lightDomServices: lightDomServices,
            implementsTypes: implementsTypes,
            lifecycle: lifecycle
          });
        };
        return ($traceurRuntime.createClass)(Template, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Template, "annotations", {get: function() {
          return [new CONST()];
        }});
      onDestroy = $__export("onDestroy", "onDestroy");
      onChange = $__export("onChange", "onChange");
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/annotations/annotations.map

//# sourceMappingURL=./annotations.map