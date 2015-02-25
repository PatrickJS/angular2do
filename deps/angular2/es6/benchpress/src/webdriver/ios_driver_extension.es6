import {assert} from "rtts_assert/rtts_assert";
import {bind} from 'angular2/di';
import {ListWrapper,
  StringMap} from 'angular2/src/facade/collection';
import {Json,
  isPresent,
  isBlank,
  RegExpWrapper,
  StringWrapper} from 'angular2/src/facade/lang';
import {WebDriverExtension} from '../web_driver_extension';
import {WebDriverAdapter} from '../web_driver_adapter';
import {Promise} from 'angular2/src/facade/async';
export class IOsDriverExtension extends WebDriverExtension {
  static get BINDINGS() {
    return _BINDINGS;
  }
  constructor(driver) {
    assert.argumentTypes(driver, WebDriverAdapter);
    super();
    this._driver = driver;
  }
  gc() {
    return this._driver.executeScript('window.gc()');
  }
  timeBegin(name) {
    assert.argumentTypes(name, assert.type.string);
    return assert.returnType((this._driver.executeScript(`console.time('${name}');`)), Promise);
  }
  timeEnd(name, restartName = null) {
    assert.argumentTypes(name, assert.type.string, restartName, assert.type.string);
    var script = `console.timeEnd('${name}');`;
    if (isPresent(restartName)) {
      script += `console.time('${restartName}');`;
    }
    return assert.returnType((this._driver.executeScript(script)), Promise);
  }
  readPerfLog() {
    return this._driver.executeScript('1+1').then((_) => this._driver.logs('performance')).then((entries) => {
      var records = [];
      ListWrapper.forEach(entries, function(entry) {
        var message = Json.parse(entry['message'])['message'];
        if (StringWrapper.equals(message['method'], 'Timeline.eventRecorded')) {
          ListWrapper.push(records, message['params']['record']);
        }
      });
      return this._convertPerfRecordsToEvents(records);
    });
  }
  _convertPerfRecordsToEvents(records, events = null) {
    if (isBlank(events)) {
      events = [];
    }
    records.forEach((record) => {
      var endEvent = null;
      var type = record['type'];
      var data = record['data'];
      var startTime = record['startTime'];
      var endTime = record['endTime'];
      if (StringWrapper.equals(type, 'FunctionCall') && (isBlank(data) || !StringWrapper.equals(data['scriptName'], 'InjectedScript'))) {
        ListWrapper.push(events, createStartEvent('script', startTime));
        endEvent = createEndEvent('script', endTime);
      } else if (StringWrapper.equals(type, 'Time')) {
        ListWrapper.push(events, createMarkStartEvent(data['message'], startTime));
      } else if (StringWrapper.equals(type, 'TimeEnd')) {
        ListWrapper.push(events, createMarkEndEvent(data['message'], startTime));
      } else if (StringWrapper.equals(type, 'RecalculateStyles') || StringWrapper.equals(type, 'Layout') || StringWrapper.equals(type, 'UpdateLayerTree') || StringWrapper.equals(type, 'Paint') || StringWrapper.equals(type, 'Rasterize') || StringWrapper.equals(type, 'CompositeLayers')) {
        ListWrapper.push(events, createStartEvent('render', startTime));
        endEvent = createEndEvent('render', endTime);
      } else if (StringWrapper.equals(type, 'GCEvent')) {
        ListWrapper.push(events, createStartEvent('gc', startTime, {'usedHeapSize': 0}));
        endEvent = createEndEvent('gc', endTime, {'usedHeapSize': -data['usedHeapSizeDelta']});
      }
      if (isPresent(record['children'])) {
        this._convertPerfRecordsToEvents(record['children'], events);
      }
      if (isPresent(endEvent)) {
        ListWrapper.push(events, endEvent);
      }
    });
    return events;
  }
  supports(capabilities) {
    assert.argumentTypes(capabilities, StringMap);
    return assert.returnType((StringWrapper.equals(capabilities['browserName'].toLowerCase(), 'safari')), assert.type.boolean);
  }
}
Object.defineProperty(IOsDriverExtension, "parameters", {get: function() {
    return [[WebDriverAdapter]];
  }});
Object.defineProperty(IOsDriverExtension.prototype.timeBegin, "parameters", {get: function() {
    return [[assert.type.string]];
  }});
Object.defineProperty(IOsDriverExtension.prototype.timeEnd, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(IOsDriverExtension.prototype.supports, "parameters", {get: function() {
    return [[StringMap]];
  }});
function createEvent(ph, name, time, args = null) {
  var result = {
    'cat': 'timeline',
    'name': name,
    'ts': time,
    'ph': ph,
    'pid': 'pid0'
  };
  if (isPresent(args)) {
    result['args'] = args;
  }
  return result;
}
function createStartEvent(name, time, args = null) {
  return createEvent('B', name, time, args);
}
function createEndEvent(name, time, args = null) {
  return createEvent('E', name, time, args);
}
function createMarkStartEvent(name, time) {
  return createEvent('b', name, time);
}
function createMarkEndEvent(name, time) {
  return createEvent('e', name, time);
}
var _BINDINGS = [bind(IOsDriverExtension).toFactory((driver) => new IOsDriverExtension(driver), [WebDriverAdapter])];

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchpress/src/webdriver/ios_driver_extension.map

//# sourceMappingURL=./ios_driver_extension.map