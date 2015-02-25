var perfUtil = require('angular2/e2e_test/perf_util');
describe('ng2 selector benchmark', function() {
  var URL = 'benchmarks/src/compiler/selector_benchmark.html';
  afterEach(perfUtil.verifyNoBrowserErrors);
  it('should log parse stats', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#parse'],
      id: 'ng2.selector.parse',
      params: [{
        name: 'selectors',
        value: 10000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
  it('should log addSelectable stats', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#addSelectable'],
      id: 'ng2.selector.addSelectable',
      params: [{
        name: 'selectors',
        value: 10000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
  it('should log match stats', function(done) {
    perfUtil.runClickBenchmark({
      url: URL,
      buttons: ['#match'],
      id: 'ng2.selector.match',
      params: [{
        name: 'selectors',
        value: 10000,
        scale: 'linear'
      }]
    }).then(done, done.fail);
  });
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchmarks/e2e_test/selector_perf.map

//# sourceMappingURL=./selector_perf.map