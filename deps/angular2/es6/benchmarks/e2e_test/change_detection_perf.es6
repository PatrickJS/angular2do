var perfUtil = require('angular2/e2e_test/perf_util');
describe('ng2 change detection benchmark', function() {
  var URL = 'benchmarks/src/change_detection/change_detection_benchmark.html';
  afterEach(perfUtil.verifyNoBrowserErrors);
  it('should log ng stats (dynamic)', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#ng2ChangeDetectionDynamic'],
      id: 'ng2.changeDetection.dynamic',
      params: [{
        name: 'numberOfChecks',
        value: 900000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
  it('should log ng stats (jit)', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#ng2ChangeDetectionJit'],
      id: 'ng2.changeDetection.jit',
      params: [{
        name: 'numberOfChecks',
        value: 900000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
  it('should log baseline stats', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#baselineChangeDetection'],
      id: 'baseline.changeDetection',
      params: [{
        name: 'numberOfChecks',
        value: 900000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchmarks/e2e_test/change_detection_perf.map

//# sourceMappingURL=./change_detection_perf.map