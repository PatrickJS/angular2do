System.register("angular2/src/directives/switch", ["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/viewport", "angular2/src/core/dom/element", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/annotations/visibility"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/switch";
  var assert,
      Decorator,
      Template,
      ViewPort,
      NgElement,
      DOM,
      isPresent,
      isBlank,
      ListWrapper,
      List,
      MapWrapper,
      Map,
      Parent,
      Switch,
      SwitchWhen,
      SwitchDefault,
      _whenDefault;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Template = $__m.Template;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
    }, function($__m) {
      Parent = $__m.Parent;
    }],
    execute: function() {
      Switch = $__export("Switch", (function() {
        var Switch = function Switch() {
          this._valueViewPorts = MapWrapper.create();
          this._activeViewPorts = ListWrapper.create();
          this._useDefault = false;
        };
        return ($traceurRuntime.createClass)(Switch, {
          set value(value) {
            this._removeAllActiveViewPorts();
            this._useDefault = false;
            var viewPorts = MapWrapper.get(this._valueViewPorts, value);
            if (isBlank(viewPorts)) {
              this._useDefault = true;
              viewPorts = MapWrapper.get(this._valueViewPorts, _whenDefault);
            }
            this._activateViewPorts(viewPorts);
            this._switchValue = value;
          },
          _onWhenValueChanged: function(oldWhen, newWhen, viewPort) {
            assert.argumentTypes(oldWhen, assert.type.any, newWhen, assert.type.any, viewPort, ViewPort);
            this._deregisterViewPort(oldWhen, viewPort);
            this._registerViewPort(newWhen, viewPort);
            if (oldWhen === this._switchValue) {
              viewPort.remove();
              ListWrapper.remove(this._activeViewPorts, viewPort);
            } else if (newWhen === this._switchValue) {
              if (this._useDefault) {
                this._useDefault = false;
                this._removeAllActiveViewPorts();
              }
              viewPort.create();
              ListWrapper.push(this._activeViewPorts, viewPort);
            }
            if (this._activeViewPorts.length === 0 && !this._useDefault) {
              this._useDefault = true;
              this._activateViewPorts(MapWrapper.get(this._valueViewPorts, _whenDefault));
            }
          },
          _removeAllActiveViewPorts: function() {
            var activeViewPorts = this._activeViewPorts;
            for (var i = 0; i < activeViewPorts.length; i++) {
              activeViewPorts[i].remove();
            }
            this._activeViewPorts = ListWrapper.create();
          },
          _activateViewPorts: function(viewPorts) {
            if (isPresent(viewPorts)) {
              for (var i = 0; i < viewPorts.length; i++) {
                viewPorts[i].create();
              }
              this._activeViewPorts = viewPorts;
            }
          },
          _registerViewPort: function(value, viewPort) {
            assert.argumentTypes(value, assert.type.any, viewPort, ViewPort);
            var viewPorts = MapWrapper.get(this._valueViewPorts, value);
            if (isBlank(viewPorts)) {
              viewPorts = ListWrapper.create();
              MapWrapper.set(this._valueViewPorts, value, viewPorts);
            }
            ListWrapper.push(viewPorts, viewPort);
          },
          _deregisterViewPort: function(value, viewPort) {
            assert.argumentTypes(value, assert.type.any, viewPort, ViewPort);
            if (value == _whenDefault)
              return ;
            var viewPorts = MapWrapper.get(this._valueViewPorts, value);
            if (viewPorts.length == 1) {
              MapWrapper.delete(this._valueViewPorts, value);
            } else {
              ListWrapper.remove(viewPorts, viewPort);
            }
          }
        }, {});
      }()));
      Object.defineProperty(Switch, "annotations", {get: function() {
          return [new Decorator({
            selector: '[switch]',
            bind: {'switch': 'value'}
          })];
        }});
      Object.defineProperty(Switch.prototype._onWhenValueChanged, "parameters", {get: function() {
          return [[], [], [ViewPort]];
        }});
      Object.defineProperty(Switch.prototype._registerViewPort, "parameters", {get: function() {
          return [[], [ViewPort]];
        }});
      Object.defineProperty(Switch.prototype._deregisterViewPort, "parameters", {get: function() {
          return [[], [ViewPort]];
        }});
      SwitchWhen = $__export("SwitchWhen", (function() {
        var SwitchWhen = function SwitchWhen(el, viewPort, sswitch) {
          assert.argumentTypes(el, NgElement, viewPort, ViewPort, sswitch, Switch);
          this._value = _whenDefault;
          this._switch = sswitch;
          this._viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(SwitchWhen, {set when(value) {
            this._switch._onWhenValueChanged(this._value, value, this._viewPort);
            this._value = value;
          }}, {});
      }()));
      Object.defineProperty(SwitchWhen, "annotations", {get: function() {
          return [new Template({
            selector: '[switch-when]',
            bind: {'switch-when': 'when'}
          })];
        }});
      Object.defineProperty(SwitchWhen, "parameters", {get: function() {
          return [[NgElement], [ViewPort], [Switch, new Parent()]];
        }});
      SwitchDefault = $__export("SwitchDefault", (function() {
        var SwitchDefault = function SwitchDefault(viewPort, sswitch) {
          assert.argumentTypes(viewPort, ViewPort, sswitch, Switch);
          sswitch._registerViewPort(_whenDefault, viewPort);
        };
        return ($traceurRuntime.createClass)(SwitchDefault, {}, {});
      }()));
      Object.defineProperty(SwitchDefault, "annotations", {get: function() {
          return [new Template({selector: '[switch-default]'})];
        }});
      Object.defineProperty(SwitchDefault, "parameters", {get: function() {
          return [[ViewPort], [Switch, new Parent()]];
        }});
      _whenDefault = new Object();
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/switch.map

//# sourceMappingURL=./switch.map