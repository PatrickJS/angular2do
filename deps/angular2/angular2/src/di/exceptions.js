System.register("angular2/src/di/exceptions", ["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "./key"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/exceptions";
  var assert,
      ListWrapper,
      List,
      stringify,
      Key,
      KeyMetadataError,
      ProviderError,
      NoProviderError,
      AsyncBindingError,
      CyclicDependencyError,
      InstantiationError,
      InvalidBindingError,
      NoAnnotationError;
  function findFirstClosedCycle(keys) {
    assert.argumentTypes(keys, List);
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
      if (ListWrapper.contains(res, keys[i])) {
        ListWrapper.push(res, keys[i]);
        return res;
      } else {
        ListWrapper.push(res, keys[i]);
      }
    }
    return res;
  }
  function constructResolvingPath(keys) {
    if (keys.length > 1) {
      var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
      var tokenStrs = ListWrapper.map(reversed, (function(k) {
        return stringify(k.token);
      }));
      return " (" + tokenStrs.join(' -> ') + ")";
    } else {
      return "";
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      stringify = $__m.stringify;
    }, function($__m) {
      Key = $__m.Key;
    }],
    execute: function() {
      Object.defineProperty(findFirstClosedCycle, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(constructResolvingPath, "parameters", {get: function() {
          return [[List]];
        }});
      KeyMetadataError = $__export("KeyMetadataError", (function($__super) {
        var KeyMetadataError = function KeyMetadataError() {
          $traceurRuntime.superConstructor(KeyMetadataError).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(KeyMetadataError, {}, {}, $__super);
      }(Error)));
      ProviderError = $__export("ProviderError", (function($__super) {
        var ProviderError = function ProviderError(key, constructResolvingMessage) {
          assert.argumentTypes(key, Key, constructResolvingMessage, Function);
          $traceurRuntime.superConstructor(ProviderError).call(this);
          this.keys = [key];
          this.constructResolvingMessage = constructResolvingMessage;
          this.message = this.constructResolvingMessage(this.keys);
        };
        return ($traceurRuntime.createClass)(ProviderError, {
          addKey: function(key) {
            assert.argumentTypes(key, Key);
            ListWrapper.push(this.keys, key);
            this.message = this.constructResolvingMessage(this.keys);
          },
          toString: function() {
            return this.message;
          }
        }, {}, $__super);
      }(Error)));
      Object.defineProperty(ProviderError, "parameters", {get: function() {
          return [[Key], [Function]];
        }});
      Object.defineProperty(ProviderError.prototype.addKey, "parameters", {get: function() {
          return [[Key]];
        }});
      NoProviderError = $__export("NoProviderError", (function($__super) {
        var NoProviderError = function NoProviderError(key) {
          assert.argumentTypes(key, Key);
          $traceurRuntime.superConstructor(NoProviderError).call(this, key, function(keys) {
            assert.argumentTypes(keys, List);
            var first = stringify(ListWrapper.first(keys).token);
            return ("No provider for " + first + "!" + constructResolvingPath(keys));
          });
        };
        return ($traceurRuntime.createClass)(NoProviderError, {}, {}, $__super);
      }(ProviderError)));
      Object.defineProperty(NoProviderError, "parameters", {get: function() {
          return [[Key]];
        }});
      AsyncBindingError = $__export("AsyncBindingError", (function($__super) {
        var AsyncBindingError = function AsyncBindingError(key) {
          assert.argumentTypes(key, Key);
          $traceurRuntime.superConstructor(AsyncBindingError).call(this, key, function(keys) {
            assert.argumentTypes(keys, List);
            var first = stringify(ListWrapper.first(keys).token);
            return ("Cannot instantiate " + first + " synchronously. ") + ("It is provided as a promise!" + constructResolvingPath(keys));
          });
        };
        return ($traceurRuntime.createClass)(AsyncBindingError, {}, {}, $__super);
      }(ProviderError)));
      Object.defineProperty(AsyncBindingError, "parameters", {get: function() {
          return [[Key]];
        }});
      CyclicDependencyError = $__export("CyclicDependencyError", (function($__super) {
        var CyclicDependencyError = function CyclicDependencyError(key) {
          assert.argumentTypes(key, Key);
          $traceurRuntime.superConstructor(CyclicDependencyError).call(this, key, function(keys) {
            assert.argumentTypes(keys, List);
            return ("Cannot instantiate cyclic dependency!" + constructResolvingPath(keys));
          });
        };
        return ($traceurRuntime.createClass)(CyclicDependencyError, {}, {}, $__super);
      }(ProviderError)));
      Object.defineProperty(CyclicDependencyError, "parameters", {get: function() {
          return [[Key]];
        }});
      InstantiationError = $__export("InstantiationError", (function($__super) {
        var InstantiationError = function InstantiationError(originalException, key) {
          assert.argumentTypes(originalException, assert.type.any, key, Key);
          $traceurRuntime.superConstructor(InstantiationError).call(this, key, function(keys) {
            assert.argumentTypes(keys, List);
            var first = stringify(ListWrapper.first(keys).token);
            return ("Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".") + (" ORIGINAL ERROR: " + originalException);
          });
        };
        return ($traceurRuntime.createClass)(InstantiationError, {}, {}, $__super);
      }(ProviderError)));
      Object.defineProperty(InstantiationError, "parameters", {get: function() {
          return [[], [Key]];
        }});
      InvalidBindingError = $__export("InvalidBindingError", (function($__super) {
        var InvalidBindingError = function InvalidBindingError(binding) {
          $traceurRuntime.superConstructor(InvalidBindingError).call(this);
          this.message = ("Invalid binding " + binding);
        };
        return ($traceurRuntime.createClass)(InvalidBindingError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error)));
      NoAnnotationError = $__export("NoAnnotationError", (function($__super) {
        var NoAnnotationError = function NoAnnotationError(typeOrFunc) {
          $traceurRuntime.superConstructor(NoAnnotationError).call(this);
          this.message = ("Cannot resolve all parameters for " + stringify(typeOrFunc));
        };
        return ($traceurRuntime.createClass)(NoAnnotationError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error)));
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/di/exceptions.map

//# sourceMappingURL=./exceptions.map