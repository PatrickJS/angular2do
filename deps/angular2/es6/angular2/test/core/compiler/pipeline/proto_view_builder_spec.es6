import {assert} from "rtts_assert/rtts_assert";
import {describe,
  beforeEach,
  it,
  expect,
  iit,
  ddescribe,
  el} from 'angular2/test_lib';
import {isPresent} from 'angular2/src/facade/lang';
import {dynamicChangeDetection} from 'angular2/change_detection';
import {ElementBinder} from 'angular2/src/core/compiler/element_binder';
import {ProtoViewBuilder} from 'angular2/src/core/compiler/pipeline/proto_view_builder';
import {CompilePipeline} from 'angular2/src/core/compiler/pipeline/compile_pipeline';
import {CompileElement} from 'angular2/src/core/compiler/pipeline/compile_element';
import {CompileStep} from 'angular2/src/core/compiler/pipeline/compile_step';
import {CompileControl} from 'angular2/src/core/compiler/pipeline/compile_control';
import {NativeShadowDomStrategy} from 'angular2/src/core/compiler/shadow_dom_strategy';
import {MapWrapper} from 'angular2/src/facade/collection';
export function main() {
  describe('ProtoViewBuilder', () => {
    function createPipeline(variableBindings = null) {
      return new CompilePipeline([new MockStep((parent, current, control) => {
        if (isPresent(current.element.getAttribute('viewroot'))) {
          current.isViewRoot = true;
        }
        if (isPresent(current.element.getAttribute('var-binding'))) {
          current.variableBindings = MapWrapper.createFromStringMap(variableBindings);
        }
        current.inheritedElementBinder = new ElementBinder(null, null, null);
      }), new ProtoViewBuilder(dynamicChangeDetection, new NativeShadowDomStrategy())]);
    }
    it('should not create a ProtoView when the isViewRoot flag is not set', () => {
      var results = createPipeline().process(el('<div></div>'));
      expect(results[0].inheritedProtoView).toBe(null);
    });
    it('should create a ProtoView when the isViewRoot flag is set', () => {
      var viewRootElement = el('<div viewroot></div>');
      var results = createPipeline().process(viewRootElement);
      expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
    });
    it('should inherit the ProtoView down to children that have no isViewRoot set', () => {
      var viewRootElement = el('<div viewroot><span></span></div>');
      var results = createPipeline().process(viewRootElement);
      expect(results[0].inheritedProtoView.element).toBe(viewRootElement);
      expect(results[1].inheritedProtoView.element).toBe(viewRootElement);
    });
    it('should save ProtoView into the elementBinder of parent element', () => {
      var element = el('<div viewroot><template><a viewroot></a></template></div>');
      var results = createPipeline().process(element);
      expect(results[1].inheritedElementBinder.nestedProtoView).toBe(results[2].inheritedProtoView);
    });
    it('should bind variables to the nested ProtoView', () => {
      var element = el('<div viewroot><template var-binding><a viewroot></a></template></div>');
      var results = createPipeline({
        'var1': 'map1',
        'var2': 'map2'
      }).process(element);
      var npv = results[1].inheritedElementBinder.nestedProtoView;
      expect(npv.variableBindings).toEqual(MapWrapper.createFromStringMap({
        'var1': 'map1',
        'var2': 'map2'
      }));
    });
    it('should mark variables in the proto view context locals', () => {
      var element = el('<div viewroot><p var-binding></p></div>');
      var results = createPipeline({
        'var1': 'map1',
        'var2': 'map2'
      }).process(element);
      var protoView = results[0].inheritedProtoView;
      expect(protoView.protoContextLocals).toEqual(MapWrapper.createFromStringMap({
        'map2': null,
        'map1': null
      }));
    });
    describe('errors', () => {
      it('should not allow multiple nested ProtoViews for the same parent element', () => {
        var element = el('<div viewroot><template><a viewroot></a><a viewroot></a></template></div>');
        expect(() => {
          createPipeline().process(element);
        }).toThrowError('Only one nested view per element is allowed');
      });
    });
  });
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

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/pipeline/proto_view_builder_spec.map

//# sourceMappingURL=./proto_view_builder_spec.map