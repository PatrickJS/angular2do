import {assert} from "rtts_assert/rtts_assert";
import {describe,
  it,
  iit,
  xit,
  expect,
  beforeEach,
  afterEach} from 'angular2/test_lib';
import {isBlank,
  isPresent,
  BaseException,
  stringify,
  Date,
  DateWrapper} from 'angular2/src/facade/lang';
import {ListWrapper,
  List} from 'angular2/src/facade/collection';
import {PromiseWrapper,
  Promise} from 'angular2/src/facade/async';
import {Sampler,
  WebDriverAdapter,
  WebDriverExtension,
  Validator,
  Metric,
  Reporter,
  Browser,
  bind,
  Injector,
  Options,
  MeasureValues} from 'benchpress/benchpress';
export function main() {
  var EMPTY_EXECUTE = () => {};
  describe('sampler', () => {
    var sampler;
    function createSampler({driver,
      driverExtension,
      metric,
      reporter,
      validator,
      forceGc,
      prepare,
      execute} = {}) {
      var time = 1000;
      if (isBlank(metric)) {
        metric = new MockMetric([]);
      }
      if (isBlank(reporter)) {
        reporter = new MockReporter([]);
      }
      if (isBlank(driver)) {
        driver = new MockDriverAdapter([]);
      }
      if (isBlank(driverExtension)) {
        driverExtension = new MockDriverExtension([]);
      }
      var bindings = ListWrapper.concat(Sampler.BINDINGS, [bind(Metric).toValue(metric), bind(Reporter).toValue(reporter), bind(WebDriverAdapter).toValue(driver), bind(WebDriverExtension).toValue(driverExtension), bind(Options.EXECUTE).toValue(execute), bind(Validator).toValue(validator), bind(Sampler.TIME).toValue(() => DateWrapper.fromMillis(time++))]);
      if (isPresent(prepare)) {
        ListWrapper.push(bindings, bind(Options.PREPARE).toValue(prepare));
      }
      if (isPresent(forceGc)) {
        ListWrapper.push(bindings, bind(Options.FORCE_GC).toValue(forceGc));
      }
      sampler = new Injector(bindings).get(Sampler);
    }
    it('should call the prepare and execute callbacks using WebDriverAdapter.waitFor', (done) => {
      var log = [];
      var count = 0;
      var driver = new MockDriverAdapter([], (callback) => {
        var result = callback();
        ListWrapper.push(log, result);
        return PromiseWrapper.resolve(result);
      });
      createSampler({
        driver: driver,
        validator: createCountingValidator(2),
        prepare: () => {
          return count++;
        },
        execute: () => {
          return count++;
        }
      });
      sampler.sample().then((_) => {
        expect(count).toBe(4);
        expect(log).toEqual([0, 1, 2, 3]);
        done();
      });
    });
    it('should call prepare, gc, beginMeasure, execute, gc, endMeasure for every iteration', (done) => {
      var workCount = 0;
      var log = [];
      createSampler({
        forceGc: true,
        metric: createCountingMetric(log),
        driverExtension: new MockDriverExtension(log),
        validator: createCountingValidator(2),
        prepare: () => {
          ListWrapper.push(log, `p${workCount++}`);
        },
        execute: () => {
          ListWrapper.push(log, `w${workCount++}`);
        }
      });
      sampler.sample().then((_) => {
        expect(log).toEqual([['gc'], 'p0', ['gc'], ['beginMeasure'], 'w1', ['gc'], ['endMeasure', false, {'script': 0}], 'p2', ['gc'], ['beginMeasure'], 'w3', ['gc'], ['endMeasure', false, {'script': 1}]]);
        done();
      });
    });
    it('should call execute, gc, endMeasure for every iteration if there is no prepare callback', (done) => {
      var log = [];
      var workCount = 0;
      createSampler({
        forceGc: true,
        metric: createCountingMetric(log),
        driverExtension: new MockDriverExtension(log),
        validator: createCountingValidator(2),
        execute: () => {
          ListWrapper.push(log, `w${workCount++}`);
        },
        prepare: null
      });
      sampler.sample().then((_) => {
        expect(log).toEqual([['gc'], ['beginMeasure'], 'w0', ['gc'], ['endMeasure', true, {'script': 0}], 'w1', ['gc'], ['endMeasure', true, {'script': 1}]]);
        done();
      });
    });
    it('should not gc if the flag is not set', (done) => {
      var log = [];
      createSampler({
        metric: createCountingMetric(),
        driverExtension: new MockDriverExtension(log),
        validator: createCountingValidator(2),
        prepare: EMPTY_EXECUTE,
        execute: EMPTY_EXECUTE
      });
      sampler.sample().then((_) => {
        expect(log).toEqual([]);
        done();
      });
    });
    it('should only collect metrics for execute and ignore metrics from prepare', (done) => {
      var scriptTime = 0;
      var iterationCount = 1;
      createSampler({
        validator: createCountingValidator(2),
        metric: new MockMetric([], () => {
          var result = PromiseWrapper.resolve({'script': scriptTime});
          scriptTime = 0;
          return result;
        }),
        prepare: () => {
          scriptTime = 1 * iterationCount;
        },
        execute: () => {
          scriptTime = 10 * iterationCount;
          iterationCount++;
        }
      });
      sampler.sample().then((state) => {
        expect(state.completeSample.length).toBe(2);
        expect(state.completeSample[0]).toEqual(mv(0, 1000, {'script': 10}));
        expect(state.completeSample[1]).toEqual(mv(1, 1001, {'script': 20}));
        done();
      });
    });
    it('should call the validator for every execution and store the valid sample', (done) => {
      var log = [];
      var validSample = [{}];
      createSampler({
        metric: createCountingMetric(),
        validator: createCountingValidator(2, validSample, log),
        execute: EMPTY_EXECUTE
      });
      sampler.sample().then((state) => {
        expect(state.validSample).toBe(validSample);
        expect(log.length).toBe(2);
        expect(log[0]).toEqual(['validate', [mv(0, 1000, {'script': 0})], null]);
        expect(log[1]).toEqual(['validate', [mv(0, 1000, {'script': 0}), mv(1, 1001, {'script': 1})], validSample]);
        done();
      });
    });
    it('should report the metric values', (done) => {
      var log = [];
      var validSample = [{}];
      createSampler({
        validator: createCountingValidator(2, validSample),
        metric: createCountingMetric(),
        reporter: new MockReporter(log),
        execute: EMPTY_EXECUTE
      });
      sampler.sample().then((_) => {
        expect(log.length).toBe(3);
        expect(log[0]).toEqual(['reportMeasureValues', mv(0, 1000, {'script': 0})]);
        expect(log[1]).toEqual(['reportMeasureValues', mv(1, 1001, {'script': 1})]);
        expect(log[2]).toEqual(['reportSample', [mv(0, 1000, {'script': 0}), mv(1, 1001, {'script': 1})], validSample]);
        done();
      });
    });
  });
}
function mv(runIndex, time, values) {
  return new MeasureValues(runIndex, DateWrapper.fromMillis(time), values);
}
function createCountingValidator(count, validSample = null, log = null) {
  return new MockValidator(log, (completeSample) => {
    count--;
    if (count === 0) {
      return isPresent(validSample) ? validSample : completeSample;
    } else {
      return null;
    }
  });
}
function createCountingMetric(log = null) {
  var scriptTime = 0;
  return new MockMetric(log, () => {
    return {'script': scriptTime++};
  });
}
class MockDriverAdapter extends WebDriverAdapter {
  constructor(log = null, waitFor = null) {
    super();
    if (isBlank(log)) {
      log = [];
    }
    this._log = log;
    this._waitFor = waitFor;
  }
  waitFor(callback) {
    assert.argumentTypes(callback, Function);
    if (isPresent(this._waitFor)) {
      return assert.returnType((this._waitFor(callback)), Promise);
    } else {
      return assert.returnType((PromiseWrapper.resolve(callback())), Promise);
    }
  }
}
Object.defineProperty(MockDriverAdapter.prototype.waitFor, "parameters", {get: function() {
    return [[Function]];
  }});
class MockDriverExtension extends WebDriverExtension {
  constructor(log = null) {
    super();
    if (isBlank(log)) {
      log = [];
    }
    this._log = log;
  }
  gc() {
    ListWrapper.push(this._log, ['gc']);
    return assert.returnType((PromiseWrapper.resolve(null)), Promise);
  }
}
class MockValidator extends Validator {
  constructor(log = null, validate = null) {
    super();
    this._validate = validate;
    if (isBlank(log)) {
      log = [];
    }
    this._log = log;
  }
  validate(completeSample) {
    assert.argumentTypes(completeSample, assert.genericType(List, MeasureValues));
    var stableSample = isPresent(this._validate) ? this._validate(completeSample) : completeSample;
    ListWrapper.push(this._log, ['validate', completeSample, stableSample]);
    return assert.returnType((stableSample), assert.genericType(List, MeasureValues));
  }
}
Object.defineProperty(MockValidator.prototype.validate, "parameters", {get: function() {
    return [[assert.genericType(List, MeasureValues)]];
  }});
class MockMetric extends Metric {
  constructor(log = null, endMeasure = null) {
    super();
    this._endMeasure = endMeasure;
    if (isBlank(log)) {
      log = [];
    }
    this._log = log;
  }
  beginMeasure() {
    ListWrapper.push(this._log, ['beginMeasure']);
    return PromiseWrapper.resolve(null);
  }
  endMeasure(restart) {
    var measureValues = isPresent(this._endMeasure) ? this._endMeasure() : {};
    ListWrapper.push(this._log, ['endMeasure', restart, measureValues]);
    return PromiseWrapper.resolve(measureValues);
  }
}
class MockReporter extends Reporter {
  constructor(log = null) {
    super();
    if (isBlank(log)) {
      log = [];
    }
    this._log = log;
  }
  reportMeasureValues(values) {
    ListWrapper.push(this._log, ['reportMeasureValues', values]);
    return assert.returnType((PromiseWrapper.resolve(null)), Promise);
  }
  reportSample(completeSample, validSample) {
    ListWrapper.push(this._log, ['reportSample', completeSample, validSample]);
    return assert.returnType((PromiseWrapper.resolve(null)), Promise);
  }
}

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchpress/test/sampler_spec.map

//# sourceMappingURL=./sampler_spec.map