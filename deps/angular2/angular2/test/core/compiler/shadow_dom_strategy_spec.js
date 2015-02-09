System.register("angular2/test/core/compiler/shadow_dom_strategy_spec", ["angular2/test_lib", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/dom", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/shadow_dom_strategy_spec";
  var describe,
      xit,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      el,
      NativeShadowDomStrategy,
      EmulatedShadowDomStrategy,
      DOM,
      Component,
      DirectiveMetadata;
  function main() {
    describe('Shadow DOM strategy', (function() {
      var strategy,
          component = new Component({selector: 'mycmp'}),
          metadata = new DirectiveMetadata(null, component, null);
      describe('Native', (function() {
        beforeEach((function() {
          strategy = new NativeShadowDomStrategy();
        }));
        it('should leave the styles in the template', (function() {
          var tpl = DOM.createTemplate('<style>.s1{}</style><div>content</div>');
          strategy.processTemplate(tpl, metadata);
          expect(tpl.content).toHaveText('.s1{}content');
        }));
        it('should not modify the content of the template', (function() {
          var html = '<p>content<span></span></p>';
          var tpl = DOM.createTemplate(html);
          strategy.processTemplate(tpl, metadata);
          expect(DOM.getInnerHTML(tpl)).toEqual(html);
        }));
      }));
      describe('Emulated', (function() {
        var root;
        beforeEach((function() {
          root = el('<div>');
          strategy = new EmulatedShadowDomStrategy(root);
        }));
        it('should move the styles from the template to the root', (function() {
          var tpl = DOM.createTemplate('<style>.s1{}</style><div>content</div><style>.s2{}</style>');
          strategy.processTemplate(tpl, metadata);
          expect(root).toHaveText('.s1[mycmp] {}.s2[mycmp] {}');
          expect(tpl.content).toHaveText('content');
        }));
        it('should insert the styles as the first children of the host', (function() {
          DOM.setInnerHTML(root, '<p>root content</p>');
          var tpl = DOM.createTemplate('<style>.s1{}</style><style>.s2{}</style>');
          strategy.processTemplate(tpl, metadata);
          expect(root).toHaveText('.s1[mycmp] {}.s2[mycmp] {}root content');
        }));
        it('should add the component selector to all template children', (function() {
          var html = '<p>content<span></span></p>';
          var processedHtml = '<p mycmp="">content<span mycmp=""></span></p>';
          var tpl = DOM.createTemplate(html);
          strategy.processTemplate(tpl, metadata);
          expect(DOM.getInnerHTML(tpl)).toEqual(processedHtml);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      xit = $__m.xit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      el = $__m.el;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedShadowDomStrategy = $__m.EmulatedShadowDomStrategy;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/shadow_dom_strategy_spec.map

//# sourceMappingURL=./shadow_dom_strategy_spec.map