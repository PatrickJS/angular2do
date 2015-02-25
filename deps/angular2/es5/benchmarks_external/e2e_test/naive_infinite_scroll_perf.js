System.register([], function($__export) {
  "use strict";
  var perfUtil;
  return {
    setters: [],
    execute: function() {
      perfUtil = require('angular2/e2e_test/perf_util');
      describe('ng-dart1.x naive infinite scroll benchmark', function() {
        var URL = 'benchmarks_external/src/naive_infinite_scroll/index.html';
        afterEach(perfUtil.verifyNoBrowserErrors);
        [1, 2, 4].forEach(function(appSize) {
          it('should run scroll benchmark and collect stats for appSize = ' + appSize, function(done) {
            perfUtil.runBenchmark({
              url: URL,
              id: 'ng1-dart1.x.naive_infinite_scroll',
              work: function() {
                element(by.deepCss('#reset-btn')).click();
                element(by.deepCss('#run-btn')).click();
                var s = 1000;
                if (appSize > 4) {
                  s = s + appSize * 100;
                }
                browser.sleep(s);
              },
              params: [{
                name: 'appSize',
                value: appSize
              }, {
                name: 'iterationCount',
                value: 20,
                scale: 'linear'
              }, {
                name: 'scrollIncrement',
                value: 40
              }]
            }).then(done, done.fail);
          });
        });
      });
    }
  };
});

//# sourceMappingURL=benchmarks_external/e2e_test/naive_infinite_scroll_perf.map

//# sourceMappingURL=../../benchmarks_external/e2e_test/naive_infinite_scroll_perf.js.map