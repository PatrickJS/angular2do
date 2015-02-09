System.register("angular2/test/core/compiler/directive_metadata_reader_spec", ["angular2/test_lib", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template_config", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/directive_metadata_reader_spec";
  var ddescribe,
      describe,
      it,
      iit,
      expect,
      beforeEach,
      DirectiveMetadataReader,
      Decorator,
      Component,
      TemplateConfig,
      DirectiveMetadata,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      CONST,
      SomeDirective,
      SomeDirectiveWithoutAnnotation,
      ComponentWithoutDirectives,
      ComponentWithDirectives;
  function main() {
    describe("DirectiveMetadataReader", (function() {
      var reader;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
      }));
      it('should read out the annotation', (function() {
        var directiveMetadata = reader.read(SomeDirective);
        expect(directiveMetadata).toEqual(new DirectiveMetadata(SomeDirective, new Decorator({selector: 'someSelector'}), null));
      }));
      it('should throw if not matching annotation is found', (function() {
        expect((function() {
          reader.read(SomeDirectiveWithoutAnnotation);
        })).toThrowError('No Directive annotation found on SomeDirectiveWithoutAnnotation');
      }));
      describe("componentDirectives", (function() {
        it("should return an empty list when no directives specified", (function() {
          var cmp = reader.read(ComponentWithoutDirectives);
          expect(cmp.componentDirectives).toEqual([]);
        }));
        it("should return a list of directives specified in the template config", (function() {
          var cmp = reader.read(ComponentWithDirectives);
          expect(cmp.componentDirectives).toEqual([ComponentWithoutDirectives]);
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
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {};
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      Object.defineProperty(SomeDirective, "annotations", {get: function() {
          return [new Decorator({selector: 'someSelector'})];
        }});
      SomeDirectiveWithoutAnnotation = (function() {
        var SomeDirectiveWithoutAnnotation = function SomeDirectiveWithoutAnnotation() {};
        return ($traceurRuntime.createClass)(SomeDirectiveWithoutAnnotation, {}, {});
      }());
      ComponentWithoutDirectives = (function() {
        var ComponentWithoutDirectives = function ComponentWithoutDirectives() {};
        return ($traceurRuntime.createClass)(ComponentWithoutDirectives, {}, {});
      }());
      Object.defineProperty(ComponentWithoutDirectives, "annotations", {get: function() {
          return [new Component({selector: 'withoutDirectives'})];
        }});
      ComponentWithDirectives = (function() {
        var ComponentWithDirectives = function ComponentWithDirectives() {};
        return ($traceurRuntime.createClass)(ComponentWithDirectives, {}, {});
      }());
      Object.defineProperty(ComponentWithDirectives, "annotations", {get: function() {
          return [new Component({
            selector: 'withDirectives',
            template: new TemplateConfig({directives: [ComponentWithoutDirectives]})
          })];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/directive_metadata_reader_spec.map

//# sourceMappingURL=./directive_metadata_reader_spec.map