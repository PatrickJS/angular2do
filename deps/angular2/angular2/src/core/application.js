System.register("angular2/src/core/application", ["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/dom", "./compiler/compiler", "./compiler/view", "angular2/src/reflection/reflection", "angular2/change_detection", "./compiler/template_loader", "./compiler/directive_metadata_reader", "./compiler/directive_metadata", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/core/zone/vm_turn_zone", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/xhr/xhr", "angular2/src/core/compiler/xhr/xhr_impl"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/application";
  var assert,
      Injector,
      bind,
      OpaqueToken,
      Type,
      FIELD,
      isBlank,
      isPresent,
      BaseException,
      assertionsEnabled,
      print,
      DOM,
      Element,
      Compiler,
      CompilerCache,
      ProtoView,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetection,
      dynamicChangeDetection,
      jitChangeDetection,
      TemplateLoader,
      DirectiveMetadataReader,
      DirectiveMetadata,
      List,
      ListWrapper,
      PromiseWrapper,
      VmTurnZone,
      LifeCycle,
      ShadowDomStrategy,
      NativeShadowDomStrategy,
      XHR,
      XHRImpl,
      _rootInjector,
      _rootBindings,
      appViewToken,
      appChangeDetectorToken,
      appElementToken,
      appComponentAnnotatedTypeToken,
      appDocumentToken;
  function _injectorBindings(appComponentType) {
    return [bind(appDocumentToken).toValue(DOM.defaultDoc()), bind(appComponentAnnotatedTypeToken).toFactory((function(reader) {
      return reader.read(appComponentType);
    }), [DirectiveMetadataReader]), bind(appElementToken).toFactory((function(appComponentAnnotatedType, appDocument) {
      var selector = appComponentAnnotatedType.annotation.selector;
      var element = DOM.querySelector(appDocument, selector);
      if (isBlank(element)) {
        throw new BaseException(("The app selector \"" + selector + "\" did not match any elements"));
      }
      return element;
    }), [appComponentAnnotatedTypeToken, appDocumentToken]), bind(appViewToken).toAsyncFactory((function(changeDetection, compiler, injector, appElement, appComponentAnnotatedType, strategy) {
      return compiler.compile(appComponentAnnotatedType.type, null).then((function(protoView) {
        var appProtoView = ProtoView.createRootProtoView(protoView, appElement, appComponentAnnotatedType, changeDetection.createProtoChangeDetector('root'), strategy);
        var view = appProtoView.instantiate(null);
        view.hydrate(injector, null, new Object());
        return view;
      }));
    }), [ChangeDetection, Compiler, Injector, appElementToken, appComponentAnnotatedTypeToken, ShadowDomStrategy]), bind(appChangeDetectorToken).toFactory((function(rootView) {
      return rootView.changeDetector;
    }), [appViewToken]), bind(appComponentType).toFactory((function(rootView) {
      return rootView.elementInjectors[0].getComponent();
    }), [appViewToken]), bind(LifeCycle).toFactory((function() {
      return new LifeCycle(null, assertionsEnabled());
    }), [])];
  }
  function _createVmZone(givenReporter) {
    assert.argumentTypes(givenReporter, Function);
    var defaultErrorReporter = (function(exception, stackTrace) {
      var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
      print((exception + "\n\n" + longStackTrace));
      throw exception;
    });
    var reporter = isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new VmTurnZone({enableLongStackTrace: assertionsEnabled()});
    zone.initCallbacks({onErrorHandler: reporter});
    return zone;
  }
  function bootstrap(appComponentType) {
    var bindings = arguments[1] !== (void 0) ? arguments[1] : null;
    var givenBootstrapErrorReporter = arguments[2] !== (void 0) ? arguments[2] : null;
    assert.argumentTypes(appComponentType, Type, bindings, assert.type.any, givenBootstrapErrorReporter, assert.type.any);
    var bootstrapProcess = PromiseWrapper.completer();
    var zone = _createVmZone(givenBootstrapErrorReporter);
    zone.run((function() {
      var appInjector = _createAppInjector(appComponentType, bindings);
      PromiseWrapper.then(appInjector.asyncGet(appViewToken), (function(rootView) {
        var lc = appInjector.get(LifeCycle);
        lc.registerWith(zone, rootView.changeDetector);
        lc.tick();
        bootstrapProcess.complete(appInjector);
      }), (function(err) {
        bootstrapProcess.reject(err);
      }));
    }));
    return bootstrapProcess.promise;
  }
  function _createAppInjector(appComponentType, bindings) {
    assert.argumentTypes(appComponentType, Type, bindings, List);
    if (isBlank(_rootInjector))
      _rootInjector = new Injector(_rootBindings);
    var mergedBindings = isPresent(bindings) ? ListWrapper.concat(_injectorBindings(appComponentType), bindings) : _injectorBindings(appComponentType);
    return assert.returnType((_rootInjector.createChild(mergedBindings)), Injector);
  }
  $__export("bootstrap", bootstrap);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
    }, function($__m) {
      Type = $__m.Type;
      FIELD = $__m.FIELD;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      assertionsEnabled = $__m.assertionsEnabled;
      print = $__m.print;
    }, function($__m) {
      DOM = $__m.DOM;
      Element = $__m.Element;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      Reflector = $__m.Reflector;
      reflector = $__m.reflector;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetection = $__m.ChangeDetection;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
      jitChangeDetection = $__m.jitChangeDetection;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      XHRImpl = $__m.XHRImpl;
    }],
    execute: function() {
      _rootBindings = [bind(Reflector).toValue(reflector), bind(ChangeDetection).toValue(dynamicChangeDetection), Compiler, CompilerCache, TemplateLoader, DirectiveMetadataReader, Parser, Lexer, bind(ShadowDomStrategy).toValue(new NativeShadowDomStrategy()), bind(XHR).toValue(new XHRImpl())];
      appViewToken = $__export("appViewToken", new OpaqueToken('AppView'));
      appChangeDetectorToken = $__export("appChangeDetectorToken", new OpaqueToken('AppChangeDetector'));
      appElementToken = $__export("appElementToken", new OpaqueToken('AppElement'));
      appComponentAnnotatedTypeToken = $__export("appComponentAnnotatedTypeToken", new OpaqueToken('AppComponentAnnotatedType'));
      appDocumentToken = $__export("appDocumentToken", new OpaqueToken('AppDocument'));
      Object.defineProperty(_createVmZone, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(bootstrap, "parameters", {get: function() {
          return [[Type], [], []];
        }});
      Object.defineProperty(_createAppInjector, "parameters", {get: function() {
          return [[Type], [List]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/application.map

//# sourceMappingURL=./application.map