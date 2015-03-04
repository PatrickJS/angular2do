import {assert} from "rtts_assert/rtts_assert";
import {isPresent,
  isBlank,
  BaseException,
  assertionsEnabled,
  RegExpWrapper} from 'angular2/src/facade/lang';
import {List,
  MapWrapper,
  StringMapWrapper} from 'angular2/src/facade/collection';
import {DOM} from 'angular2/src/facade/dom';
import {SelectorMatcher} from '../selector';
import {CssSelector} from '../selector';
import {DirectiveMetadata} from '../directive_metadata';
import {Component,
  Viewport} from '../../annotations/annotations';
import {CompileStep} from './compile_step';
import {CompileElement} from './compile_element';
import {CompileControl} from './compile_control';
import {isSpecialProperty} from './element_binder_builder';
;
var PROPERTY_BINDING_REGEXP = RegExpWrapper.create('^ *([^\\s\\|]+)');
export class DirectiveParser extends CompileStep {
  constructor(directives) {
    assert.argumentTypes(directives, assert.genericType(List, DirectiveMetadata));
    super();
    var selector;
    this._selectorMatcher = new SelectorMatcher();
    for (var i = 0; i < directives.length; i++) {
      var directiveMetadata = directives[i];
      selector = CssSelector.parse(directiveMetadata.annotation.selector);
      this._selectorMatcher.addSelectable(selector, directiveMetadata);
    }
  }
  process(parent, current, control) {
    assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
    var attrs = current.attrs();
    var classList = current.classList();
    var cssSelector = new CssSelector();
    cssSelector.setElement(DOM.nodeName(current.element));
    for (var i = 0; i < classList.length; i++) {
      cssSelector.addClassName(classList[i]);
    }
    MapWrapper.forEach(attrs, (attrValue, attrName) => {
      if (isBlank(current.propertyBindings) || isPresent(current.propertyBindings) && !MapWrapper.contains(current.propertyBindings, attrName)) {
        cssSelector.addAttribute(attrName, attrValue);
      }
    });
    if (isPresent(current.propertyBindings)) {
      MapWrapper.forEach(current.propertyBindings, (expression, prop) => {
        cssSelector.addAttribute(prop, expression.source);
      });
    }
    if (isPresent(current.variableBindings)) {
      MapWrapper.forEach(current.variableBindings, (value, name) => {
        cssSelector.addAttribute(name, value);
      });
    }
    var isTemplateElement = DOM.isTemplateElement(current.element);
    var matchedProperties;
    this._selectorMatcher.match(cssSelector, (selector, directive) => {
      matchedProperties = updateMatchedProperties(matchedProperties, selector, directive);
      checkDirectiveValidity(directive, current, isTemplateElement);
      current.addDirective(directive);
    });
    checkMissingDirectives(current, matchedProperties, isTemplateElement);
  }
}
Object.defineProperty(DirectiveParser, "parameters", {get: function() {
    return [[assert.genericType(List, DirectiveMetadata)]];
  }});
Object.defineProperty(DirectiveParser.prototype.process, "parameters", {get: function() {
    return [[CompileElement], [CompileElement], [CompileControl]];
  }});
function updateMatchedProperties(matchedProperties, selector, directive) {
  if (assertionsEnabled()) {
    var attrs = selector.attrs;
    if (!isPresent(matchedProperties)) {
      matchedProperties = StringMapWrapper.create();
    }
    if (isPresent(attrs)) {
      for (var idx = 0; idx < attrs.length; idx += 2) {
        StringMapWrapper.set(matchedProperties, attrs[idx], true);
      }
    }
    if (isPresent(directive.annotation) && isPresent(directive.annotation.bind)) {
      var bindMap = directive.annotation.bind;
      StringMapWrapper.forEach(bindMap, (value, key) => {
        var bindProp = RegExpWrapper.firstMatch(PROPERTY_BINDING_REGEXP, value);
        if (isPresent(bindProp) && isPresent(bindProp[1])) {
          StringMapWrapper.set(matchedProperties, bindProp[1], true);
        }
      });
    }
  }
  return matchedProperties;
}
function checkDirectiveValidity(directive, current, isTemplateElement) {
  if (directive.annotation instanceof Viewport) {
    if (!isTemplateElement) {
      throw new BaseException(`Viewport directives need to be placed on <template> elements or elements ` + `with template attribute - check ${current.elementDescription}`);
    } else if (isPresent(current.viewportDirective)) {
      throw new BaseException(`Only one viewport directive can be used per element - check ${current.elementDescription}`);
    }
  } else if (isTemplateElement) {
    throw new BaseException(`Only template directives are allowed on template elements - check ${current.elementDescription}`);
  } else if ((directive.annotation instanceof Component) && isPresent(current.componentDirective)) {
    throw new BaseException(`Multiple component directives not allowed on the same element - check ${current.elementDescription}`);
  }
}
function checkMissingDirectives(current, matchedProperties, isTemplateElement) {
  if (assertionsEnabled()) {
    var ppBindings = current.propertyBindings;
    if (isPresent(ppBindings)) {
      MapWrapper.forEach(ppBindings, (expression, prop) => {
        if (!DOM.hasProperty(current.element, prop) && !isSpecialProperty(prop)) {
          if (!isPresent(matchedProperties) || !isPresent(StringMapWrapper.get(matchedProperties, prop))) {
            throw new BaseException(`Missing directive to handle '${prop}' in ${current.elementDescription}`);
          }
        }
      });
    }
    if (isTemplateElement && !current.isViewRoot && !isPresent(current.viewportDirective)) {
      throw new BaseException(`Missing directive to handle: ${current.elementDescription}`);
    }
  }
}

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/pipeline/directive_parser.map

//# sourceMappingURL=./directive_parser.map