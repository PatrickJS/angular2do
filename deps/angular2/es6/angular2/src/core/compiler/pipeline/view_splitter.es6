import {assert} from "rtts_assert/rtts_assert";
import {isBlank,
  isPresent,
  BaseException} from 'angular2/src/facade/lang';
import {DOM,
  TemplateElement} from 'angular2/src/facade/dom';
import {MapWrapper,
  ListWrapper} from 'angular2/src/facade/collection';
import {Parser} from 'angular2/change_detection';
import {CompileStep} from './compile_step';
import {CompileElement} from './compile_element';
import {CompileControl} from './compile_control';
import {StringWrapper} from 'angular2/src/facade/lang';
export class ViewSplitter extends CompileStep {
  constructor(parser) {
    assert.argumentTypes(parser, Parser);
    super();
    this._parser = parser;
  }
  process(parent, current, control) {
    assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
    var attrs = current.attrs();
    var templateBindings = MapWrapper.get(attrs, 'template');
    var hasTemplateBinding = isPresent(templateBindings);
    MapWrapper.forEach(attrs, (attrValue, attrName) => {
      if (StringWrapper.startsWith(attrName, '*')) {
        var key = StringWrapper.substring(attrName, 1);
        if (hasTemplateBinding) {
          throw new BaseException(`Only one template directive per element is allowed: ` + `${templateBindings} and ${key} cannot be used simultaneously ` + `in ${current.elementDescription}`);
        } else {
          templateBindings = (attrValue.length == 0) ? key : key + ' ' + attrValue;
          hasTemplateBinding = true;
        }
      }
    });
    if (isBlank(parent)) {
      current.isViewRoot = true;
    } else {
      if (DOM.isTemplateElement(current.element)) {
        if (!current.isViewRoot) {
          var viewRoot = new CompileElement(DOM.createTemplate(''));
          var currentElement = assert.type(current.element, TemplateElement);
          var viewRootElement = assert.type(viewRoot.element, TemplateElement);
          this._moveChildNodes(DOM.content(currentElement), DOM.content(viewRootElement));
          viewRoot.elementDescription = current.elementDescription;
          viewRoot.isViewRoot = true;
          control.addChild(viewRoot);
        }
      } else {
        if (hasTemplateBinding) {
          var newParent = new CompileElement(DOM.createTemplate(''));
          newParent.elementDescription = current.elementDescription;
          current.isViewRoot = true;
          this._parseTemplateBindings(templateBindings, newParent);
          this._addParentElement(current.element, newParent.element);
          control.addParent(newParent);
          DOM.remove(current.element);
        }
      }
    }
  }
  _moveChildNodes(source, target) {
    var next = DOM.firstChild(source);
    while (isPresent(next)) {
      DOM.appendChild(target, next);
      next = DOM.firstChild(source);
    }
  }
  _addParentElement(currentElement, newParentElement) {
    DOM.insertBefore(currentElement, newParentElement);
    DOM.appendChild(newParentElement, currentElement);
  }
  _parseTemplateBindings(templateBindings, compileElement) {
    assert.argumentTypes(templateBindings, assert.type.string, compileElement, CompileElement);
    var bindings = this._parser.parseTemplateBindings(templateBindings, compileElement.elementDescription);
    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i];
      if (binding.keyIsVar) {
        compileElement.addVariableBinding(binding.key, binding.name);
      } else if (isPresent(binding.expression)) {
        compileElement.addPropertyBinding(binding.key, binding.expression);
      } else {
        DOM.setAttribute(compileElement.element, binding.key, '');
      }
    }
  }
}
Object.defineProperty(ViewSplitter, "parameters", {get: function() {
    return [[Parser]];
  }});
Object.defineProperty(ViewSplitter.prototype.process, "parameters", {get: function() {
    return [[CompileElement], [CompileElement], [CompileControl]];
  }});
Object.defineProperty(ViewSplitter.prototype._parseTemplateBindings, "parameters", {get: function() {
    return [[assert.type.string], [CompileElement]];
  }});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/compiler/pipeline/view_splitter.map

//# sourceMappingURL=./view_splitter.map