import {assert} from "rtts_assert/rtts_assert";
import {PromiseWrapper,
  Promise} from 'angular2/src/facade/async';
import {isPresent,
  isBlank,
  int,
  BaseException,
  StringWrapper,
  Math} from 'angular2/src/facade/lang';
import {ListWrapper,
  StringMap,
  StringMapWrapper} from 'angular2/src/facade/collection';
import {bind,
  OpaqueToken} from 'angular2/di';
import {WebDriverExtension} from '../web_driver_extension';
import {Metric} from '../metric';
export class PerflogMetric extends Metric {
  static get BINDINGS() {
    return _BINDINGS;
  }
  static get SET_TIMEOUT() {
    return _SET_TIMEOUT;
  }
  constructor(driverExtension, setTimeout) {
    assert.argumentTypes(driverExtension, WebDriverExtension, setTimeout, Function);
    super();
    this._driverExtension = driverExtension;
    this._remainingEvents = [];
    this._measureCount = 0;
    this._setTimeout = setTimeout;
  }
  describe() {
    return assert.returnType(({
      'script': 'script execution time in ms',
      'render': 'render time in ms',
      'gcTime': 'gc time in ms',
      'gcAmount': 'gc amount in kbytes',
      'gcTimeInScript': 'gc time during script execution in ms',
      'gcAmountInScript': 'gc amount during script execution in kbytes'
    }), StringMap);
  }
  beginMeasure() {
    return assert.returnType((this._driverExtension.timeBegin(this._markName(this._measureCount++))), Promise);
  }
  endMeasure(restart) {
    var markName = this._markName(this._measureCount - 1);
    var nextMarkName = restart ? this._markName(this._measureCount++) : null;
    return assert.returnType((this._driverExtension.timeEnd(markName, nextMarkName).then((_) => this._readUntilEndMark(markName))), assert.genericType(Promise, Object));
  }
  _readUntilEndMark(markName, loopCount = 0, startEvent = null) {
    if (loopCount > _MAX_RETRY_COUNT) {
      throw new BaseException(`Tried too often to get the ending mark: ${loopCount}`);
    }
    return this._driverExtension.readPerfLog().then((events) => {
      this._addEvents(events);
      var result = this._aggregateEvents(this._remainingEvents, markName);
      if (isPresent(result)) {
        this._remainingEvents = events;
        return result;
      }
      var completer = PromiseWrapper.completer();
      this._setTimeout(() => completer.complete(this._readUntilEndMark(markName, loopCount + 1)), 100);
      return completer.promise;
    });
  }
  _addEvents(events) {
    var needSort = false;
    ListWrapper.forEach(events, (event) => {
      if (StringWrapper.equals(event['ph'], 'X')) {
        needSort = true;
        var startEvent = {};
        var endEvent = {};
        StringMapWrapper.forEach(event, (value, prop) => {
          startEvent[prop] = value;
          endEvent[prop] = value;
        });
        startEvent['ph'] = 'B';
        endEvent['ph'] = 'E';
        endEvent['ts'] = startEvent['ts'] + startEvent['dur'];
        ListWrapper.push(this._remainingEvents, startEvent);
        ListWrapper.push(this._remainingEvents, endEvent);
      } else {
        ListWrapper.push(this._remainingEvents, event);
      }
    });
    if (needSort) {
      ListWrapper.sort(this._remainingEvents, (a, b) => {
        var diff = a['ts'] - b['ts'];
        return diff > 0 ? 1 : diff < 0 ? -1 : 0;
      });
    }
  }
  _aggregateEvents(events, markName) {
    var result = {
      'script': 0,
      'render': 0,
      'gcTime': 0,
      'gcAmount': 0,
      'gcTimeInScript': 0,
      'gcAmountInScript': 0
    };
    var markStartEvent = null;
    var markEndEvent = null;
    var intervalStarts = {};
    events.forEach((event) => {
      var ph = event['ph'];
      var name = event['name'];
      if (StringWrapper.equals(ph, 'b') && StringWrapper.equals(name, markName)) {
        markStartEvent = event;
      } else if (StringWrapper.equals(ph, 'e') && StringWrapper.equals(name, markName)) {
        markEndEvent = event;
      }
      if (isPresent(markStartEvent) && isBlank(markEndEvent) && event['pid'] === markStartEvent['pid']) {
        if (StringWrapper.equals(ph, 'B')) {
          intervalStarts[name] = event;
        } else if (StringWrapper.equals(ph, 'E') && isPresent(intervalStarts[name])) {
          var startEvent = intervalStarts[name];
          var duration = event['ts'] - startEvent['ts'];
          intervalStarts[name] = null;
          if (StringWrapper.equals(name, 'gc')) {
            result['gcTime'] += duration;
            result['gcAmount'] += (startEvent['args']['usedHeapSize'] - event['args']['usedHeapSize']) / 1000;
            if (isPresent(intervalStarts['script'])) {
              result['gcTimeInScript'] += duration;
              result['gcAmountInScript'] += result['gcAmount'];
            }
          } else {
            result[name] += duration;
          }
        }
      }
    });
    result['script'] -= result['gcTimeInScript'];
    return isPresent(markStartEvent) && isPresent(markEndEvent) ? result : null;
  }
  _markName(index) {
    return `${_MARK_NAME_PREFIX}${index}`;
  }
}
Object.defineProperty(PerflogMetric, "parameters", {get: function() {
    return [[WebDriverExtension], [Function]];
  }});
Object.defineProperty(PerflogMetric.prototype.endMeasure, "parameters", {get: function() {
    return [[assert.type.boolean]];
  }});
Object.defineProperty(PerflogMetric.prototype._readUntilEndMark, "parameters", {get: function() {
    return [[assert.type.string], [int], []];
  }});
var _MAX_RETRY_COUNT = 20;
var _MARK_NAME_PREFIX = 'benchpress';
var _SET_TIMEOUT = new OpaqueToken('PerflogMetric.setTimeout');
var _BINDINGS = [bind(PerflogMetric).toFactory((driverExtension, setTimeout) => new PerflogMetric(driverExtension, setTimeout), [WebDriverExtension, _SET_TIMEOUT]), bind(_SET_TIMEOUT).toValue((fn, millis) => PromiseWrapper.setTimeout(fn, millis))];

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchpress/src/metric/perflog_metric.map

//# sourceMappingURL=./perflog_metric.map