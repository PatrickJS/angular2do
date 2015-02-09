System.register("angular2/src/core/compiler/pipeline/default_steps", ["rtts_assert/rtts_assert", "angular2/change_detection", "angular2/src/facade/collection", "./property_binding_parser", "./text_interpolation_parser", "./directive_parser", "./view_splitter", "./element_binding_marker", "./proto_view_builder", "./proto_element_injector_builder", "./element_binder_builder", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/compiler/pipeline/default_steps";
  var assert,
      ChangeDetection,
      Parser,
      List,
      PropertyBindingParser,
      TextInterpolationParser,
      DirectiveParser,
      ViewSplitter,
      ElementBindingMarker,
      ProtoViewBuilder,
      ProtoElementInjectorBuilder,
      ElementBinderBuilder,
      DirectiveMetadata,
      ShadowDomStrategy,
      stringify;
  function createDefaultSteps(changeDetection, parser, compiledComponent, directives, shadowDomStrategy) {
    assert.argumentTypes(changeDetection, ChangeDetection, parser, Parser, compiledComponent, DirectiveMetadata, directives, assert.genericType(List, DirectiveMetadata), shadowDomStrategy, ShadowDomStrategy);
    var compilationUnit = stringify(compiledComponent.type);
    return [new ViewSplitter(parser, compilationUnit), new PropertyBindingParser(parser, compilationUnit), new DirectiveParser(directives), new TextInterpolationParser(parser, compilationUnit), new ElementBindingMarker(), new ProtoViewBuilder(changeDetection, shadowDomStrategy), new ProtoElementInjectorBuilder(), new ElementBinderBuilder(parser, compilationUnit)];
  }
  $__export("createDefaultSteps", createDefaultSteps);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      Parser = $__m.Parser;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      PropertyBindingParser = $__m.PropertyBindingParser;
    }, function($__m) {
      TextInterpolationParser = $__m.TextInterpolationParser;
    }, function($__m) {
      DirectiveParser = $__m.DirectiveParser;
    }, function($__m) {
      ViewSplitter = $__m.ViewSplitter;
    }, function($__m) {
      ElementBindingMarker = $__m.ElementBindingMarker;
    }, function($__m) {
      ProtoViewBuilder = $__m.ProtoViewBuilder;
    }, function($__m) {
      ProtoElementInjectorBuilder = $__m.ProtoElementInjectorBuilder;
    }, function($__m) {
      ElementBinderBuilder = $__m.ElementBinderBuilder;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      stringify = $__m.stringify;
    }],
    execute: function() {
      Object.defineProperty(createDefaultSteps, "parameters", {get: function() {
          return [[ChangeDetection], [Parser], [DirectiveMetadata], [assert.genericType(List, DirectiveMetadata)], [ShadowDomStrategy]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/pipeline/default_steps.map

//# sourceMappingURL=./default_steps.map