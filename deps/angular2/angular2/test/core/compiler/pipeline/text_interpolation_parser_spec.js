System.register("angular2/test/core/compiler/pipeline/text_interpolation_parser_spec", ["angular2/test_lib", "angular2/src/core/compiler/pipeline/text_interpolation_parser", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/facade/dom", "angular2/src/facade/collection", "angular2/change_detection", "./pipeline_spec"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/pipeline/text_interpolation_parser_spec";
  var describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      TextInterpolationParser,
      CompilePipeline,
      DOM,
      MapWrapper,
      Lexer,
      Parser,
      IgnoreChildrenStep;
  function main() {
    describe('TextInterpolationParser', (function() {
      function createPipeline() {
        return new CompilePipeline([new IgnoreChildrenStep(), new TextInterpolationParser(new Parser(new Lexer()), null)]);
      }
      it('should find text interpolation in normal elements', (function() {
        var results = createPipeline().process(el('<div>{{expr1}}<span></span>{{expr2}}</div>'));
        var bindings = results[0].textNodeBindings;
        expect(MapWrapper.get(bindings, 0).source).toEqual("{{expr1}}");
        expect(MapWrapper.get(bindings, 2).source).toEqual("{{expr2}}");
      }));
      it('should find text interpolation in template elements', (function() {
        var results = createPipeline().process(el('<template>{{expr1}}<span></span>{{expr2}}</template>'));
        var bindings = results[0].textNodeBindings;
        expect(MapWrapper.get(bindings, 0).source).toEqual("{{expr1}}");
        expect(MapWrapper.get(bindings, 2).source).toEqual("{{expr2}}");
      }));
      it('should allow multiple expressions', (function() {
        var results = createPipeline().process(el('<div>{{expr1}}{{expr2}}</div>'));
        var bindings = results[0].textNodeBindings;
        expect(MapWrapper.get(bindings, 0).source).toEqual("{{expr1}}{{expr2}}");
      }));
      it('should not interpolate when compileChildren is false', (function() {
        var results = createPipeline().process(el('<div>{{included}}<span ignore-children>{{excluded}}</span></div>'));
        var bindings = results[0].textNodeBindings;
        expect(MapWrapper.get(bindings, 0).source).toEqual("{{included}}");
        expect(results[1].textNodeBindings).toBe(null);
      }));
      it('should allow fixed text before, in between and after expressions', (function() {
        var results = createPipeline().process(el('<div>a{{expr1}}b{{expr2}}c</div>'));
        var bindings = results[0].textNodeBindings;
        expect(MapWrapper.get(bindings, 0).source).toEqual("a{{expr1}}b{{expr2}}c");
      }));
      it('should escape quotes in fixed parts', (function() {
        var results = createPipeline().process(el("<div>'\"a{{expr1}}</div>"));
        expect(MapWrapper.get(results[0].textNodeBindings, 0).source).toEqual("'\"a{{expr1}}");
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      expect = $__m.expect;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      TextInterpolationParser = $__m.TextInterpolationParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }, function($__m) {
      IgnoreChildrenStep = $__m.IgnoreChildrenStep;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/pipeline/text_interpolation_parser_spec.map

//# sourceMappingURL=./text_interpolation_parser_spec.map