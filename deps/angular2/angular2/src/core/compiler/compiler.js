System.register("angular2/src/core/compiler/compiler", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/facade/dom", "angular2/change_detection", "./directive_metadata_reader", "./view", "./pipeline/compile_pipeline", "./pipeline/compile_element", "./pipeline/default_steps", "./template_loader", "./directive_metadata", "../annotations/annotations", "./shadow_dom_emulation/content_tag", "./shadow_dom_strategy", "./pipeline/compile_step"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/compiler";
  var assert,
      Type,
      isBlank,
      isPresent,
      BaseException,
      normalizeBlank,
      stringify,
      Promise,
      PromiseWrapper,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      DOM,
      Element,
      ChangeDetection,
      Parser,
      DirectiveMetadataReader,
      ProtoView,
      CompilePipeline,
      CompileElement,
      createDefaultSteps,
      TemplateLoader,
      DirectiveMetadata,
      Component,
      Content,
      ShadowDomStrategy,
      CompileStep,
      CompilerCache,
      Compiler;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      stringify = $__m.stringify;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      Parser = $__m.Parser;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      createDefaultSteps = $__m.createDefaultSteps;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }],
    execute: function() {
      CompilerCache = $__export("CompilerCache", (function() {
        var CompilerCache = function CompilerCache() {
          this._cache = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(CompilerCache, {
          set: function(component, protoView) {
            assert.argumentTypes(component, Type, protoView, ProtoView);
            MapWrapper.set(this._cache, component, protoView);
          },
          get: function(component) {
            assert.argumentTypes(component, Type);
            var result = MapWrapper.get(this._cache, component);
            return assert.returnType((normalizeBlank(result)), ProtoView);
          },
          clear: function() {
            MapWrapper.clear(this._cache);
          }
        }, {});
      }()));
      Object.defineProperty(CompilerCache.prototype.set, "parameters", {get: function() {
          return [[Type], [ProtoView]];
        }});
      Object.defineProperty(CompilerCache.prototype.get, "parameters", {get: function() {
          return [[Type]];
        }});
      Compiler = $__export("Compiler", (function() {
        var Compiler = function Compiler(changeDetection, templateLoader, reader, parser, cache, shadowDomStrategy) {
          assert.argumentTypes(changeDetection, ChangeDetection, templateLoader, TemplateLoader, reader, DirectiveMetadataReader, parser, Parser, cache, CompilerCache, shadowDomStrategy, ShadowDomStrategy);
          this._changeDetection = changeDetection;
          this._reader = reader;
          this._parser = parser;
          this._compilerCache = cache;
          this._templateLoader = templateLoader;
          this._compiling = MapWrapper.create();
          this._shadowDomStrategy = shadowDomStrategy;
          this._shadowDomDirectives = [];
          var types = shadowDomStrategy.polyfillDirectives();
          for (var i = 0; i < types.length; i++) {
            ListWrapper.push(this._shadowDomDirectives, reader.read(types[i]));
          }
        };
        return ($traceurRuntime.createClass)(Compiler, {
          createSteps: function(component) {
            var $__0 = this;
            var directives = [];
            var cmpDirectives = ListWrapper.map(component.componentDirectives, (function(d) {
              return $__0._reader.read(d);
            }));
            directives = ListWrapper.concat(directives, cmpDirectives);
            directives = ListWrapper.concat(directives, this._shadowDomDirectives);
            return assert.returnType((createDefaultSteps(this._changeDetection, this._parser, component, directives, this._shadowDomStrategy)), assert.genericType(List, CompileStep));
          },
          compile: function(component) {
            var templateRoot = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(component, Type, templateRoot, Element);
            return assert.returnType((this._compile(this._reader.read(component), templateRoot)), assert.genericType(Promise, ProtoView));
          },
          _compile: function(cmpMetadata) {
            var templateRoot = arguments[1] !== (void 0) ? arguments[1] : null;
            var $__0 = this;
            var pvCached = this._compilerCache.get(cmpMetadata.type);
            if (isPresent(pvCached)) {
              return PromiseWrapper.resolve(pvCached);
            }
            var pvPromise = MapWrapper.get(this._compiling, cmpMetadata.type);
            if (isPresent(pvPromise)) {
              return pvPromise;
            }
            var tplPromise = isBlank(templateRoot) ? this._templateLoader.load(cmpMetadata) : PromiseWrapper.resolve(templateRoot);
            pvPromise = PromiseWrapper.then(tplPromise, (function(el) {
              return $__0._compileTemplate(el, cmpMetadata);
            }), (function(_) {
              throw new BaseException(("Failed to load the template for " + stringify(cmpMetadata.type)));
            }));
            MapWrapper.set(this._compiling, cmpMetadata.type, pvPromise);
            return pvPromise;
          },
          _compileTemplate: function(template, cmpMetadata) {
            this._shadowDomStrategy.processTemplate(template, cmpMetadata);
            var pipeline = new CompilePipeline(this.createSteps(cmpMetadata));
            var compileElements = pipeline.process(template);
            var protoView = compileElements[0].inheritedProtoView;
            this._compilerCache.set(cmpMetadata.type, protoView);
            MapWrapper.delete(this._compiling, cmpMetadata.type);
            var componentPromises = [];
            for (var i = 0; i < compileElements.length; i++) {
              var ce = compileElements[i];
              if (isPresent(ce.componentDirective)) {
                var componentPromise = this._compileNestedProtoView(ce);
                ListWrapper.push(componentPromises, componentPromise);
              }
            }
            return assert.returnType((PromiseWrapper.then(PromiseWrapper.all(componentPromises), (function(_) {
              return protoView;
            }), (function(e) {
              throw new BaseException((e + " -> Failed to compile " + stringify(cmpMetadata.type)));
            }))), assert.genericType(Promise, ProtoView));
          },
          _compileNestedProtoView: function(ce) {
            assert.argumentTypes(ce, CompileElement);
            var pvPromise = this._compile(ce.componentDirective);
            pvPromise.then(function(protoView) {
              ce.inheritedElementBinder.nestedProtoView = protoView;
            });
            return assert.returnType((pvPromise), assert.genericType(Promise, ProtoView));
          }
        }, {});
      }()));
      Object.defineProperty(Compiler, "parameters", {get: function() {
          return [[ChangeDetection], [TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache], [ShadowDomStrategy]];
        }});
      Object.defineProperty(Compiler.prototype.createSteps, "parameters", {get: function() {
          return [[DirectiveMetadata]];
        }});
      Object.defineProperty(Compiler.prototype.compile, "parameters", {get: function() {
          return [[Type], [Element]];
        }});
      Object.defineProperty(Compiler.prototype._compile, "parameters", {get: function() {
          return [[DirectiveMetadata], [Element]];
        }});
      Object.defineProperty(Compiler.prototype._compileTemplate, "parameters", {get: function() {
          return [[Element], []];
        }});
      Object.defineProperty(Compiler.prototype._compileNestedProtoView, "parameters", {get: function() {
          return [[CompileElement]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/compiler.map

//# sourceMappingURL=./compiler.map