import {DOM} from 'angular2/src/facade/dom';
export {proxy} from 'rtts_assert/rtts_assert';
export var describe = window.describe;
export var xdescribe = window.xdescribe;
export var ddescribe = window.ddescribe;
export var it = window.it;
export var xit = window.xit;
export var iit = window.iit;
export var beforeEach = window.beforeEach;
export var afterEach = window.afterEach;
export var expect = window.expect;
export var IS_DARTIUM = false;
window.print = function(msg) {
  if (window.dump) {
    window.dump(msg);
  } else {
    window.console.log(msg);
  }
};
window.Map.prototype.jasmineToString = function() {
  var m = this;
  if (!m) {
    return '' + m;
  }
  var res = [];
  m.forEach((v, k) => {
    res.push(`${k}:${v}`);
  });
  return `{ ${res.join(',')} }`;
};
window.beforeEach(function() {
  jasmine.addMatchers({
    toEqual: function(util, customEqualityTesters) {
      return {compare: function(actual, expected) {
          return {pass: util.equals(actual, expected, [compareMap])};
        }};
      function compareMap(actual, expected) {
        if (actual instanceof Map) {
          var pass = actual.size === expected.size;
          if (pass) {
            actual.forEach((v, k) => {
              pass = pass && util.equals(v, expected.get(k));
            });
          }
          return pass;
        } else {
          return undefined;
        }
      }
    },
    toBePromise: function() {
      return {compare: function(actual, expectedClass) {
          var pass = typeof actual === 'object' && typeof actual.then === 'function';
          return {
            pass: pass,
            get message() {
              return 'Expected ' + actual + ' to be a promise';
            }
          };
        }};
    },
    toBeAnInstanceOf: function() {
      return {compare: function(actual, expectedClass) {
          var pass = typeof actual === 'object' && actual instanceof expectedClass;
          return {
            pass: pass,
            get message() {
              return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
            }
          };
        }};
    },
    toHaveText: function() {
      return {compare: function(actual, expectedText) {
          var actualText = elementText(actual);
          return {
            pass: actualText == expectedText,
            get message() {
              return 'Expected ' + actualText + ' to be equal to ' + expectedText;
            }
          };
        }};
    },
    toImplement: function() {
      return {compare: function(actualObject, expectedInterface) {
          var objProps = Object.keys(actualObject.constructor.prototype);
          var intProps = Object.keys(expectedInterface.prototype);
          var missedMethods = [];
          intProps.forEach((k) => {
            if (!actualObject.constructor.prototype[k])
              missedMethods.push(k);
          });
          return {
            pass: missedMethods.length == 0,
            get message() {
              return 'Expected ' + actualObject + ' to have the following methods: ' + missedMethods.join(", ");
            }
          };
        }};
    }
  });
});
export class SpyObject {
  spy(name) {
    if (!this[name]) {
      this[name] = this._createGuinnessCompatibleSpy();
    }
    return this[name];
  }
  rttsAssert(value) {
    return true;
  }
  _createGuinnessCompatibleSpy() {
    var newSpy = jasmine.createSpy();
    newSpy.andCallFake = newSpy.and.callFake;
    return newSpy;
  }
}
function elementText(n) {
  var hasShadowRoot = (n) => n instanceof Element && n.shadowRoot;
  var hasNodes = (n) => {
    var children = DOM.childNodes(n);
    return children && children.length > 0;
  };
  if (n instanceof Comment)
    return '';
  if (n instanceof Array)
    return n.map((nn) => elementText(nn)).join("");
  if (n instanceof Element && DOM.tagName(n) == 'CONTENT')
    return elementText(Array.prototype.slice.apply(n.getDistributedNodes()));
  if (hasShadowRoot(n))
    return elementText(DOM.childNodesAsList(n.shadowRoot));
  if (hasNodes(n))
    return elementText(DOM.childNodesAsList(n));
  return n.textContent;
}

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/test_lib/test_lib.map

//# sourceMappingURL=./test_lib.map