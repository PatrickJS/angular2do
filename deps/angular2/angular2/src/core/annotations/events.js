System.register("angular2/src/core/annotations/events", ["angular2/src/facade/lang", "angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/core/annotations/events";
  var CONST,
      DependencyAnnotation,
      EventEmitter;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }, function($__m) {
      DependencyAnnotation = $__m.DependencyAnnotation;
    }],
    execute: function() {
      EventEmitter = $__export("EventEmitter", (function($__super) {
        var EventEmitter = function EventEmitter(eventName) {
          $traceurRuntime.superConstructor(EventEmitter).call(this);
          this.eventName = eventName;
        };
        return ($traceurRuntime.createClass)(EventEmitter, {}, {}, $__super);
      }(DependencyAnnotation)));
      Object.defineProperty(EventEmitter, "annotations", {get: function() {
          return [new CONST()];
        }});
    }
  };
});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/core/annotations/events.map

//# sourceMappingURL=./events.map