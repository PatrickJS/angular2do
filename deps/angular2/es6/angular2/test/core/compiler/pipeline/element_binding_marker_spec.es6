import {assert} from "rtts_assert/rtts_assert";
import {describe,
  beforeEach,
  it,
  expect,
  iit,
  ddescribe,
  el} from 'angular2/test_lib';
import {isPresent} from 'angular2/src/facade/lang';
import {DOM} from 'angular2/src/facade/dom';
import {MapWrapper} from 'angular2/src/facade/collection';
import {ElementBindingMarker} from 'angular2/src/core/compiler/pipeline/element_binding_marker';
import {CompilePipeline} from 'angular2/src/core/compiler/pipeline/compile_pipeline';
import {CompileElement} from 'angular2/src/core/compiler/pipeline/compile_element';
import {CompileStep} from 'angular2/src/core/compiler/pipeline/compile_step';
import {CompileControl} from 'angular2/src/core/compiler/pipeline/compile_control';
import {DirectiveMetadataReader} from 'angular2/src/core/compiler/directive_metadata_reader';
import {Viewport,
  Decorator,
  Component} from 'angular2/src/core/annotations/annotations';
export function main() {
  describe('ElementBindingMarker', () => {
    function createPipeline({textNodeBindings,
      propertyBindings,
      variableBindings,
      eventBindings,
      directives,
      ignoreBindings} = {}) {
      var reader = new DirectiveMetadataReader();
      return new CompilePipeline([new MockStep((parent, current, control) => {
        if (isPresent(textNodeBindings)) {
          current.textNodeBindings = textNodeBindings;
        }
        if (isPresent(propertyBindings)) {
          current.propertyBindings = propertyBindings;
        }
        if (isPresent(variableBindings)) {
          current.variableBindings = variableBindings;
        }
        if (isPresent(eventBindings)) {
          current.eventBindings = eventBindings;
        }
        if (isPresent(ignoreBindings)) {
          current.ignoreBindings = ignoreBindings;
        }
        if (isPresent(directives)) {
          for (var i = 0; i < directives.length; i++) {
            current.addDirective(reader.read(directives[i]));
          }
        }
      }), new ElementBindingMarker()]);
    }
    it('should not mark empty elements', () => {
      var results = createPipeline().process(el('<div></div>'));
      assertBinding(results[0], false);
    });
    it('should not mark elements when ignoreBindings is true', () => {
      var textNodeBindings = MapWrapper.create();
      MapWrapper.set(textNodeBindings, 0, 'expr');
      var results = createPipeline({
        textNodeBindings: textNodeBindings,
        ignoreBindings: true
      }).process(el('<div></div>'));
      assertBinding(results[0], false);
    });
    it('should mark elements with text node bindings', () => {
      var textNodeBindings = MapWrapper.create();
      MapWrapper.set(textNodeBindings, 0, 'expr');
      var results = createPipeline({textNodeBindings: textNodeBindings}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with property bindings', () => {
      var propertyBindings = MapWrapper.createFromStringMap({'a': 'expr'});
      var results = createPipeline({propertyBindings: propertyBindings}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with variable bindings', () => {
      var variableBindings = MapWrapper.createFromStringMap({'a': 'expr'});
      var results = createPipeline({variableBindings: variableBindings}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with event bindings', () => {
      var eventBindings = MapWrapper.createFromStringMap({'click': 'expr'});
      var results = createPipeline({eventBindings: eventBindings}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with decorator directives', () => {
      var results = createPipeline({directives: [SomeDecoratorDirective]}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with template directives', () => {
      var results = createPipeline({directives: [SomeViewportDirective]}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
    it('should mark elements with component directives', () => {
      var results = createPipeline({directives: [SomeComponentDirective]}).process(el('<div></div>'));
      assertBinding(results[0], true);
    });
  });
}
function assertBinding(pipelineElement, shouldBePresent) {
  expect(pipelineElement.hasBindings).toBe(shouldBePresent);
  expect(DOM.hasClass(pipelineElement.element, 'ng-binding')).toBe(shouldBePresent);
}
class MockStep extends CompileStep {
  constructor(process) {
    super();
    this.processClosure = process;
  }
  process(parent, current, control) {
    assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
    this.processClosure(parent, current, control);
  }
}
Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
    return [[CompileElement], [CompileElement], [CompileControl]];
  }});
class SomeViewportDirective {}
Object.defineProperty(SomeViewportDirective, "annotations", {get: function() {
    return [new Viewport()];
  }});
class SomeComponentDirective {}
Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
    return [new Component()];
  }});
class SomeDecoratorDirective {}
Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
    return [new Decorator()];
  }});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/pipeline/element_binding_marker_spec.map

//# sourceMappingURL=./element_binding_marker_spec.map