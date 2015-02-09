System.register("angular2/src/directives/foreach", ["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/interfaces", "angular2/src/core/compiler/viewport", "angular2/src/core/compiler/view", "angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/directives/foreach";
  var assert,
      Template,
      onChange,
      OnChange,
      ViewPort,
      View,
      isPresent,
      isBlank,
      ListWrapper,
      Foreach,
      RecordViewTuple;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Template = $__m.Template;
      onChange = $__m.onChange;
    }, function($__m) {
      OnChange = $__m.OnChange;
    }, function($__m) {
      ViewPort = $__m.ViewPort;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      Foreach = $__export("Foreach", (function($__super) {
        var Foreach = function Foreach(viewPort) {
          assert.argumentTypes(viewPort, ViewPort);
          $traceurRuntime.superConstructor(Foreach).call(this);
          this.viewPort = viewPort;
        };
        return ($traceurRuntime.createClass)(Foreach, {
          onChange: function(changes) {
            var iteratorChanges = changes['iterable'];
            if (isBlank(iteratorChanges) || isBlank(iteratorChanges.currentValue)) {
              this.viewPort.clear();
              return ;
            }
            var recordViewTuples = [];
            iteratorChanges.currentValue.forEachRemovedItem((function(removedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(removedRecord, null));
            }));
            iteratorChanges.currentValue.forEachMovedItem((function(movedRecord) {
              return ListWrapper.push(recordViewTuples, new RecordViewTuple(movedRecord, null));
            }));
            var insertTuples = Foreach.bulkRemove(recordViewTuples, this.viewPort);
            iteratorChanges.currentValue.forEachAddedItem((function(addedRecord) {
              return ListWrapper.push(insertTuples, new RecordViewTuple(addedRecord, null));
            }));
            Foreach.bulkInsert(insertTuples, this.viewPort);
            for (var i = 0; i < insertTuples.length; i++) {
              this.perViewChange(insertTuples[i].view, insertTuples[i].record);
            }
          },
          perViewChange: function(view, record) {
            view.setLocal('\$implicit', record.item);
            view.setLocal('index', record.currentIndex);
          }
        }, {
          bulkRemove: function(tuples, viewPort) {
            tuples.sort((function(a, b) {
              return a.record.previousIndex - b.record.previousIndex;
            }));
            var movedTuples = [];
            for (var i = tuples.length - 1; i >= 0; i--) {
              var tuple = tuples[i];
              if (isPresent(tuple.record.currentIndex)) {
                tuple.view = viewPort.detach(tuple.record.previousIndex);
                ListWrapper.push(movedTuples, tuple);
              } else {
                viewPort.remove(tuple.record.previousIndex);
              }
            }
            return movedTuples;
          },
          bulkInsert: function(tuples, viewPort) {
            tuples.sort((function(a, b) {
              return a.record.currentIndex - b.record.currentIndex;
            }));
            for (var i = 0; i < tuples.length; i++) {
              var tuple = tuples[i];
              if (isPresent(tuple.view)) {
                viewPort.insert(tuple.view, tuple.record.currentIndex);
              } else {
                tuple.view = viewPort.create(tuple.record.currentIndex);
              }
            }
            return tuples;
          }
        }, $__super);
      }(OnChange)));
      Object.defineProperty(Foreach, "annotations", {get: function() {
          return [new Template({
            selector: '[foreach][in]',
            lifecycle: [onChange],
            bind: {'in': 'iterable[]'}
          })];
        }});
      Object.defineProperty(Foreach, "parameters", {get: function() {
          return [[ViewPort]];
        }});
      RecordViewTuple = (function() {
        var RecordViewTuple = function RecordViewTuple(record, view) {
          this.record = record;
          this.view = view;
        };
        return ($traceurRuntime.createClass)(RecordViewTuple, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/directives/foreach.map

//# sourceMappingURL=./foreach.map