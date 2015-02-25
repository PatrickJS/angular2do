var _global = typeof window === 'object' ? window : global;
var POSITION_NAME = ['', '1st', '2nd', '3rd'];
function argPositionName(i) {
  var position = (i / 2) + 1;
  return POSITION_NAME[position] || (position + 'th');
}
var primitives;
var genericType;
if (typeof $traceurRuntime === 'object') {
  primitives = $traceurRuntime.type;
  genericType = $traceurRuntime.genericType;
} else {
  primitives = {
    any: {name: 'any'},
    boolean: {name: 'boolean'},
    number: {name: 'number'},
    string: {name: 'string'},
    symbol: {name: 'symbol'},
    void: {name: 'void'}
  };
  genericType = function(type, args) {
    return {
      type: type,
      args: args
    };
  };
}
Object.keys(primitives).forEach(function(name) {
  primitives[name].__assertName = name;
});
export function proxy() {}
function assertArgumentTypes(...params) {
  var actual,
      type;
  var currentArgErrors;
  var errors = [];
  var msg;
  for (var i = 0,
      l = params.length; i < l; i = i + 2) {
    actual = params[i];
    type = params[i + 1];
    currentArgErrors = [];
    if (!isType(actual, type, currentArgErrors)) {
      errors.push(argPositionName(i) + ' argument has to be an instance of ' + prettyPrint(type) + ', got ' + prettyPrint(actual));
      if (currentArgErrors.length) {
        errors.push(currentArgErrors);
      }
    }
  }
  if (errors.length) {
    throw new Error('Invalid arguments given!\n' + formatErrors(errors));
  }
}
function prettyPrint(value, depth) {
  if (typeof(depth) === 'undefined') {
    depth = 0;
  }
  if (depth++ > 3) {
    return '[...]';
  }
  if (typeof value === 'undefined') {
    return 'undefined';
  }
  if (typeof value === 'string') {
    return '"' + value + '"';
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    if (value.__assertName) {
      return value.__assertName;
    }
    if (value.map && typeof value.map === 'function') {
      return '[' + value.map((v) => prettyPrint(v, depth)).join(', ') + ']';
    }
    var properties = Object.keys(value);
    var suffix = '}';
    if (properties.length > 20) {
      properties.length = 20;
      suffix = ', ... }';
    }
    return '{' + properties.map((p) => p + ': ' + prettyPrint(value[p], depth)).join(', ') + suffix;
  }
  return value.__assertName || value.name || value.toString();
}
function isType(value, T, errors) {
  if (T && T.type) {
    T = T.type;
  }
  if (T === primitives.void) {
    return typeof value === 'undefined';
  }
  if (_isProxy(value)) {
    return true;
  }
  if (T === primitives.any || value === null) {
    return true;
  }
  if (T === primitives.string) {
    return typeof value === 'string';
  }
  if (T === primitives.number) {
    return typeof value === 'number';
  }
  if (T === primitives.boolean) {
    return typeof value === 'boolean';
  }
  if (typeof T.assert === 'function') {
    var parentStack = currentStack;
    var isValid;
    currentStack = errors;
    try {
      isValid = T.assert(value);
    } catch (e) {
      fail(e.message);
      isValid = false;
    }
    currentStack = parentStack;
    if (typeof isValid === 'undefined') {
      isValid = errors.length === 0;
    }
    return isValid;
  }
  return value instanceof T;
}
function _isProxy(obj) {
  if (!obj || !obj.constructor || !obj.constructor.annotations)
    return false;
  return obj.constructor.annotations.filter((a) => a instanceof proxy).length > 0;
}
function formatErrors(errors, indent = '  ') {
  return errors.map((e) => {
    if (typeof e === 'string')
      return indent + '- ' + e;
    return formatErrors(e, indent + '  ');
  }).join('\n');
}
function type(actual, T) {
  var errors = [];
  if (!isType(actual, T, errors)) {
    var msg = 'Expected an instance of ' + prettyPrint(T) + ', got ' + prettyPrint(actual) + '!';
    if (errors.length) {
      msg += '\n' + formatErrors(errors);
    }
    throw new Error(msg);
  }
  return actual;
}
function returnType(actual, T) {
  var errors = [];
  if (!isType(actual, T, errors)) {
    var msg = 'Expected to return an instance of ' + prettyPrint(T) + ', got ' + prettyPrint(actual) + '!';
    if (errors.length) {
      msg += '\n' + formatErrors(errors);
    }
    throw new Error(msg);
  }
  return actual;
}
var string = type.string = define('string', function(value) {
  return typeof value === 'string';
});
var boolean = type.boolean = define('boolean', function(value) {
  return typeof value === 'boolean';
});
var number = type.number = define('number', function(value) {
  return typeof value === 'number';
});
function arrayOf(...types) {
  return assert.define('array of ' + types.map(prettyPrint).join('/'), function(value) {
    if (assert(value).is(Array)) {
      for (var item of value) {
        assert(item).is(...types);
      }
    }
  });
}
function structure(definition) {
  var properties = Object.keys(definition);
  return assert.define('object with properties ' + properties.join(', '), function(value) {
    if (assert(value).is(Object)) {
      for (var property of properties) {
        assert(value[property]).is(definition[property]);
      }
    }
  });
}
var currentStack = [];
function fail(message) {
  currentStack.push(message);
}
function define(classOrName, check) {
  var cls = classOrName;
  if (typeof classOrName === 'string') {
    cls = function() {};
    cls.__assertName = classOrName;
  }
  cls.assert = function(value) {
    return check(value);
  };
  return cls;
}
function assert(value) {
  return {is: function is(...types) {
      var allErrors = [];
      var errors;
      for (var type of types) {
        errors = [];
        if (isType(value, type, errors)) {
          return true;
        }
        allErrors.push(prettyPrint(value) + ' is not instance of ' + prettyPrint(type));
        if (errors.length) {
          allErrors.push(errors);
        }
      }
      currentStack.push(...allErrors);
      return false;
    }};
}
assert.type = type;
for (var prop in primitives) {
  assert.type[prop] = primitives[prop];
}
assert.genericType = genericType;
assert.argumentTypes = assertArgumentTypes;
assert.returnType = returnType;
assert.define = define;
assert.fail = fail;
assert.string = string;
assert.number = number;
assert.boolean = boolean;
assert.arrayOf = arrayOf;
assert.structure = structure;
export {assert};

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/rtts_assert/src/rtts_assert.map

//# sourceMappingURL=./rtts_assert.map