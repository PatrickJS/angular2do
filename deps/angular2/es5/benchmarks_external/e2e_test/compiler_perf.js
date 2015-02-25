System.register([], function($__export) {
  "use strict";
  var perfUtil;
  return {
    setters: [],
    execute: function() {
      perfUtil = require('angular2/e2e_test/perf_util');
      describe('ng1.x compiler benchmark', function() {
        var URL = 'benchmarks_external/src/compiler/compiler_benchmark.html';
        afterEach(perfUtil.verifyNoBrowserErrors);
        it('should log withBinding stats', function(done) {
          perfUtil.runClickBenchmark({
            url: URL,
            buttons: ['#compileWithBindings'],
            id: 'ng1.compile.withBindings',
            params: [{
              name: 'elements',
              value: 150,
              scale: 'linear'
            }]
          }).then(done, done.fail);
        });
        it('should log noBindings stats', function(done) {
          perfUtil.runClickBenchmark({
            url: URL,
            buttons: ['#compileNoBindings'],
            id: 'ng1.compile.noBindings',
            params: [{
              name: 'elements',
              value: 150,
              scale: 'linear'
            }]
          }).then(done, done.fail);
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks_external/e2e_test/compiler_perf.map

//# sourceMappingURL=../../benchmarks_external/e2e_test/compiler_perf.js.map