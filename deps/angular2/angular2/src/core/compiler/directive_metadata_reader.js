System.register("angular2/src/core/compiler/directive_metadata_reader", ["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "../annotations/annotations", "./directive_metadata", "angular2/src/reflection/reflection", "./shadow_dom_strategy"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/directive_metadata_reader";
  var assert,
      Type,
      isPresent,
      BaseException,
      stringify,
      List,
      ListWrapper,
      Directive,
      Component,
      DirectiveMetadata,
      reflector,
      ShadowDom,
      ShadowDomStrategy,
      ShadowDomNative,
      DirectiveMetadataReader;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Directive = $__m.Directive;
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      ShadowDom = $__m.ShadowDom;
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      ShadowDomNative = $__m.ShadowDomNative;
    }],
    execute: function() {
      DirectiveMetadataReader = $__export("DirectiveMetadataReader", (function() {
        var DirectiveMetadataReader = function DirectiveMetadataReader() {};
        return ($traceurRuntime.createClass)(DirectiveMetadataReader, {
          read: function(type) {
            assert.argumentTypes(type, Type);
            var annotations = reflector.annotations(type);
            if (isPresent(annotations)) {
              for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation instanceof Component) {
                  return assert.returnType((new DirectiveMetadata(type, annotation, this.componentDirectivesMetadata(annotation))), DirectiveMetadata);
                }
                if (annotation instanceof Directive) {
                  return assert.returnType((new DirectiveMetadata(type, annotation, null)), DirectiveMetadata);
                }
              }
            }
            throw new BaseException(("No Directive annotation found on " + stringify(type)));
          },
          componentDirectivesMetadata: function(annotation) {
            assert.argumentTypes(annotation, Component);
            var template = annotation.template;
            return assert.returnType((isPresent(template) && isPresent(template.directives) ? template.directives : []), assert.genericType(List, Type));
          }
        }, {});
      }()));
      Object.defineProperty(DirectiveMetadataReader.prototype.read, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(DirectiveMetadataReader.prototype.componentDirectivesMetadata, "parameters", {get: function() {
          return [[Component]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/directive_metadata_reader.map

//# sourceMappingURL=./directive_metadata_reader.map