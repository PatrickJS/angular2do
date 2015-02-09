System.register("angular2/src/core/compiler/template_loader", ["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/src/facade/lang", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/src/core/annotations/template_config", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "./xhr/xhr"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/template_loader";
  var assert,
      Promise,
      PromiseWrapper,
      isBlank,
      isPresent,
      BaseException,
      stringify,
      TemplateElement,
      DOM,
      Element,
      StringMapWrapper,
      TemplateConfig,
      Component,
      DirectiveMetadata,
      XHR,
      TemplateLoader;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      TemplateElement = $__m.TemplateElement;
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      XHR = $__m.XHR;
    }],
    execute: function() {
      TemplateLoader = $__export("TemplateLoader", (function() {
        var TemplateLoader = function TemplateLoader(xhr) {
          assert.argumentTypes(xhr, XHR);
          this._xhr = xhr;
          this._cache = StringMapWrapper.create();
        };
        return ($traceurRuntime.createClass)(TemplateLoader, {load: function(cmpMetadata) {
            assert.argumentTypes(cmpMetadata, DirectiveMetadata);
            var annotation = assert.type(cmpMetadata.annotation, Component);
            var tplConfig = assert.type(annotation.template, TemplateConfig);
            if (isPresent(tplConfig.inline)) {
              var template = DOM.createTemplate(tplConfig.inline);
              return assert.returnType((PromiseWrapper.resolve(template)), assert.genericType(Promise, Element));
            }
            if (isPresent(tplConfig.url)) {
              var url = tplConfig.url;
              var promise = StringMapWrapper.get(this._cache, url);
              if (isBlank(promise)) {
                promise = this._xhr.get(url).then(function(html) {
                  var template = DOM.createTemplate(html);
                  return template;
                });
                StringMapWrapper.set(this._cache, url, promise);
              }
              return assert.returnType((promise), assert.genericType(Promise, Element));
            }
            throw new BaseException(("No template configured for component " + stringify(cmpMetadata.type)));
          }}, {});
      }()));
      Object.defineProperty(TemplateLoader, "parameters", {get: function() {
          return [[XHR]];
        }});
      Object.defineProperty(TemplateLoader.prototype.load, "parameters", {get: function() {
          return [[DirectiveMetadata]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/template_loader.map

//# sourceMappingURL=./template_loader.map