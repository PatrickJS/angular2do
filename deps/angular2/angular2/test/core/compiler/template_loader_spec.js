System.register("angular2/test/core/compiler/template_loader_spec", ["angular2/test_lib", "angular2/src/core/compiler/template_loader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template_config", "angular2/src/core/compiler/directive_metadata", "angular2/src/facade/async", "angular2/src/mock/xhr_mock"], function($__export) {
  "use strict";
  var __moduleName = "angular2/test/core/compiler/template_loader_spec";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      TemplateLoader,
      Component,
      TemplateConfig,
      DirectiveMetadata,
      PromiseWrapper,
      XHRMock,
      FakeComponent;
  function main() {
    describe('TemplateLoader', (function() {
      var loader,
          xhr;
      beforeEach((function() {
        xhr = new XHRMock();
        loader = new TemplateLoader(xhr);
      }));
      function createMetadata() {
        var $__1,
            $__2;
        var $__0 = arguments[0] !== (void 0) ? arguments[0] : {},
            inline = ($__1 = $__0.inline) === void 0 ? null : $__1,
            url = ($__2 = $__0.url) === void 0 ? null : $__2;
        var config = new TemplateConfig({
          url: url,
          inline: inline
        });
        var component = new Component({template: config});
        return new DirectiveMetadata(FakeComponent, component, null);
      }
      it('should load inline templates', (function(done) {
        var template = 'inline template';
        var md = createMetadata({inline: template});
        loader.load(md).then((function(el) {
          expect(el.content).toHaveText(template);
          done();
        }));
      }));
      it('should load templates through XHR', (function(done) {
        var url = '/foo';
        var template = 'xhr template';
        xhr.expect(url, template);
        var md = createMetadata({url: '/foo'});
        loader.load(md).then((function(el) {
          expect(el.content).toHaveText(template);
          done();
        }));
        xhr.flush();
      }));
      it('should cache template loaded through XHR', (function(done) {
        var firstEl;
        var url = '/foo';
        var template = 'xhr template';
        xhr.expect(url, template);
        var md = createMetadata({url: '/foo'});
        loader.load(md).then((function(el) {
          firstEl = el;
          return loader.load(md);
        })).then((function(el) {
          expect(el).toBe(firstEl);
          expect(el.content).toHaveText(template);
          done();
        }));
        xhr.flush();
      }));
      it('should throw when no template is defined', (function() {
        var md = createMetadata();
        expect((function() {
          return loader.load(md);
        })).toThrowError('No template configured for component FakeComponent');
      }));
      it('should return a rejected Promise when xhr loading fails', (function(done) {
        var url = '/foo';
        xhr.expect(url, null);
        var md = createMetadata({url: '/foo'});
        PromiseWrapper.then(loader.load(md), function(_) {
          throw 'Unexpected response';
        }, function(error) {
          expect(error).toEqual('Failed to load /foo');
          done();
        });
        xhr.flush();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      XHRMock = $__m.XHRMock;
    }],
    execute: function() {
      FakeComponent = (function() {
        var FakeComponent = function FakeComponent() {};
        return ($traceurRuntime.createClass)(FakeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/test/core/compiler/template_loader_spec.map

//# sourceMappingURL=./template_loader_spec.map