System.register("angular2/src/forms/directives", ["rtts_assert/rtts_assert", "angular2/core", "angular2/src/facade/dom", "angular2/src/facade/lang", "angular2/src/facade/collection", "./model"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/forms/directives";
  var assert,
      TemplateConfig,
      Component,
      Decorator,
      NgElement,
      Ancestor,
      DOM,
      isBlank,
      isPresent,
      ListWrapper,
      ControlGroup,
      Control,
      ControlGroupDirectiveBase,
      ControlDirectiveBase,
      ControlNameDirective,
      ControlDirective,
      ControlGroupDirective,
      NewControlGroupDirective;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      TemplateConfig = $__m.TemplateConfig;
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      NgElement = $__m.NgElement;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
    }],
    execute: function() {
      ControlGroupDirectiveBase = (function() {
        var ControlGroupDirectiveBase = function ControlGroupDirectiveBase() {};
        return ($traceurRuntime.createClass)(ControlGroupDirectiveBase, {
          addDirective: function(directive) {},
          findControl: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((null), Control);
          }
        }, {});
      }());
      Object.defineProperty(ControlGroupDirectiveBase.prototype.findControl, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      ControlDirectiveBase = $__export("ControlDirectiveBase", (function() {
        var ControlDirectiveBase = function ControlDirectiveBase(groupDecorator, el) {
          var $__0 = this;
          this._groupDecorator = groupDecorator;
          this._el = el;
          DOM.on(el.domElement, "change", (function(_) {
            return $__0._updateControl();
          }));
        };
        return ($traceurRuntime.createClass)(ControlDirectiveBase, {
          set controlName(name) {
            assert.argumentTypes(name, assert.type.string);
            this._controlName = name;
            this._groupDecorator.addDirective(this);
            this._updateDOM();
          },
          get controlName() {
            return this._controlName;
          },
          isInitialized: function() {
            return assert.returnType((isPresent(this._controlName)), assert.type.boolean);
          },
          _updateDOM: function() {
            if (this.isInitialized()) {
              var inputElement = assert.type(this._el.domElement, assert.type.any);
              inputElement.value = this._control().value;
            }
          },
          _updateControl: function() {
            var inputElement = assert.type(this._el.domElement, assert.type.any);
            this._control().value = inputElement.value;
          },
          _control: function() {
            return this._groupDecorator.findControl(this._controlName);
          }
        }, {});
      }()));
      Object.defineProperty(ControlDirectiveBase, "parameters", {get: function() {
          return [[], [NgElement]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(ControlDirectiveBase.prototype, "controlName").set, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      ControlNameDirective = $__export("ControlNameDirective", (function($__super) {
        var ControlNameDirective = function ControlNameDirective(groupDecorator, el) {
          assert.argumentTypes(groupDecorator, ControlGroupDirective, el, NgElement);
          $traceurRuntime.superConstructor(ControlNameDirective).call(this, groupDecorator, el);
        };
        return ($traceurRuntime.createClass)(ControlNameDirective, {}, {}, $__super);
      }(ControlDirectiveBase)));
      Object.defineProperty(ControlNameDirective, "annotations", {get: function() {
          return [new Decorator({
            selector: '[control-name]',
            bind: {'control-name': 'controlName'}
          })];
        }});
      Object.defineProperty(ControlNameDirective, "parameters", {get: function() {
          return [[ControlGroupDirective, new Ancestor()], [NgElement]];
        }});
      ControlDirective = $__export("ControlDirective", (function($__super) {
        var ControlDirective = function ControlDirective(groupDecorator, el) {
          assert.argumentTypes(groupDecorator, NewControlGroupDirective, el, NgElement);
          $traceurRuntime.superConstructor(ControlDirective).call(this, groupDecorator, el);
        };
        return ($traceurRuntime.createClass)(ControlDirective, {}, {}, $__super);
      }(ControlDirectiveBase)));
      Object.defineProperty(ControlDirective, "annotations", {get: function() {
          return [new Decorator({
            selector: '[control]',
            bind: {'control': 'controlName'}
          })];
        }});
      Object.defineProperty(ControlDirective, "parameters", {get: function() {
          return [[NewControlGroupDirective, new Ancestor()], [NgElement]];
        }});
      ControlGroupDirective = $__export("ControlGroupDirective", (function($__super) {
        var ControlGroupDirective = function ControlGroupDirective() {
          $traceurRuntime.superConstructor(ControlGroupDirective).call(this);
          this._directives = ListWrapper.create();
        };
        return ($traceurRuntime.createClass)(ControlGroupDirective, {
          set controlGroup(controlGroup) {
            this._controlGroup = controlGroup;
            ListWrapper.forEach(this._directives, (function(cd) {
              return cd._updateDOM();
            }));
          },
          addDirective: function(c) {
            assert.argumentTypes(c, ControlNameDirective);
            ListWrapper.push(this._directives, c);
          },
          findControl: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return assert.returnType((this._controlGroup.controls[name]), Control);
          }
        }, {}, $__super);
      }(ControlGroupDirectiveBase)));
      Object.defineProperty(ControlGroupDirective, "annotations", {get: function() {
          return [new Decorator({
            selector: '[control-group]',
            bind: {'control-group': 'controlGroup'}
          })];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(ControlGroupDirective.prototype, "controlGroup").set, "parameters", {get: function() {
          return [[ControlGroup]];
        }});
      Object.defineProperty(ControlGroupDirective.prototype.addDirective, "parameters", {get: function() {
          return [[ControlNameDirective]];
        }});
      Object.defineProperty(ControlGroupDirective.prototype.findControl, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      NewControlGroupDirective = $__export("NewControlGroupDirective", (function($__super) {
        var NewControlGroupDirective = function NewControlGroupDirective() {
          $traceurRuntime.superConstructor(NewControlGroupDirective).call(this);
          this._directives = ListWrapper.create();
        };
        return ($traceurRuntime.createClass)(NewControlGroupDirective, {
          set initData(value) {
            this._initData = value;
          },
          addDirective: function(c) {
            assert.argumentTypes(c, ControlDirective);
            ListWrapper.push(this._directives, c);
            this._controlGroup = null;
          },
          findControl: function(name) {
            assert.argumentTypes(name, assert.type.string);
            if (isBlank(this._controlGroup)) {
              this._controlGroup = this._createControlGroup();
            }
            return assert.returnType((this._controlGroup.controls[name]), Control);
          },
          _createControlGroup: function() {
            var $__0 = this;
            var controls = ListWrapper.reduce(this._directives, (function(memo, cd) {
              if (cd.isInitialized()) {
                var initControlValue = $__0._initData[cd.controlName];
                memo[cd.controlName] = new Control(initControlValue);
              }
              return memo;
            }), {});
            return assert.returnType((new ControlGroup(controls)), ControlGroup);
          },
          get value() {
            return this._controlGroup.value;
          }
        }, {}, $__super);
      }(ControlGroupDirectiveBase)));
      Object.defineProperty(NewControlGroupDirective, "annotations", {get: function() {
          return [new Component({
            selector: '[new-control-group]',
            bind: {'new-control-group': 'initData'},
            template: new TemplateConfig({inline: '<content>'})
          })];
        }});
      Object.defineProperty(NewControlGroupDirective.prototype.addDirective, "parameters", {get: function() {
          return [[ControlDirective]];
        }});
      Object.defineProperty(NewControlGroupDirective.prototype.findControl, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/forms/directives.map

//# sourceMappingURL=./directives.map