var perfUtil = require('angular2/e2e_test/perf_util');
describe('ng2 compiler benchmark', function() {
  var URL = 'benchmarks/src/compiler/compiler_benchmark.html';
  afterEach(perfUtil.verifyNoBrowserErrors);
  it('should log withBindings stats', function(done) {
    perfUtil.runBenchmark({
      url: URL,
      id: 'ng2.compile.withBindings',
      params: [{
        name: 'elements',
        value: 150,
        scale: 'linear'
      }],
      work: function() {
        browser.executeScript('document.querySelector("#compileWithBindings").click()');
        browser.sleep(500);
      }
    }).then(done, done.fail);
  });
  it('should log noBindings stats', function(done) {
    perfUtil.runBenchmark({
      url: URL,
      id: 'ng2.compile.noBindings',
      params: [{
        name: 'elements',
        value: 150,
        scale: 'linear'
      }],
      work: function() {
        browser.executeScript('document.querySelector("#compileNoBindings").click()');
        browser.sleep(500);
      }
    }).then(done, done.fail);
  });
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/benchmarks/e2e_test/compiler_perf.map

//# sourceMappingURL=./compiler_perf.map