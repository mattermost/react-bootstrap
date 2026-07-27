(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrap"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrap"] = factory(root["React"], root["ReactDOM"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__5442__, __WEBPACK_EXTERNAL_MODULE__6003__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 64:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5768);

module.exports = __webpack_require__(9520).Object.assign;

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(9520);

var global = __webpack_require__(8248);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(1236) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

/***/ }),

/***/ 344:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
 // 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(5033);

var gOPS = __webpack_require__(5402);

var pIE = __webpack_require__(9871);

var toObject = __webpack_require__(5332);

var IObject = __webpack_require__(3443);

var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

module.exports = !$assign || __webpack_require__(2250)(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;

  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  }

  return T;
} : $assign;

/***/ }),

/***/ 371:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.15 ToLength
var toInteger = __webpack_require__(6997);

var min = Math.min;

module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 687:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(2125);

module.exports = __webpack_require__(9520).Array.isArray;

/***/ }),

/***/ 829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var LIBRARY = __webpack_require__(1236);

var $export = __webpack_require__(3445);

var redefine = __webpack_require__(957);

var hide = __webpack_require__(1795);

var Iterators = __webpack_require__(1428);

var $iterCreate = __webpack_require__(1510);

var setToStringTag = __webpack_require__(9874);

var getPrototypeOf = __webpack_require__(2289);

var ITERATOR = __webpack_require__(6932)('iterator');

var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);

  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];

    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };

      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }

    return function entries() {
      return new Constructor(this, kind);
    };
  };

  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype; // Fix native

  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;

    $default = function values() {
      return $native.call(this);
    };
  } // Define iterator


  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  } // Plug for library


  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;

  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }

  return methods;
};

/***/ }),

/***/ 957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1795);

/***/ }),

/***/ 1149:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 1222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(3543);

var TAG = __webpack_require__(6932)('toStringTag'); // ES3 wrong here


var ARG = cof(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) {
    /* empty */
  }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
  : ARG ? cof(O) // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),

/***/ 1236:
/***/ ((module) => {

module.exports = true;

/***/ }),

/***/ 1354:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8759);

var toLength = __webpack_require__(371);

var toAbsoluteIndex = __webpack_require__(5307);

module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1510:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var create = __webpack_require__(9345);

var descriptor = __webpack_require__(3650);

var setToStringTag = __webpack_require__(9874);

var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

__webpack_require__(1795)(IteratorPrototype, __webpack_require__(6932)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, {
    next: descriptor(1, next)
  });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ 1614:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(4725) && !__webpack_require__(2250)(function () {
  return Object.defineProperty(__webpack_require__(7788)('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 1649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = __webpack_require__(9050);

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ 1685:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = undefined;

var _end = __webpack_require__(4112);

var _end2 = _interopRequireDefault(_end);

var _properties = __webpack_require__(3152);

var _properties2 = _interopRequireDefault(_properties);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

__webpack_unused_export__ = _end2.default;
__webpack_unused_export__ = _properties2.default;
exports.Ay = {
  end: _end2.default,
  properties: _properties2.default
};

/***/ }),

/***/ 1700:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}

module.exports = exports["default"];

/***/ }),

/***/ 1795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(8449);

var createDesc = __webpack_require__(3650);

module.exports = __webpack_require__(4725) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 1897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(9520);

var $JSON = core.JSON || (core.JSON = {
  stringify: JSON.stringify
});

module.exports = function stringify(it) {
  // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),

/***/ 1933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (false) // removed by dead control flow
{ var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(1649)();
}

/***/ }),

/***/ 1953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(9253);

/***/ }),

/***/ 1999:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = ownerDocument;

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];

/***/ }),

/***/ 2069:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3445);

var core = __webpack_require__(9520);

var fails = __webpack_require__(2250);

module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ }),

/***/ 2103:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 2125:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(3445);

$export($export.S, 'Array', {
  isArray: __webpack_require__(8727)
});

/***/ }),

/***/ 2235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(8283);

var toIObject = __webpack_require__(8759);

var arrayIndexOf = __webpack_require__(1354)(false);

var IE_PROTO = __webpack_require__(6832)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }

  return result;
};

/***/ }),

/***/ 2250:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),

/***/ 2289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8283);

var toObject = __webpack_require__(5332);

var IE_PROTO = __webpack_require__(6832)('IE_PROTO');

var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(2713);

/***/ }),

/***/ 2384:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ 2426:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = (__webpack_require__(8248).document);

module.exports = document && document.documentElement;

/***/ }),

/***/ 2493:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.4.2
 * react-is.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


Object.defineProperty(exports, "__esModule", ({
  value: !0
}));
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.forward_ref") : 60112,
    n = b ? Symbol.for("react.timeout") : 60113;

function q(a) {
  if ("object" === typeof a && null !== a) {
    var p = a.$$typeof;

    switch (p) {
      case c:
        switch (a = a.type, a) {
          case l:
          case e:
          case g:
          case f:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case m:
              case h:
                return a;

              default:
                return p;
            }

        }

      case d:
        return p;
    }
  }
}

exports.typeOf = q;
exports.AsyncMode = l;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = m;
exports.Fragment = e;
exports.Profiler = g;
exports.Portal = d;
exports.StrictMode = f;

exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === l || a === g || a === f || a === n || "object" === typeof a && null !== a && (a.$$typeof === h || a.$$typeof === k || a.$$typeof === m);
};

exports.isAsyncMode = function (a) {
  return q(a) === l;
};

exports.isContextConsumer = function (a) {
  return q(a) === k;
};

exports.isContextProvider = function (a) {
  return q(a) === h;
};

exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

exports.isForwardRef = function (a) {
  return q(a) === m;
};

exports.isFragment = function (a) {
  return q(a) === e;
};

exports.isProfiler = function (a) {
  return q(a) === g;
};

exports.isPortal = function (a) {
  return q(a) === d;
};

exports.isStrictMode = function (a) {
  return q(a) === f;
};

/***/ }),

/***/ 2573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(3825);

/***/ }),

/***/ 2713:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(3537);

var $Object = (__webpack_require__(9520).Object);

module.exports = function create(P, D) {
  return $Object.create(P, D);
};

/***/ }),

/***/ 2948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = __webpack_require__(8643);

function emptyFunction() {}

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };
  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ 3044:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

var _on = __webpack_require__(8774);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(6170);

var _off2 = _interopRequireDefault(_off);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var listen = function listen() {};

if (_inDOM2.default) {
  listen = function listen(node, eventName, handler, capture) {
    (0, _on2.default)(node, eventName, handler, capture);
    return function () {
      (0, _off2.default)(node, eventName, handler, capture);
    };
  };
}

exports["default"] = listen;
module.exports = exports['default'];

/***/ }),

/***/ 3105:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _react = __webpack_require__(5442);

var _react2 = _interopRequireDefault(_react);

var _reactIs = __webpack_require__(5409);

var _createChainableTypeChecker = __webpack_require__(8663);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`,expected an element type (a string ') + ', component class, or function component).');
  }

  if (!(0, _reactIs.isValidElementType)(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + ', component class, or function component).');
  }

  return null;
}

exports["default"] = (0, _createChainableTypeChecker2.default)(elementType);
module.exports = exports['default'];

/***/ }),

/***/ 3152:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;
  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';
  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports["default"] = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};

function getTransitionProperties() {
  var style = document.createElement('div').style;
  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };
  var vendors = Object.keys(vendorMap);
  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';
  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';
  style = null;
  return {
    animationEnd: animationEnd,
    transitionEnd: transitionEnd,
    prefix: prefix
  };
}

/***/ }),

/***/ 3215:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = uncontrollable;

var _react = _interopRequireDefault(__webpack_require__(5442));

var _invariant = _interopRequireDefault(__webpack_require__(3737));

var Utils = _interopRequireWildcard(__webpack_require__(7770));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var isCompositeComponent = Utils.isReactComponent(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey);
  !(isCompositeComponent || !methods.length) ?  false ? 0 : invariant(false) : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(UncontrolledComponent, _React$Component);

    function UncontrolledComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];

        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;

            _this._notifying = true;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));

            _this._notifying = false;
          }

          _this._values[propName] = value;
          if (!_this.unmounted) _this.forceUpdate();
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (isCompositeComponent) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let the forceUpdate trigger the update
      return !this._notifying;
    };

    _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
      var _this2 = this;

      var props = this.props;
      this._values = Object.create(null);
      controlledProps.forEach(function (key) {
        _this2._values[key] = props[Utils.defaultKey(key)];
      });
    };

    _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var props = this.props;
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        if (!Utils.isProp(nextProps, key) && Utils.isProp(props, key)) {
          _this3._values[key] = nextProps[Utils.defaultKey(key)];
        }
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.getControlledInstance = function getControlledInstance() {
      return this.inner;
    };

    _proto.render = function render() {
      var _this4 = this;

      var props = _extends({}, this.props);

      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this4.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this4._values[propName];
      });
      return _react.default.createElement(Component, _extends({}, props, newProps, this.handlers, {
        ref: this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(_react.default.Component);

  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = Utils.uncontrolledPropTypes(controlledValues, displayName);
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _inner;

      return (_inner = this.inner)[method].apply(_inner, arguments);
    };
  });
  UncontrolledComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  UncontrolledComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
  };

  return UncontrolledComponent;
}

module.exports = exports["default"];

/***/ }),

/***/ 3443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(3543); // eslint-disable-next-line no-prototype-builtins


module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 3445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(8248);

var core = __webpack_require__(9520);

var ctx = __webpack_require__(5154);

var hide = __webpack_require__(1795);

var has = __webpack_require__(8283);

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;

  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue; // export native or passed

    out = own ? target[key] : source[key]; // prevent global pollution for namespaces

    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0:
              return new C();

            case 1:
              return new C(a);

            case 2:
              return new C(a, b);
          }

          return new C(a, b, c);
        }

        return C.apply(this, arguments);
      };

      F[PROTOTYPE] = C[PROTOTYPE];
      return F; // make static versions for prototype methods
    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%

    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%

      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
}; // type bitmap


$export.F = 1; // forced

$export.G = 2; // global

$export.S = 4; // static

$export.P = 8; // proto

$export.B = 16; // bind

$export.W = 32; // wrap

$export.U = 64; // safe

$export.R = 128; // real proto method for `library`

module.exports = $export;

/***/ }),

/***/ 3481:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(8449);

var createDesc = __webpack_require__(3650);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ }),

/***/ 3537:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(3445); // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


$export($export.S, 'Object', {
  create: __webpack_require__(9345)
});

/***/ }),

/***/ 3543:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 3650:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 3655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9532);

module.exports = __webpack_require__(9520).Object.values;

/***/ }),

/***/ 3737:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (false) // removed by dead control flow
{}

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ 3796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(8449);

var anObject = __webpack_require__(4610);

var getKeys = __webpack_require__(5033);

module.exports = __webpack_require__(4725) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;

  while (length > i) dP.f(O, P = keys[i++], Properties[P]);

  return O;
};

/***/ }),

/***/ 3825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(3993);

module.exports = __webpack_require__(9520).Object.keys;

/***/ }),

/***/ 3837:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* unused reexport */ __webpack_require__(1897);

/***/ }),

/***/ 3841:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ctx = __webpack_require__(5154);

var $export = __webpack_require__(3445);

var toObject = __webpack_require__(5332);

var call = __webpack_require__(6562);

var isArrayIter = __webpack_require__(7350);

var toLength = __webpack_require__(371);

var createProperty = __webpack_require__(3481);

var getIterFn = __webpack_require__(6948);

$export($export.S + $export.F * !__webpack_require__(6509)(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike
  /* , mapfn = undefined, thisArg = undefined */
  ) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);

      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }

    result.length = index;
    return result;
  }
});

/***/ }),

/***/ 3993:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(5332);

var $keys = __webpack_require__(5033);

__webpack_require__(2069)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ }),

/***/ 4065:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = hyphenateStyleName;

var _hyphenate = __webpack_require__(6534);

var _hyphenate2 = _interopRequireDefault(_hyphenate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var msPattern = /^ms-/;
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

function hyphenateStyleName(string) {
  return (0, _hyphenate2.default)(string).replace(msPattern, '-ms-');
}

module.exports = exports['default'];

/***/ }),

/***/ 4070:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(6997);

var defined = __webpack_require__(9314); // true  -> String#at
// false -> String#codePointAt


module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ 4112:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _properties = __webpack_require__(3152);

var _properties2 = _interopRequireDefault(_properties);

var _style = __webpack_require__(7735);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function onEnd(node, handler, duration) {
  var fakeEvent = {
    target: node,
    currentTarget: node
  },
      backup;
  if (!_properties2.default.end) duration = 0;else if (duration == null) duration = parseDuration(node) || 0;

  if (_properties2.default.end) {
    node.addEventListener(_properties2.default.end, done, false);
    backup = setTimeout(function () {
      return done(fakeEvent);
    }, (duration || 100) * 1.5);
  } else setTimeout(done.bind(null, fakeEvent), 0);

  function done(event) {
    if (event.target !== event.currentTarget) return;
    clearTimeout(backup);
    event.target.removeEventListener(_properties2.default.end, done);
    handler.call(this);
  }
}

onEnd._parseDuration = parseDuration;
exports["default"] = onEnd;

function parseDuration(node) {
  var str = (0, _style2.default)(node, _properties2.default.duration),
      mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

module.exports = exports['default'];

/***/ }),

/***/ 4152:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

/***/ }),

/***/ 4610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2103);

module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 4683:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(687);

/***/ }),

/***/ 4701:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $at = __webpack_require__(4070)(true); // 21.1.3.27 String.prototype[@@iterator]()


__webpack_require__(829)(String, 'String', function (iterated) {
  this._t = String(iterated); // target

  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return {
    value: undefined,
    done: true
  };
  point = $at(O, index);
  this._i += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),

/***/ 4725:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2250)(function () {
  return Object.defineProperty({}, 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 4976:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

var _react = __webpack_require__(5442);

var _react2 = _interopRequireDefault(_react);

var _createChainableTypeChecker = __webpack_require__(4152);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function elementType(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);

  if (_react2.default.isValidElement(propValue)) {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  if (propType !== 'function' && propType !== 'string') {
    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
  }

  return null;
}

exports.A = (0, _createChainableTypeChecker2.default)(elementType);

/***/ }),

/***/ 5012:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getKeys = __webpack_require__(5033);

var toIObject = __webpack_require__(8759);

var isEnum = (__webpack_require__(9871).f);

module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    }

    return result;
  };
};

/***/ }),

/***/ 5033:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(2235);

var enumBugKeys = __webpack_require__(8338);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 5115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(3655);

/***/ }),

/***/ 5154:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// optional / simple context binding
var aFunction = __webpack_require__(1149);

module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 5229:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(property) {
  return !!(property && supportedTransforms.test(property));
}

module.exports = exports["default"];

/***/ }),

/***/ 5307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(6997);

var max = Math.max;
var min = Math.min;

module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),

/***/ 5332:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9314);

module.exports = function (it) {
  return Object(defined(it));
};

/***/ }),

/***/ 5402:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 5409:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(2493);
} else // removed by dead control flow
{}

/***/ }),

/***/ 5442:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__5442__;

/***/ }),

/***/ 5525:
/***/ ((module) => {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),

/***/ 5647:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _getComputedStyle;

var _camelizeStyle = __webpack_require__(8039);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;
  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
    //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;
      prop = (0, _camelizeStyle2.default)(prop);
      if (prop == 'float') prop = 'styleFloat';
      var current = node.currentStyle[prop] || null;
      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left; // Put in the new values to get a computed value out

        if (rsLeft) runStyle.left = node.currentStyle.left;
        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px'; // Revert the changed values

        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
}

module.exports = exports['default'];

/***/ }),

/***/ 5762:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (false) // removed by dead control flow
{ var throwOnDirectAccess, isValidElement, REACT_ELEMENT_TYPE; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2948)();
}

/***/ }),

/***/ 5768:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3445);

$export($export.S + $export.F, 'Object', {
  assign: __webpack_require__(344)
});

/***/ }),

/***/ 6003:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__6003__;

/***/ }),

/***/ 6065:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

exports["default"] = function (recalc) {
  if (!size && size !== 0 || recalc) {
    if (_inDOM2.default) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var size = void 0;
module.exports = exports['default'];

/***/ }),

/***/ 6170:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var off = function off() {};

if (_inDOM2.default) {
  off = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  }();
}

exports["default"] = off;
module.exports = exports['default'];

/***/ }),

/***/ 6233:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = filterEvents;

var _contains = __webpack_require__(6489);

var _contains2 = _interopRequireDefault(_contains);

var _querySelectorAll = __webpack_require__(8404);

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function filterEvents(selector, handler) {
  return function filterHandler(e) {
    var top = e.currentTarget,
        target = e.target,
        matches = (0, _querySelectorAll2.default)(top, selector);
    if (matches.some(function (match) {
      return (0, _contains2.default)(match, target);
    })) handler.call(this, e);
  };
}

module.exports = exports['default'];

/***/ }),

/***/ 6335:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = activeElement;

var _ownerDocument = __webpack_require__(1999);

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function activeElement() {
  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _ownerDocument2.default)();

  try {
    return doc.activeElement;
  } catch (e) {
    /* ie throws if no active element */
  }
}

module.exports = exports['default'];

/***/ }),

/***/ 6489:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports["default"] = function () {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  return _inDOM2.default ? function (context, node) {
    if (context.contains) {
      return context.contains(node);
    } else if (context.compareDocumentPosition) {
      return context === node || !!(context.compareDocumentPosition(node) & 16);
    } else {
      return fallback(context, node);
    }
  } : fallback;
}();

function fallback(context, node) {
  if (node) do {
    if (node === context) return true;
  } while (node = node.parentNode);
  return false;
}

module.exports = exports['default'];

/***/ }),

/***/ 6509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(6932)('iterator');

var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();

  riter['return'] = function () {
    SAFE_CLOSING = true;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {
  /* empty */
}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;

  try {
    var arr = [7];
    var iter = arr[ITERATOR]();

    iter.next = function () {
      return {
        done: safe = true
      };
    };

    arr[ITERATOR] = function () {
      return iter;
    };

    exec(arr);
  } catch (e) {
    /* empty */
  }

  return safe;
};

/***/ }),

/***/ 6534:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = hyphenate;
var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}

module.exports = exports['default'];

/***/ }),

/***/ 6546:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6861);

module.exports = __webpack_require__(9520).parseInt;

/***/ }),

/***/ 6562:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4610);

module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),

/***/ 6807:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(8475);

/***/ }),

/***/ 6832:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(114)('keys');

var uid = __webpack_require__(7209);

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 6861:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(3445);

var $parseInt = __webpack_require__(7416); // 18.2.5 parseInt(string, radix)


$export($export.G + $export.F * (parseInt != $parseInt), {
  parseInt: $parseInt
});

/***/ }),

/***/ 6932:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(114)('wks');

var uid = __webpack_require__(7209);

var Symbol = (__webpack_require__(8248).Symbol);

var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ 6948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(1222);

var ITERATOR = __webpack_require__(6932)('iterator');

var Iterators = __webpack_require__(1428);

module.exports = (__webpack_require__(9520).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),

/***/ 6997:
/***/ ((module) => {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;

module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 7209:
/***/ ((module) => {

var id = 0;
var px = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 7222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(6546);

/***/ }),

/***/ 7350:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(1428);

var ITERATOR = __webpack_require__(6932)('iterator');

var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),

/***/ 7416:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $parseInt = (__webpack_require__(8248).parseInt);

var $trim = (__webpack_require__(7659).trim);

var ws = __webpack_require__(5525);

var hex = /^[-+]?0[xX]/;
module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),

/***/ 7659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(3445);

var defined = __webpack_require__(9314);

var fails = __webpack_require__(2250);

var spaces = __webpack_require__(5525);

var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
}; // 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim


var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),

/***/ 7735:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = style;

var _camelizeStyle = __webpack_require__(8039);

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _hyphenateStyle = __webpack_require__(4065);

var _hyphenateStyle2 = _interopRequireDefault(_hyphenateStyle);

var _getComputedStyle2 = __webpack_require__(5647);

var _getComputedStyle3 = _interopRequireDefault(_getComputedStyle2);

var _removeStyle = __webpack_require__(8290);

var _removeStyle2 = _interopRequireDefault(_removeStyle);

var _properties = __webpack_require__(3152);

var _isTransform = __webpack_require__(5229);

var _isTransform2 = _interopRequireDefault(_isTransform);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function style(node, property, value) {
  var css = '';
  var transforms = '';
  var props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[(0, _camelizeStyle2.default)(property)] || (0, _getComputedStyle3.default)(node).getPropertyValue((0, _hyphenateStyle2.default)(property));
    } else {
      (props = {})[property] = value;
    }
  }

  Object.keys(props).forEach(function (key) {
    var value = props[key];

    if (!value && value !== 0) {
      (0, _removeStyle2.default)(node, (0, _hyphenateStyle2.default)(key));
    } else if ((0, _isTransform2.default)(key)) {
      transforms += key + '(' + value + ') ';
    } else {
      css += (0, _hyphenateStyle2.default)(key) + ': ' + value + ';';
    }
  });

  if (transforms) {
    css += _properties.transform + ': ' + transforms + ';';
  }

  node.style.cssText += ';' + css;
}

module.exports = exports['default'];

/***/ }),

/***/ 7755:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);

        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else // removed by dead control flow
{}
})();

/***/ }),

/***/ 7770:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.isProp = isProp;
exports.defaultKey = defaultKey;
exports.isReactComponent = isReactComponent;

var _invariant = _interopRequireDefault(__webpack_require__(3737));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (false) // removed by dead control flow
{ var handler; }
  });
  return propTypes;
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}

/***/ }),

/***/ 7788:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(2103);

var document = (__webpack_require__(8248).document); // typeof document.createElement is 'object' in old IE


var is = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 7909:
/***/ ((module) => {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function () {};

if (false) // removed by dead control flow
{}

module.exports = warning;

/***/ }),

/***/ 8039:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = camelizeStyleName;

var _camelize = __webpack_require__(1700);

var _camelize2 = _interopRequireDefault(_camelize);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var msPattern = /^-ms-/;
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */

function camelizeStyleName(string) {
  return (0, _camelize2.default)(string.replace(msPattern, 'ms-'));
}

module.exports = exports['default'];

/***/ }),

/***/ 8248:
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 8283:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 8290:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = removeStyle;

function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
}

module.exports = exports['default'];

/***/ }),

/***/ 8338:
/***/ ((module) => {

// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),

/***/ 8404:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = qsa; // Zepto.js
// (c) 2010-2015 Thomas Fuchs
// Zepto.js may be freely distributed under the MIT license.

var simpleSelectorRE = /^[\w-]*$/;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

function qsa(element, selector) {
  var maybeID = selector[0] === '#',
      maybeClass = selector[0] === '.',
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly),
      found;

  if (isSimple) {
    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : [];
    }

    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));
    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
}

module.exports = exports['default'];

/***/ }),

/***/ 8449:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var anObject = __webpack_require__(4610);

var IE8_DOM_DEFINE = __webpack_require__(1614);

var toPrimitive = __webpack_require__(9194);

var dP = Object.defineProperty;
exports.f = __webpack_require__(4725) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 8475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(4701);

__webpack_require__(3841);

module.exports = __webpack_require__(9520).Array.from;

/***/ }),

/***/ 8643:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ 8644:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3445);

var $entries = __webpack_require__(5012)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),

/***/ 8647:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),

/***/ 8663:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

module.exports = exports['default'];

/***/ }),

/***/ 8727:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(3543);

module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ }),

/***/ 8759:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(3443);

var defined = __webpack_require__(9314);

module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),

/***/ 8774:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _inDOM = __webpack_require__(8647);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var on = function on() {};

if (_inDOM2.default) {
  on = function () {
    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        e.currentTarget = node;
        handler.call(node, e);
      });
    };
  }();
}

exports["default"] = on;
module.exports = exports['default'];

/***/ }),

/***/ 8861:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isRequiredForA11y;

function isRequiredForA11y(validator) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}

module.exports = exports['default'];

/***/ }),

/***/ 9050:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ 9194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2103); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 9253:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(8644);

module.exports = __webpack_require__(9520).Object.entries;

/***/ }),

/***/ 9287:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = undefined;

var _on = __webpack_require__(8774);

var _on2 = _interopRequireDefault(_on);

var _off = __webpack_require__(6170);

var _off2 = _interopRequireDefault(_off);

var _filter = __webpack_require__(6233);

var _filter2 = _interopRequireDefault(_filter);

var _listen = __webpack_require__(3044);

var _listen2 = _interopRequireDefault(_listen);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

__webpack_unused_export__ = _on2.default;
__webpack_unused_export__ = _off2.default;
__webpack_unused_export__ = _filter2.default;
__webpack_unused_export__ = _listen2.default;
exports.Ay = {
  on: _on2.default,
  off: _off2.default,
  filter: _filter2.default,
  listen: _listen2.default
};

/***/ }),

/***/ 9314:
/***/ ((module) => {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 9345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4610);

var dPs = __webpack_require__(3796);

var enumBugKeys = __webpack_require__(8338);

var IE_PROTO = __webpack_require__(6832)('IE_PROTO');

var Empty = function () {
  /* empty */
};

var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(7788)('iframe');

  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';

  (__webpack_require__(2426).appendChild)(iframe);

  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);

  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;

  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];

  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = createDict();

  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ }),

/***/ 9508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(64);

/***/ }),

/***/ 9520:
/***/ ((module) => {

var core = module.exports = {
  version: '2.5.7'
};
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 9532:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(3445);

var $values = __webpack_require__(5012)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ }),

/***/ 9871:
/***/ ((__unused_webpack_module, exports) => {

exports.f = {}.propertyIsEnumerable;

/***/ }),

/***/ 9874:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var def = (__webpack_require__(8449).f);

var has = __webpack_require__(8283);

var TAG = __webpack_require__(6932)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
    configurable: true,
    value: tag
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Accordion: () => (/* reexport */ src_Accordion),
  Alert: () => (/* reexport */ src_Alert),
  Badge: () => (/* reexport */ src_Badge),
  Breadcrumb: () => (/* reexport */ src_Breadcrumb),
  BreadcrumbItem: () => (/* reexport */ src_BreadcrumbItem),
  Button: () => (/* reexport */ src_Button),
  ButtonGroup: () => (/* reexport */ src_ButtonGroup),
  ButtonToolbar: () => (/* reexport */ src_ButtonToolbar),
  Carousel: () => (/* reexport */ src_Carousel),
  CarouselItem: () => (/* reexport */ src_CarouselItem),
  Checkbox: () => (/* reexport */ src_Checkbox),
  Clearfix: () => (/* reexport */ src_Clearfix),
  CloseButton: () => (/* reexport */ src_CloseButton),
  Col: () => (/* reexport */ src_Col),
  Collapse: () => (/* reexport */ src_Collapse),
  ControlLabel: () => (/* reexport */ src_ControlLabel),
  Dropdown: () => (/* reexport */ src_Dropdown),
  DropdownButton: () => (/* reexport */ src_DropdownButton),
  Fade: () => (/* reexport */ src_Fade),
  Form: () => (/* reexport */ src_Form),
  FormControl: () => (/* reexport */ src_FormControl),
  FormGroup: () => (/* reexport */ src_FormGroup),
  Glyphicon: () => (/* reexport */ src_Glyphicon),
  Grid: () => (/* reexport */ src_Grid),
  HelpBlock: () => (/* reexport */ src_HelpBlock),
  Image: () => (/* reexport */ src_Image),
  InputGroup: () => (/* reexport */ src_InputGroup),
  Jumbotron: () => (/* reexport */ src_Jumbotron),
  Label: () => (/* reexport */ src_Label),
  ListGroup: () => (/* reexport */ src_ListGroup),
  ListGroupItem: () => (/* reexport */ src_ListGroupItem),
  Media: () => (/* reexport */ src_Media),
  MenuItem: () => (/* reexport */ src_MenuItem),
  Modal: () => (/* reexport */ src_Modal),
  ModalBody: () => (/* reexport */ src_ModalBody),
  ModalDialog: () => (/* reexport */ src_ModalDialog),
  ModalFooter: () => (/* reexport */ src_ModalFooter),
  ModalHeader: () => (/* reexport */ src_ModalHeader),
  ModalTitle: () => (/* reexport */ src_ModalTitle),
  Nav: () => (/* reexport */ src_Nav),
  NavDropdown: () => (/* reexport */ src_NavDropdown),
  NavItem: () => (/* reexport */ src_NavItem),
  Navbar: () => (/* reexport */ src_Navbar),
  NavbarBrand: () => (/* reexport */ src_NavbarBrand),
  Overlay: () => (/* reexport */ src_Overlay),
  OverlayTrigger: () => (/* reexport */ src_OverlayTrigger),
  PageHeader: () => (/* reexport */ src_PageHeader),
  PageItem: () => (/* reexport */ PageItem),
  Pager: () => (/* reexport */ src_Pager),
  Pagination: () => (/* reexport */ src_Pagination),
  Panel: () => (/* reexport */ src_Panel),
  PanelGroup: () => (/* reexport */ src_PanelGroup),
  Popover: () => (/* reexport */ src_Popover),
  ProgressBar: () => (/* reexport */ src_ProgressBar),
  Radio: () => (/* reexport */ src_Radio),
  ResponsiveEmbed: () => (/* reexport */ src_ResponsiveEmbed),
  Row: () => (/* reexport */ src_Row),
  SafeAnchor: () => (/* reexport */ src_SafeAnchor),
  SplitButton: () => (/* reexport */ src_SplitButton),
  Tab: () => (/* reexport */ src_Tab),
  TabContainer: () => (/* reexport */ src_TabContainer),
  TabContent: () => (/* reexport */ src_TabContent),
  TabPane: () => (/* reexport */ src_TabPane),
  Table: () => (/* reexport */ src_Table),
  Tabs: () => (/* reexport */ src_Tabs),
  Thumbnail: () => (/* reexport */ src_Thumbnail),
  ToggleButton: () => (/* reexport */ src_ToggleButton),
  ToggleButtonGroup: () => (/* reexport */ src_ToggleButtonGroup),
  Tooltip: () => (/* reexport */ src_Tooltip),
  Well: () => (/* reexport */ src_Well),
  utils: () => (/* reexport */ utils_namespaceObject)
});

// NAMESPACE OBJECT: ./src/utils/bootstrapUtils.js
var bootstrapUtils_namespaceObject = {};
__webpack_require__.r(bootstrapUtils_namespaceObject);
__webpack_require__.d(bootstrapUtils_namespaceObject, {
  _curry: () => (_curry),
  addStyle: () => (addStyle),
  bsClass: () => (bsClass),
  bsSizes: () => (bsSizes),
  bsStyles: () => (bsStyles),
  getClassSet: () => (getClassSet),
  prefix: () => (prefix),
  splitBsProps: () => (splitBsProps),
  splitBsPropsAndOmit: () => (splitBsPropsAndOmit)
});

// NAMESPACE OBJECT: ./src/utils/index.js
var utils_namespaceObject = {};
__webpack_require__.r(utils_namespaceObject);
__webpack_require__.d(utils_namespaceObject, {
  ValidComponentChildren: () => (ValidComponentChildren),
  bootstrapUtils: () => (bootstrapUtils_namespaceObject),
  createChainedFunction: () => (utils_createChainedFunction)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__(9508);
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);
;// ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js

function _extends() {
  _extends = (assign_default()) || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/create.js
var create = __webpack_require__(2309);
var create_default = /*#__PURE__*/__webpack_require__.n(create);
;// ./node_modules/@babel/runtime-corejs2/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = create_default()(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(5442);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js
var keys = __webpack_require__(2573);
var keys_default = /*#__PURE__*/__webpack_require__.n(keys);
;// ./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutPropertiesLoose.js

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};

  var sourceKeys = keys_default()(source);

  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(7755);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5762);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/uncontrollable/index.js
var uncontrollable = __webpack_require__(3215);
var uncontrollable_default = /*#__PURE__*/__webpack_require__.n(uncontrollable);
;// ./src/PanelGroupContext.js

var PanelGroupContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
PanelGroupContext.displayName = 'PanelGroupContext';
/* harmony default export */ const src_PanelGroupContext = (PanelGroupContext);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js
var entries = __webpack_require__(1953);
var entries_default = /*#__PURE__*/__webpack_require__.n(entries);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js
var stringify = __webpack_require__(3837);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(3737);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
// EXTERNAL MODULE: ./node_modules/warning/browser.js
var warning_browser = __webpack_require__(7909);
;// ./src/utils/StyleConfig.js
var Size = {
  LARGE: 'large',
  SMALL: 'small',
  XSMALL: 'xsmall'
};
var SIZE_MAP = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
};
var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];
var State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
};
var Style = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse'
};
;// ./src/utils/bootstrapUtils.js



// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.






function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];

    if (typeof last === 'function') {
      return fn.apply(void 0, args);
    }

    return function (Component) {
      return fn.apply(void 0, args.concat([Component]));
    };
  };
}

function componentName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function isReactClass(Component) {
  return Boolean(Component && Component.prototype && typeof Component.prototype.render === 'function');
}

function warnOutOfRange(name, propName, value, allowed) {
  if (value != null && allowed.indexOf(value) === -1) {
     false ? 0 : void 0;
  }
} // Patch a class component's `render` so `propName` is validated on every
// render, without wrapping the component (which would break ref forwarding,
// static reads, and — for e.g. `bsRole` — class `defaultProps` merging).


function patchRenderValidation(Component, propName, allowed) {
  var flag = "__bsValidated_" + propName;
  var proto = Component.prototype;

  if (Object.prototype.hasOwnProperty.call(proto, flag)) {
    return;
  }

  var name = componentName(Component);
  var innerRender = proto.render;

  proto.render = function validatedRender() {
    warnOutOfRange(name, propName, this.props[propName], allowed);

    for (var _len2 = arguments.length, renderArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      renderArgs[_key2] = arguments[_key2];
    }

    return innerRender.apply(this, renderArgs);
  };

  proto[flag] = true;
} // Wrap a function component so the default is applied and the value validated
// at render.


function wrapFunctionComponent(Inner, _ref) {
  var propName = _ref.propName,
      defaultValue = _ref.defaultValue,
      allowed = _ref.allowed;
  var name = componentName(Inner);

  function BootstrapComponent(props) {
    var _extends2;

    var resolved = defaultValue !== undefined && props[propName] === undefined ? _extends({}, props, (_extends2 = {}, _extends2[propName] = defaultValue, _extends2)) : props;

    if (allowed) {
      warnOutOfRange(name, propName, resolved[propName], allowed);
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Inner, resolved);
  }

  BootstrapComponent.displayName = name; // Carry over metadata read elsewhere: `propTypes`/`_values` for docs and
  // `STYLES`/`SIZES` for decorator chaining.

  if (Inner.propTypes) BootstrapComponent.propTypes = Inner.propTypes;
  if (Inner.STYLES) BootstrapComponent.STYLES = Inner.STYLES;
  if (Inner.SIZES) BootstrapComponent.SIZES = Inner.SIZES;
  return BootstrapComponent;
} // Apply a `bs*` default and (optionally) enum validation to a component,
// dispatching on what kind of thing it is. Class components keep working
// `defaultProps`; function components get a validating wrapper; anything else
// (e.g. a plain object in tests) just records the default.


function applyBsProp(Component, _ref2) {
  var propName = _ref2.propName,
      defaultValue = _ref2.defaultValue,
      allowed = _ref2.allowed;
  var isClassComponent = isReactClass(Component);

  if (typeof Component === 'function' && !isClassComponent) {
    return wrapFunctionComponent(Component, {
      propName: propName,
      defaultValue: defaultValue,
      allowed: allowed
    });
  }

  if (defaultValue !== undefined) {
    var _extends3;

    Component.defaultProps = _extends({}, Component.defaultProps, (_extends3 = {}, _extends3[propName] = defaultValue, _extends3));
  }

  if (allowed && isClassComponent) {
    patchRenderValidation(Component, propName, allowed);
  }

  return Component;
}

function prefix(props, variant) {
  var bsClass = (props.bsClass || '').trim();
  !(bsClass != null) ?  false ? 0 : browser_default()(false) : void 0;
  return bsClass + (variant ? "-" + variant : '');
}
var bsClass = curry(function (defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  propTypes.bsClass = (prop_types_default()).string;
  return applyBsProp(Component, {
    propName: 'bsClass',
    defaultValue: defaultClass
  });
});
var bsStyles = curry(function (styles, defaultStyle, Component) {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};
  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });
  var propType = prop_types_default().oneOf(existing); // expose the values on the propType function for documentation

  Component.STYLES = existing;
  propType._values = existing;
  Component.propTypes = _extends({}, propTypes, {
    bsStyle: propType
  });
  return applyBsProp(Component, {
    propName: 'bsStyle',
    defaultValue: defaultStyle,
    allowed: existing
  });
});
var bsSizes = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};
  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });
  var values = [];
  existing.forEach(function (size) {
    var mappedSize = SIZE_MAP[size];

    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });
  var propType = prop_types_default().oneOf(values);
  propType._values = values; // expose the values on the propType function for documentation

  Component.SIZES = existing;
  Component.propTypes = _extends({}, propTypes, {
    bsSize: propType
  });
  return applyBsProp(Component, {
    propName: 'bsSize',
    defaultValue: defaultSize,
    allowed: values
  });
});
function getClassSet(props) {
  var _classes;

  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);

  if (props.bsSize) {
    var bsSize = SIZE_MAP[props.bsSize] || props.bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}

function getBsProps(props) {
  return {
    bsClass: props.bsClass,
    bsSize: props.bsSize,
    bsStyle: props.bsStyle,
    bsRole: props.bsRole
  };
}

function isBsProp(propName) {
  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
}

function splitBsProps(props) {
  var elementProps = {};

  entries_default()(props).forEach(function (_ref3) {
    var propName = _ref3[0],
        propValue = _ref3[1];

    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}
function splitBsPropsAndOmit(props, omittedPropNames) {
  var isOmittedProp = {};
  omittedPropNames.forEach(function (propName) {
    isOmittedProp[propName] = true;
  });
  var elementProps = {};

  entries_default()(props).forEach(function (_ref4) {
    var propName = _ref4[0],
        propValue = _ref4[1];

    if (!isBsProp(propName) && !isOmittedProp[propName]) {
      elementProps[propName] = propValue;
    }
  });

  return [getBsProps(props), elementProps];
}
/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 */

function addStyle(Component) {
  for (var _len3 = arguments.length, styleVariant = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    styleVariant[_key3 - 1] = arguments[_key3];
  }

  bsStyles(styleVariant, Component);
}
var _curry = curry;
;// ./src/utils/ValidComponentChildren.js
// TODO: This module should be ElementChildren, and should use named exports.

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @return {object} Object containing the ordered map of results.
 */

function map(children, func, context) {
  var index = 0;
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.map(children, function (child) {
    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return child;
    }

    return func.call(context, child, index++);
  });
}
/**
 * Iterates through children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for context.
 */


function forEach(children, func, context) {
  var index = 0;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    func.call(context, child, index++);
  });
}
/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */


function count(children) {
  var result = 0;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    ++result;
  });
  return result;
}
/**
 * Finds children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @returns {array} of children that meet the func return statement
 */


function filter(children, func, context) {
  var index = 0;
  var result = [];
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result.push(child);
    }
  });
  return result;
}

function find(children, func, context) {
  var index = 0;
  var result;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (result) {
      return;
    }

    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = child;
    }
  });
  return result;
}

function every(children, func, context) {
  var index = 0;
  var result = true;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (!result) {
      return;
    }

    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    if (!func.call(context, child, index++)) {
      result = false;
    }
  });
  return result;
}

function some(children, func, context) {
  var index = 0;
  var result = false;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (result) {
      return;
    }

    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = true;
    }
  });
  return result;
}

function toArray(children) {
  var result = [];
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (!external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child)) {
      return;
    }

    result.push(child);
  });
  return result;
}

/* harmony default export */ const ValidComponentChildren = ({
  map: map,
  forEach: forEach,
  count: count,
  find: find,
  filter: filter,
  every: every,
  some: some,
  toArray: toArray
});
;// ./src/utils/PropTypes.js


var idPropType = prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]);
function generatedId(name) {
  return function (props) {
    var error = null;

    if (!props.generateChildId) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      error = idPropType.apply(void 0, [props].concat(args));

      if (!error && !props.id) {
        error = new Error("In order to properly initialize the " + name + " in a way that is accessible to assistive technologies " + ("(such as screen readers) an `id` or a `generateChildId` prop to " + name + " is required"));
      }
    }

    return error;
  };
}
/**
 * Return a warning message if `children` is missing a child for any of the
 * required `roles`, otherwise `null`. `bsRole` is matched against each child's
 * `bsRole` prop.
 */

function getMissingRoleError(component, children) {
  var missing;

  for (var _len2 = arguments.length, roles = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    roles[_key2 - 2] = arguments[_key2];
  }

  roles.every(function (role) {
    if (!ValidComponentChildren.some(children, function (child) {
      return child.props.bsRole === role;
    })) {
      missing = role;
      return false;
    }

    return true;
  });

  if (missing) {
    return "(children) " + component + " - Missing a required child with bsRole: " + (missing + ". " + component + " must have at least one child of each of ") + ("the following bsRoles: " + roles.join(', '));
  }

  return null;
}
/**
 * Return a warning message if `children` contains more than one child for any
 * of the exclusive `roles`, otherwise `null`.
 */

function getDuplicateRoleError(component, children) {
  var duplicate;

  for (var _len3 = arguments.length, roles = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    roles[_key3 - 2] = arguments[_key3];
  }

  roles.every(function (role) {
    var childrenWithRole = ValidComponentChildren.filter(children, function (child) {
      return child.props.bsRole === role;
    });

    if (childrenWithRole.length > 1) {
      duplicate = role;
      return false;
    }

    return true;
  });

  if (duplicate) {
    return "(children) " + component + " - Duplicate children detected of bsRole: " + (duplicate + ". Only one child each allowed with the following ") + ("bsRoles: " + roles.join(', '));
  }

  return null;
}
;// ./src/PanelGroup.js



var _jsxFileName = "/Users/harrison/react-bootstrap/src/PanelGroup.js";








var propTypes = {
  accordion: (prop_types_default()).bool,

  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: (prop_types_default()).any,

  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: (prop_types_default()).func,

  /**
   * An HTML role attribute
   */
  role: (prop_types_default()).string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"body"` or `"heading"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: (prop_types_default()).func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: generatedId('PanelGroup')
};
var defaultProps = {
  accordion: false
};

var PanelGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelGroup, _React$Component);

  function PanelGroup() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleSelect = function (key, expanded, e) {
      if (expanded) {
        _this.props.onSelect(key, e);
      } else if (_this.props.activeKey === key) {
        _this.props.onSelect(null, e);
      }
    };

    return _this;
  }

  var _proto = PanelGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        accordion = _this$props.accordion,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["accordion", "className", "children"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['onSelect', 'activeKey']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }

    var classes = getClassSet(bsProps);
    var _this$props2 = this.props,
        activeKey = _this$props2.activeKey,
        generateChildId = _this$props2.generateChildId,
        id = _this$props2.id;
    var getId = null;

    if (accordion) {
      getId = generateChildId || function (key, type) {
        return id ? id + "-" + type + "-" + key : null;
      };
    }

    var panelGroupContext = _extends({
      getId: getId,
      headerRole: 'tab',
      panelRole: 'tabpanel'
    }, accordion && {
      activeKey: activeKey,
      onToggle: this.handleSelect
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PanelGroupContext.Provider, {
      value: panelGroupContext,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
        bsStyle: child.props.bsStyle || bsProps.bsStyle
      });
    })));
  };

  return PanelGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;
/* harmony default export */ const src_PanelGroup = (uncontrollable_default()(bsClass('panel-group', PanelGroup), {
  activeKey: 'onSelect'
}));
;// ./src/Accordion.js


var Accordion_jsxFileName = "/Users/harrison/react-bootstrap/src/Accordion.js";



var Accordion =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Accordion, _React$Component);

  function Accordion() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Accordion.prototype;

  _proto.render = function render() {
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PanelGroup, _extends({}, this.props, {
      accordion: true,
      __source: {
        fileName: Accordion_jsxFileName,
        lineNumber: 8
      },
      __self: this
    }), this.props.children);
  };

  return Accordion;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_Accordion = (Accordion);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/values.js
var values = __webpack_require__(5115);
var values_default = /*#__PURE__*/__webpack_require__.n(values);
;// ./src/CloseButton.js

var CloseButton_jsxFileName = "/Users/harrison/react-bootstrap/src/CloseButton.js";


var CloseButton_propTypes = {
  label: (prop_types_default()).string.isRequired,
  onClick: (prop_types_default()).func
};
var CloseButton_defaultProps = {
  label: 'Close'
};

var CloseButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CloseButton, _React$Component);

  function CloseButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CloseButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        label = _this$props.label,
        onClick = _this$props.onClick;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("button", {
      type: "button",
      className: "close",
      onClick: onClick,
      "aria-label": label,
      __source: {
        fileName: CloseButton_jsxFileName,
        lineNumber: 17
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      "aria-hidden": "true",
      __source: {
        fileName: CloseButton_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, "\xD7"), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __source: {
        fileName: CloseButton_jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, label));
  };

  return CloseButton;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

CloseButton.propTypes = CloseButton_propTypes;
CloseButton.defaultProps = CloseButton_defaultProps;
/* harmony default export */ const src_CloseButton = (CloseButton);
;// ./src/Alert.js




var Alert_jsxFileName = "/Users/harrison/react-bootstrap/src/Alert.js";






var Alert_propTypes = {
  onDismiss: (prop_types_default()).func,
  closeLabel: (prop_types_default()).string
};
var Alert_defaultProps = {
  closeLabel: 'Close alert'
};

var Alert =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Alert, _React$Component);

  function Alert() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Alert.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        onDismiss = _this$props.onDismiss,
        closeLabel = _this$props.closeLabel,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onDismiss", "closeLabel", "className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var dismissable = !!onDismiss;

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'dismissable')] = dismissable, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "alert",
      className: classnames_default()(className, classes),
      __source: {
        fileName: Alert_jsxFileName,
        lineNumber: 36
      },
      __self: this
    }), dismissable && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_CloseButton, {
      onClick: onDismiss,
      label: closeLabel,
      __source: {
        fileName: Alert_jsxFileName,
        lineNumber: 41
      },
      __self: this
    }), children);
  };

  return Alert;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Alert.propTypes = Alert_propTypes;
Alert.defaultProps = Alert_defaultProps;
/* harmony default export */ const src_Alert = (bsStyles(values_default()(State), State.INFO, bsClass('alert', Alert)));
;// ./src/Badge.js



var Badge_jsxFileName = "/Users/harrison/react-bootstrap/src/Badge.js";



 // TODO: `pullRight` doesn't belong here. There's no special handling here.

var Badge_propTypes = {
  pullRight: (prop_types_default()).bool
};
var Badge_defaultProps = {
  pullRight: false
};

var Badge =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Badge, _React$Component);

  function Badge() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Badge.prototype;

  _proto.hasContent = function hasContent(children) {
    var result = false;
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });
    return result;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        pullRight = _this$props.pullRight,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["pullRight", "className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), {
      'pull-right': pullRight,
      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Badge_jsxFileName,
        lineNumber: 47
      },
      __self: this
    }), children);
  };

  return Badge;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Badge.propTypes = Badge_propTypes;
Badge.defaultProps = Badge_defaultProps;
/* harmony default export */ const src_Badge = (bsClass('badge', Badge));
;// ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/elementType.js
var elementType = __webpack_require__(3105);
var elementType_default = /*#__PURE__*/__webpack_require__.n(elementType);
;// ./src/utils/createChainedFunction.js
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

/* harmony default export */ const utils_createChainedFunction = (createChainedFunction);
;// ./src/SafeAnchor.js




var SafeAnchor_jsxFileName = "/Users/harrison/react-bootstrap/src/SafeAnchor.js";




var SafeAnchor_propTypes = {
  href: (prop_types_default()).string,
  onClick: (prop_types_default()).func,
  onKeyDown: (prop_types_default()).func,
  disabled: (prop_types_default()).bool,
  role: (prop_types_default()).string,
  tabIndex: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * this is sort of silly but needed for Button
   */
  componentClass: (elementType_default())
};
var SafeAnchor_defaultProps = {
  componentClass: 'a'
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */


var SafeAnchor =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SafeAnchor, _React$Component);

  function SafeAnchor(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = SafeAnchor.prototype;

  _proto.handleClick = function handleClick(event) {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        href = _this$props.href,
        onClick = _this$props.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        Component = _this$props2.componentClass,
        disabled = _this$props2.disabled,
        onKeyDown = _this$props2.onKeyDown,
        props = _objectWithoutPropertiesLoose(_this$props2, ["componentClass", "disabled", "onKeyDown"]);

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')

      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props.style = _extends({
        pointerEvents: 'none'
      }, props.style);
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, props, {
      onClick: this.handleClick,
      onKeyDown: utils_createChainedFunction(this.handleKeyDown, onKeyDown),
      __source: {
        fileName: SafeAnchor_jsxFileName,
        lineNumber: 88
      },
      __self: this
    }));
  };

  return SafeAnchor;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

SafeAnchor.propTypes = SafeAnchor_propTypes;
SafeAnchor.defaultProps = SafeAnchor_defaultProps;
/* harmony default export */ const src_SafeAnchor = (SafeAnchor);
;// ./src/BreadcrumbItem.js



var BreadcrumbItem_jsxFileName = "/Users/harrison/react-bootstrap/src/BreadcrumbItem.js";




var BreadcrumbItem_propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: (prop_types_default()).bool,

  /**
   * `href` attribute for the inner `a` element
   */
  href: (prop_types_default()).string,

  /**
   * `title` attribute for the inner `a` element
   */
  title: (prop_types_default()).node,

  /**
   * `target` attribute for the inner `a` element
   */
  target: (prop_types_default()).string
};
var BreadcrumbItem_defaultProps = {
  active: false
};

var BreadcrumbItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BreadcrumbItem, _React$Component);

  function BreadcrumbItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        href = _this$props.href,
        title = _this$props.title,
        target = _this$props.target,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["active", "href", "title", "target", "className"]); // Don't try to render these props on non-active <span>.


    var linkProps = {
      href: href,
      title: title,
      target: target
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
      className: classnames_default()(className, {
        active: active
      }),
      __source: {
        fileName: BreadcrumbItem_jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, active ? external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, props, {
      __source: {
        fileName: BreadcrumbItem_jsxFileName,
        lineNumber: 40
      },
      __self: this
    })) : external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, _extends({}, props, linkProps, {
      __source: {
        fileName: BreadcrumbItem_jsxFileName,
        lineNumber: 42
      },
      __self: this
    })));
  };

  return BreadcrumbItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

BreadcrumbItem.propTypes = BreadcrumbItem_propTypes;
BreadcrumbItem.defaultProps = BreadcrumbItem_defaultProps;
/* harmony default export */ const src_BreadcrumbItem = (BreadcrumbItem);
;// ./src/Breadcrumb.js



var Breadcrumb_jsxFileName = "/Users/harrison/react-bootstrap/src/Breadcrumb.js";





var Breadcrumb =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Breadcrumb, _React$Component);

  function Breadcrumb() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ol", _extends({}, elementProps, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: classnames_default()(className, classes),
      __source: {
        fileName: Breadcrumb_jsxFileName,
        lineNumber: 15
      },
      __self: this
    }));
  };

  return Breadcrumb;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Breadcrumb.Item = src_BreadcrumbItem;
/* harmony default export */ const src_Breadcrumb = (bsClass('breadcrumb', Breadcrumb));
;// ./src/Button.js




var Button_jsxFileName = "/Users/harrison/react-bootstrap/src/Button.js";







var Button_propTypes = {
  active: (prop_types_default()).bool,
  disabled: (prop_types_default()).bool,
  block: (prop_types_default()).bool,
  onClick: (prop_types_default()).func,
  componentClass: (elementType_default()),
  href: (prop_types_default()).string,

  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: prop_types_default().oneOf(['button', 'reset', 'submit'])
};
var Button_defaultProps = {
  active: false,
  block: false,
  disabled: false
};

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.renderAnchor = function renderAnchor(elementProps, className) {
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, _extends({}, elementProps, {
      className: classnames_default()(className, elementProps.disabled && 'disabled'),
      __source: {
        fileName: Button_jsxFileName,
        lineNumber: 41
      },
      __self: this
    }));
  };

  _proto.renderButton = function renderButton(_ref, className) {
    var componentClass = _ref.componentClass,
        elementProps = _objectWithoutPropertiesLoose(_ref, ["componentClass"]);

    var Component = componentClass || 'button';
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      type: elementProps.type || 'button',
      className: className,
      __source: {
        fileName: Button_jsxFileName,
        lineNumber: 52
      },
      __self: this
    }));
  };

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        active = _this$props.active,
        block = _this$props.block,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["active", "block", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {
      active: active
    }, _extends2[prefix(bsProps, 'block')] = block, _extends2));

    var fullClassName = classnames_default()(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  };

  return Button;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Button.propTypes = Button_propTypes;
Button.defaultProps = Button_defaultProps;
/* harmony default export */ const src_Button = (bsClass('btn', bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL], bsStyles(values_default()(State).concat([Style.DEFAULT, Style.PRIMARY, Style.LINK]), Style.DEFAULT, Button))));
;// ./src/ButtonGroup.js



var ButtonGroup_jsxFileName = "/Users/harrison/react-bootstrap/src/ButtonGroup.js";






var ButtonGroup_propTypes = {
  vertical: (prop_types_default()).bool,
  justified: (prop_types_default()).bool,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   */
  block: (prop_types_default()).bool
};
var ButtonGroup_defaultProps = {
  block: false,
  justified: false,
  vertical: false
};

var ButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ButtonGroup, _React$Component);

  function ButtonGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        block = _this$props.block,
        justified = _this$props.justified,
        vertical = _this$props.vertical,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["block", "justified", "vertical", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

     false ? 0 : void 0;

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps)] = !vertical, _extends2[prefix(bsProps, 'vertical')] = vertical, _extends2[prefix(bsProps, 'justified')] = justified, _extends2[prefix(src_Button.defaultProps, 'block')] = block, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ButtonGroup_jsxFileName,
        lineNumber: 51
      },
      __self: this
    }));
  };

  return ButtonGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ButtonGroup.propTypes = ButtonGroup_propTypes;
ButtonGroup.defaultProps = ButtonGroup_defaultProps;
/* harmony default export */ const src_ButtonGroup = (bsClass('btn-group', ButtonGroup));
;// ./src/ButtonToolbar.js



var ButtonToolbar_jsxFileName = "/Users/harrison/react-bootstrap/src/ButtonToolbar.js";




var ButtonToolbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ButtonToolbar, _React$Component);

  function ButtonToolbar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ButtonToolbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "toolbar",
      className: classnames_default()(className, classes),
      __source: {
        fileName: ButtonToolbar_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }));
  };

  return ButtonToolbar;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_ButtonToolbar = (bsClass('btn-toolbar', ButtonToolbar));
;// ./src/CarouselCaption.js



var CarouselCaption_jsxFileName = "/Users/harrison/react-bootstrap/src/CarouselCaption.js";




var CarouselCaption_propTypes = {
  componentClass: (elementType_default())
};
var CarouselCaption_defaultProps = {
  componentClass: 'div'
};

var CarouselCaption =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CarouselCaption, _React$Component);

  function CarouselCaption() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CarouselCaption.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: CarouselCaption_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return CarouselCaption;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

CarouselCaption.propTypes = CarouselCaption_propTypes;
CarouselCaption.defaultProps = CarouselCaption_defaultProps;
/* harmony default export */ const src_CarouselCaption = (bsClass('carousel-caption', CarouselCaption));
// EXTERNAL MODULE: ./node_modules/dom-helpers/transition/index.js
var transition = __webpack_require__(1685);
;// ./src/CarouselItem.js




var CarouselItem_jsxFileName = "/Users/harrison/react-bootstrap/src/CarouselItem.js";




var CarouselItem_propTypes = {
  direction: prop_types_default().oneOf(['prev', 'next']),
  onAnimateOutEnd: (prop_types_default()).func,
  active: (prop_types_default()).bool,
  animateIn: (prop_types_default()).bool,
  animateOut: (prop_types_default()).bool,
  index: (prop_types_default()).number
};
var CarouselItem_defaultProps = {
  active: false,
  animateIn: false,
  animateOut: false
};

var CarouselItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CarouselItem, _React$Component);

  function CarouselItem(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleAnimateOutEnd = _this.handleAnimateOutEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      direction: null
    };
    _this.containerRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    _this.isUnmounted = false;
    return _this;
  }

  var _proto = CarouselItem.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    var active = this.props.active;
    var prevActive = prevProps.active;

    if (!active && prevActive) {
      transition/* default.end */.Ay.end(this.containerRef.current, this.handleAnimateOutEnd);
    }

    if (active !== prevActive) {
      setTimeout(function () {
        return _this2.startAnimation();
      }, 20);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  _proto.handleAnimateOutEnd = function handleAnimateOutEnd() {
    if (this.isUnmounted) {
      return;
    }

    if (this.props.onAnimateOutEnd) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  };

  _proto.startAnimation = function startAnimation() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        direction = _this$props.direction,
        active = _this$props.active,
        animateIn = _this$props.animateIn,
        animateOut = _this$props.animateOut,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["direction", "active", "animateIn", "animateOut", "className"]);

    delete props.onAnimateOutEnd;
    delete props.index;
    var classes = {
      item: true,
      active: active && !animateIn || animateOut
    };

    if (direction && active && animateIn) {
      classes[direction] = true;
    }

    if (this.state.direction && (animateIn || animateOut)) {
      classes[this.state.direction] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({
      ref: this.containerRef
    }, props, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: CarouselItem_jsxFileName,
        lineNumber: 103
      },
      __self: this
    }));
  };

  return CarouselItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

CarouselItem.propTypes = CarouselItem_propTypes;
CarouselItem.defaultProps = CarouselItem_defaultProps;
/* harmony default export */ const src_CarouselItem = (CarouselItem);
;// ./src/Glyphicon.js



var Glyphicon_jsxFileName = "/Users/harrison/react-bootstrap/src/Glyphicon.js";




var Glyphicon_propTypes = {
  /**
   * An icon name without "glyphicon-" prefix. See e.g. http://getbootstrap.com/components/#glyphicons
   */
  glyph: (prop_types_default()).string.isRequired
};

var Glyphicon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Glyphicon, _React$Component);

  function Glyphicon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Glyphicon.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        glyph = _this$props.glyph,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["glyph", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, glyph)] = true, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Glyphicon_jsxFileName,
        lineNumber: 30
      },
      __self: this
    }));
  };

  return Glyphicon;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Glyphicon.propTypes = Glyphicon_propTypes;
/* harmony default export */ const src_Glyphicon = (bsClass('glyphicon', Glyphicon));
;// ./src/Carousel.js




var Carousel_jsxFileName = "/Users/harrison/react-bootstrap/src/Carousel.js";








 // TODO: `slide` should be `animate`.
// TODO: Use uncontrollable.

var Carousel_propTypes = {
  slide: (prop_types_default()).bool,
  indicators: (prop_types_default()).bool,

  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: (prop_types_default()).number,
  controls: (prop_types_default()).bool,
  pauseOnHover: (prop_types_default()).bool,
  wrap: (prop_types_default()).bool,

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, ?event: Object) => any
   * ```
   *
   * If this callback takes two or more arguments, the second argument will
   * be a persisted event object with `direction` set to the direction of the
   * transition.
   */
  onSelect: (prop_types_default()).func,
  onSlideEnd: (prop_types_default()).func,
  activeIndex: (prop_types_default()).number,
  defaultActiveIndex: (prop_types_default()).number,
  direction: prop_types_default().oneOf(['prev', 'next']),
  prevIcon: (prop_types_default()).node,

  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: (prop_types_default()).string,
  nextIcon: (prop_types_default()).node,

  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: (prop_types_default()).string
};
var Carousel_defaultProps = {
  slide: true,
  interval: 5000,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  prevIcon: external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Glyphicon, {
    glyph: "chevron-left",
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }),
  prevLabel: 'Previous',
  nextIcon: external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Glyphicon, {
    glyph: "chevron-right",
    __source: {
      fileName: Carousel_jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }),
  nextLabel: 'Next'
};

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Carousel, _React$Component);

  function Carousel(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleMouseOver = _this.handleMouseOver.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseOut = _this.handleMouseOut.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePrev = _this.handlePrev.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleNext = _this.handleNext.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleItemAnimateOutEnd = _this.handleItemAnimateOutEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    var defaultActiveIndex = props.defaultActiveIndex;
    _this.state = {
      activeIndex: defaultActiveIndex != null ? defaultActiveIndex : 0,
      previousActiveIndex: null,
      direction: null
    };
    _this.isUnmounted = false;
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.waitForNext();
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }

    if (nextProps.activeIndex == null && this.state.activeIndex >= nextProps.children.length) {
      this.setState({
        activeIndex: 0,
        previousActiveIndex: null,
        direction: null
      });
    }
  };

  _proto.UNSAFE_componentWillUnmount = function UNSAFE_componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  };

  _proto.getActiveIndex = function getActiveIndex() {
    var activeIndexProp = this.props.activeIndex;
    return activeIndexProp != null ? activeIndexProp : this.state.activeIndex;
  };

  _proto.getDirection = function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  };

  _proto.handleItemAnimateOutEnd = function handleItemAnimateOutEnd() {
    var _this2 = this;

    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      _this2.waitForNext();

      if (_this2.props.onSlideEnd) {
        _this2.props.onSlideEnd();
      }
    });
  };

  _proto.handleMouseOut = function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  };

  _proto.handleMouseOver = function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  };

  _proto.handleNext = function handleNext(e) {
    var index = this.getActiveIndex() + 1;
    var count = ValidComponentChildren.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }

      index = 0;
    }

    this.select(index, e, 'next');
  };

  _proto.handlePrev = function handlePrev(e) {
    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }

      index = ValidComponentChildren.count(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  }; // This might be a public API.


  _proto.pause = function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  }; // This might be a public API.


  _proto.play = function play() {
    this.isPaused = false;
    this.waitForNext();
  };

  _proto.select = function select(index, e, direction) {
    clearTimeout(this.timeout); // TODO: Is this necessary? Seems like the only risk is if the component
    // unmounts while handleItemAnimateOutEnd fires.

    if (this.isUnmounted) {
      return;
    }

    var previousActiveIndex = this.props.slide ? this.getActiveIndex() : null;
    direction = direction || this.getDirection(previousActiveIndex, index);
    var onSelect = this.props.onSelect;

    if (onSelect) {
      if (onSelect.length > 1) {
        // React SyntheticEvents are pooled, so we need to remove this event
        // from the pool to add a custom property. To avoid unnecessarily
        // removing objects from the pool, only do this when the listener
        // actually wants the event.
        if (e) {
          e.persist();
          e.direction = direction;
        } else {
          e = {
            direction: direction
          };
        }

        onSelect(index, e);
      } else {
        onSelect(index);
      }
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queueing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  };

  _proto.waitForNext = function waitForNext() {
    var _this$props = this.props,
        slide = _this$props.slide,
        interval = _this$props.interval,
        activeIndexProp = _this$props.activeIndex;

    if (!this.isPaused && slide && interval && activeIndexProp == null) {
      this.timeout = setTimeout(this.handleNext, interval);
    }
  };

  _proto.renderControls = function renderControls(properties) {
    var wrap = properties.wrap,
        children = properties.children,
        activeIndex = properties.activeIndex,
        prevIcon = properties.prevIcon,
        nextIcon = properties.nextIcon,
        bsProps = properties.bsProps,
        prevLabel = properties.prevLabel,
        nextLabel = properties.nextLabel;
    var controlClassName = prefix(bsProps, 'control');
    var count = ValidComponentChildren.count(children);
    return [(wrap || activeIndex !== 0) && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, {
      key: "prev",
      className: classnames_default()(controlClassName, 'left'),
      onClick: this.handlePrev,
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 290
      },
      __self: this
    }, prevIcon, prevLabel && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 296
      },
      __self: this
    }, prevLabel)), (wrap || activeIndex !== count - 1) && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, {
      key: "next",
      className: classnames_default()(controlClassName, 'right'),
      onClick: this.handleNext,
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 301
      },
      __self: this
    }, nextIcon, nextLabel && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 307
      },
      __self: this
    }, nextLabel))];
  };

  _proto.renderIndicators = function renderIndicators(children, activeIndex, bsProps) {
    var _this3 = this;

    var indicators = [];
    ValidComponentChildren.forEach(children, function (child, index) {
      indicators.push(external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: function onClick(e) {
          return _this3.select(index, e);
        },
        __source: {
          fileName: Carousel_jsxFileName,
          lineNumber: 318
        },
        __self: this
      }), // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ol", {
      className: prefix(bsProps, 'indicators'),
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 330
      },
      __self: this
    }, indicators);
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$props2 = this.props,
        slide = _this$props2.slide,
        indicators = _this$props2.indicators,
        controls = _this$props2.controls,
        wrap = _this$props2.wrap,
        prevIcon = _this$props2.prevIcon,
        prevLabel = _this$props2.prevLabel,
        nextIcon = _this$props2.nextIcon,
        nextLabel = _this$props2.nextLabel,
        className = _this$props2.className,
        children = _this$props2.children,
        props = _objectWithoutPropertiesLoose(_this$props2, ["slide", "indicators", "controls", "wrap", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "className", "children"]);

    var _this$state = this.state,
        previousActiveIndex = _this$state.previousActiveIndex,
        direction = _this$state.direction;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['interval', 'pauseOnHover', 'onSelect', 'onSlideEnd', 'activeIndex', // Accessed via this.getActiveIndex().
    'defaultActiveIndex', 'direction']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var activeIndex = this.getActiveIndex();

    var classes = _extends({}, getClassSet(bsProps), {
      slide: slide
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut,
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 368
      },
      __self: this
    }), indicators && this.renderIndicators(children, activeIndex, bsProps), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'inner'),
      __source: {
        fileName: Carousel_jsxFileName,
        lineNumber: 376
      },
      __self: this
    }, ValidComponentChildren.map(children, function (child, index) {
      var active = index === activeIndex;
      var previousActive = slide && index === previousActiveIndex;
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
        active: active,
        index: index,
        animateOut: previousActive,
        animateIn: active && previousActiveIndex != null && slide,
        direction: direction,
        onAnimateOutEnd: previousActive ? _this4.handleItemAnimateOutEnd : null
      });
    })), controls && this.renderControls({
      wrap: wrap,
      children: children,
      activeIndex: activeIndex,
      prevIcon: prevIcon,
      prevLabel: prevLabel,
      nextIcon: nextIcon,
      nextLabel: nextLabel,
      bsProps: bsProps
    }));
  };

  return Carousel;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Carousel.propTypes = Carousel_propTypes;
Carousel.defaultProps = Carousel_defaultProps;
Carousel.Caption = src_CarouselCaption;
Carousel.Item = src_CarouselItem;
/* harmony default export */ const src_Carousel = (bsClass('carousel', Carousel));
;// ./src/Checkbox.js



var Checkbox_jsxFileName = "/Users/harrison/react-bootstrap/src/Checkbox.js";

/* eslint-disable jsx-a11y/label-has-for */





var Checkbox_propTypes = {
  inline: (prop_types_default()).bool,
  disabled: (prop_types_default()).bool,
  title: (prop_types_default()).string,

  /**
   * Only valid if `inline` is not set.
   */
  validationState: prop_types_default().oneOf(['success', 'warning', 'error', null]),

  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: (prop_types_default()).func
};
var Checkbox_defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Checkbox, _React$Component);

  function Checkbox() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Checkbox.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        inline = _this$props.inline,
        disabled = _this$props.disabled,
        validationState = _this$props.validationState,
        inputRef = _this$props.inputRef,
        className = _this$props.className,
        style = _this$props.style,
        title = _this$props.title,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["inline", "disabled", "validationState", "inputRef", "className", "style", "title", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var input = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", _extends({}, elementProps, {
      ref: inputRef,
      type: "checkbox",
      disabled: disabled,
      __source: {
        fileName: Checkbox_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }));

    if (inline) {
      var _classes2;

      var _classes = (_classes2 = {}, _classes2[prefix(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2); // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.


       false ? 0 : void 0;
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", {
        className: classnames_default()(className, _classes),
        style: style,
        title: title,
        __source: {
          fileName: Checkbox_jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, input, children);
    }

    var classes = _extends({}, getClassSet(bsProps), {
      disabled: disabled
    });

    if (validationState) {
      classes["has-" + validationState] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: classnames_default()(className, classes),
      style: style,
      __source: {
        fileName: Checkbox_jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", {
      title: title,
      __source: {
        fileName: Checkbox_jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, input, children));
  };

  return Checkbox;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Checkbox.propTypes = Checkbox_propTypes;
Checkbox.defaultProps = Checkbox_defaultProps;
/* harmony default export */ const src_Checkbox = (bsClass('checkbox', Checkbox));
;// ./src/utils/capitalize.js
function capitalize(string) {
  return "" + string.charAt(0).toUpperCase() + string.slice(1);
}
;// ./src/Clearfix.js



var Clearfix_jsxFileName = "/Users/harrison/react-bootstrap/src/Clearfix.js";







var Clearfix_propTypes = {
  componentClass: (elementType_default()),

  /**
   * Apply clearfix
   *
   * on Extra small devices Phones
   *
   * adds class `visible-xs-block`
   */
  visibleXsBlock: (prop_types_default()).bool,

  /**
   * Apply clearfix
   *
   * on Small devices Tablets
   *
   * adds class `visible-sm-block`
   */
  visibleSmBlock: (prop_types_default()).bool,

  /**
   * Apply clearfix
   *
   * on Medium devices Desktops
   *
   * adds class `visible-md-block`
   */
  visibleMdBlock: (prop_types_default()).bool,

  /**
   * Apply clearfix
   *
   * on Large devices Desktops
   *
   * adds class `visible-lg-block`
   */
  visibleLgBlock: (prop_types_default()).bool
};
var Clearfix_defaultProps = {
  componentClass: 'div'
};

var Clearfix =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Clearfix, _React$Component);

  function Clearfix() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Clearfix.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    DEVICE_SIZES.forEach(function (size) {
      var propName = "visible" + capitalize(size) + "Block";

      if (elementProps[propName]) {
        classes["visible-" + size + "-block"] = true;
      }

      delete elementProps[propName];
    });
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Clearfix_jsxFileName,
        lineNumber: 68
      },
      __self: this
    }));
  };

  return Clearfix;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Clearfix.propTypes = Clearfix_propTypes;
Clearfix.defaultProps = Clearfix_defaultProps;
/* harmony default export */ const src_Clearfix = (bsClass('clearfix', Clearfix));
;// ./src/FormGroupContext.js

var FormGroupContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
FormGroupContext.displayName = 'FormGroupContext';
/* harmony default export */ const src_FormGroupContext = (FormGroupContext);
;// ./src/ControlLabel.js



var ControlLabel_jsxFileName = "/Users/harrison/react-bootstrap/src/ControlLabel.js";






var ControlLabel_propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: (prop_types_default()).string,
  srOnly: (prop_types_default()).bool
};
var ControlLabel_defaultProps = {
  srOnly: false
};

var ControlLabel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ControlLabel, _React$Component);

  function ControlLabel() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ControlLabel.prototype;

  _proto.render = function render() {
    var formGroup = this.context;
    var controlId = formGroup && formGroup.controlId;

    var _this$props = this.props,
        _this$props$htmlFor = _this$props.htmlFor,
        htmlFor = _this$props$htmlFor === void 0 ? controlId : _this$props$htmlFor,
        srOnly = _this$props.srOnly,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["htmlFor", "srOnly", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

     false ? 0 : void 0;

    var classes = _extends({}, getClassSet(bsProps), {
      'sr-only': srOnly
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", _extends({}, elementProps, {
      htmlFor: htmlFor,
      className: classnames_default()(className, classes),
      __source: {
        fileName: ControlLabel_jsxFileName,
        lineNumber: 40
      },
      __self: this
    }));
  };

  return ControlLabel;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ControlLabel.propTypes = ControlLabel_propTypes;
ControlLabel.defaultProps = ControlLabel_defaultProps;
ControlLabel.contextType = src_FormGroupContext;
/* harmony default export */ const src_ControlLabel = (bsClass('control-label', ControlLabel));
;// ./src/Col.js



var Col_jsxFileName = "/Users/harrison/react-bootstrap/src/Col.js";






var Col_propTypes = {
  componentClass: (elementType_default()),

  /**
   * The number of columns you wish to span
   *
   * for Extra small devices Phones (<768px)
   *
   * class-prefix `col-xs-`
   */
  xs: (prop_types_default()).number,

  /**
   * The number of columns you wish to span
   *
   * for Small devices Tablets (≥768px)
   *
   * class-prefix `col-sm-`
   */
  sm: (prop_types_default()).number,

  /**
   * The number of columns you wish to span
   *
   * for Medium devices Desktops (≥992px)
   *
   * class-prefix `col-md-`
   */
  md: (prop_types_default()).number,

  /**
   * The number of columns you wish to span
   *
   * for Large devices Desktops (≥1200px)
   *
   * class-prefix `col-lg-`
   */
  lg: (prop_types_default()).number,

  /**
   * Hide column
   *
   * on Extra small devices Phones
   *
   * adds class `hidden-xs`
   */
  xsHidden: (prop_types_default()).bool,

  /**
   * Hide column
   *
   * on Small devices Tablets
   *
   * adds class `hidden-sm`
   */
  smHidden: (prop_types_default()).bool,

  /**
   * Hide column
   *
   * on Medium devices Desktops
   *
   * adds class `hidden-md`
   */
  mdHidden: (prop_types_default()).bool,

  /**
   * Hide column
   *
   * on Large devices Desktops
   *
   * adds class `hidden-lg`
   */
  lgHidden: (prop_types_default()).bool,

  /**
   * Move columns to the right
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-offset-`
   */
  xsOffset: (prop_types_default()).number,

  /**
   * Move columns to the right
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-offset-`
   */
  smOffset: (prop_types_default()).number,

  /**
   * Move columns to the right
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-offset-`
   */
  mdOffset: (prop_types_default()).number,

  /**
   * Move columns to the right
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-offset-`
   */
  lgOffset: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the right
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-push-`
   */
  xsPush: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the right
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-push-`
   */
  smPush: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the right
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-push-`
   */
  mdPush: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the right
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-push-`
   */
  lgPush: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the left
   *
   * for Extra small devices Phones
   *
   * class-prefix `col-xs-pull-`
   */
  xsPull: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the left
   *
   * for Small devices Tablets
   *
   * class-prefix `col-sm-pull-`
   */
  smPull: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the left
   *
   * for Medium devices Desktops
   *
   * class-prefix `col-md-pull-`
   */
  mdPull: (prop_types_default()).number,

  /**
   * Change the order of grid columns to the left
   *
   * for Large devices Desktops
   *
   * class-prefix `col-lg-pull-`
   */
  lgPull: (prop_types_default()).number
};
var Col_defaultProps = {
  componentClass: 'div'
};

var Col =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Col, _React$Component);

  function Col() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Col.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = [];
    DEVICE_SIZES.forEach(function (size) {
      function popProp(propSuffix, modifier) {
        var propName = "" + size + propSuffix;
        var propValue = elementProps[propName];

        if (propValue != null) {
          classes.push(prefix(bsProps, "" + size + modifier + "-" + propValue));
        }

        delete elementProps[propName];
      }

      popProp('', '');
      popProp('Offset', '-offset');
      popProp('Push', '-push');
      popProp('Pull', '-pull');
      var hiddenPropName = size + "Hidden";

      if (elementProps[hiddenPropName]) {
        classes.push("hidden-" + size);
      }

      delete elementProps[hiddenPropName];
    });
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Col_jsxFileName,
        lineNumber: 210
      },
      __self: this
    }));
  };

  return Col;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Col.propTypes = Col_propTypes;
Col.defaultProps = Col_defaultProps;
/* harmony default export */ const src_Col = (bsClass('col', Col));
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js
var parse_int = __webpack_require__(7222);
var parse_int_default = /*#__PURE__*/__webpack_require__.n(parse_int);
// EXTERNAL MODULE: ./node_modules/dom-helpers/style/index.js
var style = __webpack_require__(7735);
var style_default = /*#__PURE__*/__webpack_require__.n(style);
;// ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};

  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }

  return t;
}


;// ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


;// ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js


function inheritsLoose_inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}


// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(6003);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);
;// ./node_modules/react-transition-group/esm/config.js
/* harmony default export */ const config = ({
  disabled: false
});
;// ./node_modules/react-transition-group/esm/TransitionGroupContext.js

/* harmony default export */ const TransitionGroupContext = (external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(null));
;// ./node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};
;// ./node_modules/react-transition-group/esm/Transition.js









var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition =
/*#__PURE__*/
function (_React$Component) {
  inheritsLoose_inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) forceReflow(node);
        }

        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children), childProps))
    );
  };

  return Transition;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Transition.contextType = TransitionGroupContext;
Transition.propTypes =  false ? 0 : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ const esm_Transition = (Transition);
;// ./src/Collapse.js





var _collapseStyles,
    Collapse_jsxFileName = "/Users/harrison/react-bootstrap/src/Collapse.js";








var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
}; // reading a dimension prop will cause the browser to recalculate,
// which will let our animations work

function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function getDimensionValue(dimension, elem) {
  var value = elem["offset" + capitalize(dimension)];
  var margins = MARGINS[dimension];
  return value + parse_int_default()(style_default()(elem, margins[0]), 10) + parse_int_default()(style_default()(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[EXITED] = 'collapse', _collapseStyles[EXITING] = 'collapsing', _collapseStyles[ENTERING] = 'collapsing', _collapseStyles[ENTERED] = 'collapse in', _collapseStyles);
var Collapse_propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: (prop_types_default()).bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: (prop_types_default()).bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: (prop_types_default()).bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: (prop_types_default()).number,

  /**
   * Callback fired before the component expands
   */
  onEnter: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to expand
   */
  onEntering: (prop_types_default()).func,

  /**
   * Callback fired after the component has expanded
   */
  onEntered: (prop_types_default()).func,

  /**
   * Callback fired before the component collapses
   */
  onExit: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: (prop_types_default()).func,

  /**
   * Callback fired after the component has collapsed
   */
  onExited: (prop_types_default()).func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: prop_types_default().oneOfType([prop_types_default().oneOf(['height', 'width']), (prop_types_default()).func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: (prop_types_default()).func,

  /**
   * ARIA role of collapsible element
   */
  role: (prop_types_default()).string
};
var Collapse_defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue: getDimensionValue
};

var Collapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Collapse, _React$Component);

  function Collapse(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.handleEnter = function () {
      _this.childRef.current.style[_this.getDimension()] = '0';
    };

    _this.handleEntering = function () {
      var dimension = _this.getDimension();

      _this.childRef.current.style[dimension] = _this._getScrollDimensionValue(_this.childRef.current, dimension);
    };

    _this.handleEntered = function () {
      _this.childRef.current.style[_this.getDimension()] = null;
    };

    _this.handleExit = function () {
      var dimension = _this.getDimension();

      _this.childRef.current.style[dimension] = _this.props.getDimensionValue(dimension, _this.childRef.current) + "px";
      triggerBrowserReflow(_this.childRef.current);
    };

    _this.handleExiting = function () {
      _this.childRef.current.style[_this.getDimension()] = '0';
    };

    _this.childRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    return _this;
  }

  var _proto = Collapse.prototype;

  _proto.getDimension = function getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  }; // for testing


  _proto._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem["scroll" + capitalize(dimension)] + "px";
  };
  /* -- Expanding -- */


  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children"]);

    delete props.dimension;
    delete props.getDimensionValue;
    var handleEnter = utils_createChainedFunction(this.handleEnter, onEnter);
    var handleEntering = utils_createChainedFunction(this.handleEntering, onEntering);
    var handleEntered = utils_createChainedFunction(this.handleEntered, onEntered);
    var handleExit = utils_createChainedFunction(this.handleExit, onExit);
    var handleExiting = utils_createChainedFunction(this.handleExiting, onExiting);

    var ref = function ref(c) {
      _this2.childRef.current = c;
    };

    ref = utils_createChainedFunction(children.props.ref, ref);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Transition, _extends({}, props, {
      "aria-expanded": props.role ? props.in : null,
      nodeRef: this.childRef,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting,
      __source: {
        fileName: Collapse_jsxFileName,
        lineNumber: 216
      },
      __self: this
    }), function (state, innerProps) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, _extends({}, innerProps, {
        ref: ref,
        className: classnames_default()(className, children.props.className, collapseStyles[state], _this2.getDimension() === 'width' && 'width')
      }));
    });
  };

  return Collapse;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Collapse.propTypes = Collapse_propTypes;
Collapse.defaultProps = Collapse_defaultProps;
/* harmony default export */ const src_Collapse = (Collapse);
// EXTERNAL MODULE: ./node_modules/dom-helpers/activeElement.js
var activeElement = __webpack_require__(6335);
var activeElement_default = /*#__PURE__*/__webpack_require__.n(activeElement);
// EXTERNAL MODULE: ./node_modules/dom-helpers/query/contains.js
var contains = __webpack_require__(6489);
var contains_default = /*#__PURE__*/__webpack_require__.n(contains);
// EXTERNAL MODULE: ./node_modules/prop-types-extra/lib/isRequiredForA11y.js
var isRequiredForA11y = __webpack_require__(8861);
var isRequiredForA11y_default = /*#__PURE__*/__webpack_require__.n(isRequiredForA11y);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/from.js
var from = __webpack_require__(6807);
var from_default = /*#__PURE__*/__webpack_require__.n(from);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/contains.js
/* eslint-disable no-bitwise, no-cond-assign */

/**
 * Checks if an element contains another given element.
 * 
 * @param context the context element
 * @param node the element to check
 */
function contains_contains(context, node) {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/canUseDOM.js
/* harmony default export */ const canUseDOM = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/addEventListener.js
/* eslint-disable no-return-assign */

var optionsSupported = false;
var onceSupported = false;

try {
  var options = {
    get passive() {
      return optionsSupported = true;
    },

    get once() {
      // eslint-disable-next-line no-multi-assign
      return onceSupported = optionsSupported = true;
    }

  };

  if (canUseDOM) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {}
/* */

/**
 * An `addEventListener` ponyfill, supports the `once` option
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */


function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
        capture = options.capture;
    var wrappedHandler = handler;

    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };

      handler.__once = wrappedHandler;
    }

    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }

  node.addEventListener(eventName, handler, options);
}

/* harmony default export */ const esm_addEventListener = (addEventListener);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/removeEventListener.js
/**
 * A `removeEventListener` ponyfill
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);

  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}

/* harmony default export */ const esm_removeEventListener = (removeEventListener);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/listen.js



function listen(node, eventName, handler, options) {
  esm_addEventListener(node, eventName, handler, options);
  return function () {
    esm_removeEventListener(node, eventName, handler, options);
  };
}

/* harmony default export */ const esm_listen = (listen);
;// ./node_modules/@restart/hooks/esm/useCommittedRef.js

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */

function useCommittedRef(value) {
  const ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(value);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

/* harmony default export */ const esm_useCommittedRef = (useCommittedRef);
;// ./node_modules/@restart/hooks/esm/useEventCallback.js


function useEventCallback(fn) {
  const ref = esm_useCommittedRef(fn);
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}
// EXTERNAL MODULE: ./node_modules/react-overlays/node_modules/warning/warning.js
var warning = __webpack_require__(2384);
var warning_default = /*#__PURE__*/__webpack_require__.n(warning);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/ownerDocument.js
/**
 * Returns the owner document of a given element.
 * 
 * @param node the element
 */
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
;// ./node_modules/react-overlays/esm/safeFindDOMNode.js

function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().findDOMNode(componentOrElement);
  }

  return componentOrElement != null ? componentOrElement : null;
}
;// ./node_modules/react-overlays/esm/ownerDocument.js


/* harmony default export */ const esm_ownerDocument = (function (componentOrElement) {
  return ownerDocument(safeFindDOMNode(componentOrElement));
});
;// ./node_modules/react-overlays/esm/useRootClose.js






var escapeKeyCode = 27;

var useRootClose_noop = function noop() {};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var getRefTarget = function getRefTarget(ref) {
  return ref && ('current' in ref ? ref.current : ref);
};
/**
 * The `useRootClose` hook registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 *
 * @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
 * @param {function} onRootClose
 * @param {object=}  options
 * @param {boolean=} options.disabled
 * @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
 */


function useRootClose(ref, onRootClose, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      disabled = _ref.disabled,
      _ref$clickTrigger = _ref.clickTrigger,
      clickTrigger = _ref$clickTrigger === void 0 ? 'click' : _ref$clickTrigger;

  var preventMouseRootCloseRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(false);
  var onClose = onRootClose || useRootClose_noop;
  var handleMouseCapture = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (e) {
    var _e$composedPath$;

    var currentTarget = getRefTarget(ref);
    warning_default()(!!currentTarget, 'RootClose captured a close event but does not have a ref to compare it to. ' + 'useRootClose(), should be passed a ref that resolves to a DOM node');
    preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains_contains(currentTarget, (_e$composedPath$ = e.composedPath == null ? void 0 : e.composedPath()[0]) != null ? _e$composedPath$ : e.target);
  }, [ref]);
  var handleMouse = useEventCallback(function (e) {
    if (!preventMouseRootCloseRef.current) {
      onClose(e);
    }
  });
  var handleKeyUp = useEventCallback(function (e) {
    if (e.keyCode === escapeKeyCode || e.key === 'Escape') {
      onClose(e);
    }
  });
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (disabled || ref == null) return undefined; // Store the current event to avoid triggering handlers immediately
    // https://github.com/facebook/react/issues/20074

    var currentEvent = window.event;
    var doc = esm_ownerDocument(getRefTarget(ref)); // Use capture for this listener so it fires before React's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the React mouse callback.

    var removeMouseCaptureListener = esm_listen(doc, clickTrigger, handleMouseCapture, true);
    var removeMouseListener = esm_listen(doc, clickTrigger, function (e) {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }

      handleMouse(e);
    });
    var removeKeyupListener = esm_listen(doc, 'keyup', function (e) {
      // skip if this event is the same as the one running when we added the handlers
      if (e === currentEvent) {
        currentEvent = undefined;
        return;
      }

      handleKeyUp(e);
    });
    var mobileSafariHackListeners = [];

    if ('ontouchstart' in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map(function (el) {
        return esm_listen(el, 'mousemove', useRootClose_noop);
      });
    }

    return function () {
      removeMouseCaptureListener();
      removeMouseListener();
      removeKeyupListener();
      mobileSafariHackListeners.forEach(function (remove) {
        return remove();
      });
    };
  }, [ref, disabled, clickTrigger, handleMouseCapture, handleMouse, handleKeyUp]);
}

/* harmony default export */ const esm_useRootClose = (useRootClose);
;// ./src/DropdownMenu.js





var DropdownMenu_jsxFileName = "/Users/harrison/react-bootstrap/src/DropdownMenu.js";







var DropdownMenu_propTypes = {
  open: (prop_types_default()).bool,
  pullRight: (prop_types_default()).bool,
  onClose: (prop_types_default()).func,
  labelledBy: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]),
  onSelect: (prop_types_default()).func,
  rootCloseEvent: prop_types_default().oneOf(['click', 'mousedown'])
};
var DropdownMenu_defaultProps = {
  bsRole: 'menu',
  pullRight: false
};

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.handleRootClose = _this.handleRootClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.menuRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.getFocusableMenuItems = function getFocusableMenuItems() {
    var node = this.menuRef.current;

    if (!node) {
      return [];
    }

    return from_default()(node.querySelectorAll('[tabIndex="-1"]'));
  };

  _proto.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeIndex = items.indexOf(document.activeElement);
    return {
      items: items,
      activeIndex: activeIndex
    };
  };

  _proto.focusNext = function focusNext() {
    var _this$getItemsAndActi = this.getItemsAndActiveIndex(),
        items = _this$getItemsAndActi.items,
        activeIndex = _this$getItemsAndActi.activeIndex;

    if (items.length === 0) {
      return;
    }

    var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  };

  _proto.focusPrevious = function focusPrevious() {
    var _this$getItemsAndActi2 = this.getItemsAndActiveIndex(),
        items = _this$getItemsAndActi2.items,
        activeIndex = _this$getItemsAndActi2.activeIndex;

    if (items.length === 0) {
      return;
    }

    var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        this.focusNext();
        event.preventDefault();
        break;

      case 'ArrowUp':
        this.focusPrevious();
        event.preventDefault();
        break;

      case 'Escape':
      case 'Tab':
        this.props.onClose(event, {
          source: 'keydown'
        });
        break;

      default:
    }
  };

  _proto.handleRootClose = function handleRootClose(event) {
    this.props.onClose(event, {
      source: 'rootClose'
    });
  };

  _proto.render = function render() {
    var _extends2,
        _this2 = this;

    var _this$props = this.props,
        open = _this$props.open,
        pullRight = _this$props.pullRight,
        labelledBy = _this$props.labelledBy,
        onSelect = _this$props.onSelect,
        className = _this$props.className,
        rootCloseEvent = _this$props.rootCloseEvent,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["open", "pullRight", "labelledBy", "onSelect", "className", "rootCloseEvent", "children"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['onClose']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'right')] = pullRight, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(RootCloseWrapper, {
      disabled: !open,
      onRootClose: this.handleRootClose,
      event: rootCloseEvent,
      menuRef: this.menuRef,
      __source: {
        fileName: DropdownMenu_jsxFileName,
        lineNumber: 117
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", _extends({
      ref: this.menuRef
    }, elementProps, {
      role: "menu",
      className: classnames_default()(className, classes),
      "aria-labelledby": labelledBy,
      __source: {
        fileName: DropdownMenu_jsxFileName,
        lineNumber: 123
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
        onKeyDown: utils_createChainedFunction(child.props.onKeyDown, _this2.handleKeyDown),
        onSelect: utils_createChainedFunction(child.props.onSelect, onSelect)
      });
    })));
  };

  return DropdownMenu;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

function RootCloseWrapper(_ref) {
  var disabled = _ref.disabled,
      onRootClose = _ref.onRootClose,
      event = _ref.event,
      children = _ref.children,
      menuRef = _ref.menuRef;
  esm_useRootClose(menuRef, onRootClose, {
    disabled: disabled,
    clickTrigger: event
  });
  return children;
}

DropdownMenu.propTypes = DropdownMenu_propTypes;
DropdownMenu.defaultProps = DropdownMenu_defaultProps;
/* harmony default export */ const src_DropdownMenu = (bsClass('dropdown-menu', DropdownMenu));
;// ./src/DropdownToggle.js



var DropdownToggle_jsxFileName = "/Users/harrison/react-bootstrap/src/DropdownToggle.js";






var DropdownToggle_propTypes = {
  noCaret: (prop_types_default()).bool,
  open: (prop_types_default()).bool,
  title: (prop_types_default()).string,
  useAnchor: (prop_types_default()).bool
};
var DropdownToggle_defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

var DropdownToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownToggle, _React$Component);

  function DropdownToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DropdownToggle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        noCaret = _this$props.noCaret,
        open = _this$props.open,
        useAnchor = _this$props.useAnchor,
        bsClass = _this$props.bsClass,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["noCaret", "open", "useAnchor", "bsClass", "className", "children"]);

    delete props.bsRole;
    var Component = useAnchor ? src_SafeAnchor : src_Button;
    var useCaret = !noCaret; // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.
    // FIXME: Should this really fall back to `title` as children?

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, props, {
      role: "button",
      className: classnames_default()(className, bsClass),
      "aria-haspopup": true,
      "aria-expanded": open,
      __source: {
        fileName: DropdownToggle_jsxFileName,
        lineNumber: 45
      },
      __self: this
    }), children || props.title, useCaret && ' ', useCaret && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "caret",
      __source: {
        fileName: DropdownToggle_jsxFileName,
        lineNumber: 54
      },
      __self: this
    }));
  };

  return DropdownToggle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

DropdownToggle.propTypes = DropdownToggle_propTypes;
DropdownToggle.defaultProps = DropdownToggle_defaultProps;
/* harmony default export */ const src_DropdownToggle = (bsClass('dropdown-toggle', DropdownToggle));
;// ./src/Dropdown.js




var Dropdown_jsxFileName = "/Users/harrison/react-bootstrap/src/Dropdown.js";
















var TOGGLE_ROLE = src_DropdownToggle.defaultProps.bsRole;
var MENU_ROLE = src_DropdownMenu.defaultProps.bsRole;
var Dropdown_propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: (prop_types_default()).bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),
  componentClass: (elementType_default()),

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: (prop_types_default()).node,

  /**
   * Whether or not component is disabled.
   */
  disabled: (prop_types_default()).bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: (prop_types_default()).bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: (prop_types_default()).bool,
  defaultOpen: (prop_types_default()).bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable open
   */
  onToggle: (prop_types_default()).func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: (prop_types_default()).func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: (prop_types_default()).string,

  /**
   * Which event when fired outside the component will cause it to be closed
   *
   * *Note: For custom dropdown components, you will have to pass the
   * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
   * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
   */
  rootCloseEvent: prop_types_default().oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: (prop_types_default()).func,

  /**
   * @private
   */
  onMouseLeave: (prop_types_default()).func
};
var Dropdown_defaultProps = {
  componentClass: src_ButtonGroup
};

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Dropdown, _React$Component);

  function Dropdown(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._focusInDropdown = false;
    _this.containerRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    _this.lastOpenEventType = null;
    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.focusNextOnOpen();
  };

  _proto.UNSAFE_componentWillUpdate = function UNSAFE_componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = contains_default()(this.containerRef.current.querySelector('[role=menu]'), activeElement_default()(document));
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var open = this.props.open;
    var prevOpen = prevProps.open;

    if (open && !prevOpen) {
      this.focusNextOnOpen();
    }

    if (!open && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  _proto.focus = function focus() {
    var toggle = this.containerRef.current.querySelector('[role=button][aria-haspopup]');

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  };

  _proto.focusNextOnOpen = function focusNextOnOpen() {
    var menu = this.menu;

    if (!menu || !menu.focusNext) {
      return;
    }

    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
      menu.focusNext();
    }
  };

  _proto.handleClick = function handleClick(event) {
    // @hmhealey I added this because, when migrating the "passes open, event, and source correctly when closed with click"
    // test to use RTL, the root close handler started triggering when clicking on the menu button toggle which seems
    // like it shouldn't happen. We had similar issues with React 17 where overlays would open and immediately close, so
    // while that didn't happen in the tests using React 17, I'd be willing to guess that ReactTestUtils hid that from us.
    event.stopPropagation();

    if (this.props.disabled) {
      return;
    }

    this.toggleOpen(event, {
      source: 'click'
    });
  };

  _proto.handleClose = function handleClose(event, eventDetails) {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen(event, eventDetails);
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        if (!this.props.open) {
          this.toggleOpen(event, {
            source: 'keydown'
          });
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }

        event.preventDefault();
        break;

      case 'Escape':
      case 'Tab':
        this.handleClose(event, {
          source: 'keydown'
        });
        break;

      default:
    }
  };

  _proto.toggleOpen = function toggleOpen(event, eventDetails) {
    var open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventDetails.source;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open, event, eventDetails);
    }
  };

  _proto.renderMenu = function renderMenu(child, _ref) {
    var _this2 = this;

    var id = _ref.id,
        onSelect = _ref.onSelect,
        rootCloseEvent = _ref.rootCloseEvent,
        props = _objectWithoutPropertiesLoose(_ref, ["id", "onSelect", "rootCloseEvent"]);

    var ref = function ref(c) {
      _this2.menu = c;
    };

    if (child.props && child.props.ref) {
      ref = utils_createChainedFunction(child.props.ref, ref);
    }

    return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, _extends({}, props, {
      ref: ref,
      labelledBy: id,
      bsClass: prefix(props, 'menu'),
      onClose: utils_createChainedFunction(child.props.onClose, this.handleClose),
      onSelect: utils_createChainedFunction(child.props.onSelect, onSelect, function (key, event) {
        return _this2.handleClose(event, {
          source: 'select'
        });
      }),
      rootCloseEvent: rootCloseEvent
    }));
  };

  _proto.renderToggle = function renderToggle(child, props) {
    return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, _extends({}, props, {
      bsClass: prefix(props, 'toggle'),
      onClick: utils_createChainedFunction(child.props.onClick, this.handleClick),
      onKeyDown: utils_createChainedFunction(child.props.onKeyDown, this.handleKeyDown)
    }));
  };

  _proto.render = function render() {
    var _classes,
        _this3 = this;

    var _this$props = this.props,
        Component = _this$props.componentClass,
        id = _this$props.id,
        dropup = _this$props.dropup,
        disabled = _this$props.disabled,
        pullRight = _this$props.pullRight,
        open = _this$props.open,
        onSelect = _this$props.onSelect,
        role = _this$props.role,
        bsClass = _this$props.bsClass,
        className = _this$props.className,
        rootCloseEvent = _this$props.rootCloseEvent,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "id", "dropup", "disabled", "pullRight", "open", "onSelect", "role", "bsClass", "className", "rootCloseEvent", "children"]);

    delete props.onToggle;
    var missingRoleError = getMissingRoleError('Dropdown', children, TOGGLE_ROLE, MENU_ROLE);

    if (missingRoleError) {
       false ? 0 : void 0;
    }

    var duplicateRoleError = getDuplicateRoleError('Dropdown', children, MENU_ROLE);

    if (duplicateRoleError) {
       false ? 0 : void 0;
    }

    var classes = (_classes = {}, _classes[bsClass] = true, _classes.open = open, _classes.disabled = disabled, _classes);

    if (dropup) {
      classes[bsClass] = false;
      classes.dropup = true;
    } // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.


    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      ref: this.containerRef,
      style: {
        display: 'contents'
      },
      __source: {
        fileName: Dropdown_jsxFileName,
        lineNumber: 327
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, props, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Dropdown_jsxFileName,
        lineNumber: 328
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      switch (child.props.bsRole) {
        case TOGGLE_ROLE:
          return _this3.renderToggle(child, {
            id: id,
            disabled: disabled,
            open: open,
            role: role,
            bsClass: bsClass
          });

        case MENU_ROLE:
          return _this3.renderMenu(child, {
            id: id,
            open: open,
            pullRight: pullRight,
            bsClass: bsClass,
            onSelect: onSelect,
            rootCloseEvent: rootCloseEvent
          });

        default:
          return child;
      }
    })));
  };

  return Dropdown;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Dropdown.propTypes = Dropdown_propTypes;
Dropdown.defaultProps = Dropdown_defaultProps;
bsClass('dropdown', Dropdown);
var UncontrolledDropdown = uncontrollable_default()(Dropdown, {
  open: 'onToggle'
});
UncontrolledDropdown.Toggle = src_DropdownToggle;
UncontrolledDropdown.Menu = src_DropdownMenu;
/* harmony default export */ const src_Dropdown = (UncontrolledDropdown);
;// ./src/utils/splitComponentProps.js

function splitComponentProps(props, Component) {
  var componentPropTypes = Component.propTypes;
  var parentProps = {};
  var childProps = {};

  entries_default()(props).forEach(function (_ref) {
    var propName = _ref[0],
        propValue = _ref[1];

    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });

  return [parentProps, childProps];
}
;// ./src/DropdownButton.js



var DropdownButton_jsxFileName = "/Users/harrison/react-bootstrap/src/DropdownButton.js";





var DropdownButton_propTypes = _extends({}, src_Dropdown.propTypes, {
  // Toggle props.
  bsStyle: (prop_types_default()).string,
  bsSize: (prop_types_default()).string,
  title: (prop_types_default()).node.isRequired,
  noCaret: (prop_types_default()).bool,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: (prop_types_default()).node
});

var DropdownButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownButton, _React$Component);

  function DropdownButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DropdownButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsSize = _this$props.bsSize,
        bsStyle = _this$props.bsStyle,
        title = _this$props.title,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["bsSize", "bsStyle", "title", "children"]);

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        toggleProps = _splitComponentProps[1];

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, _extends({}, dropdownProps, {
      bsSize: bsSize,
      bsStyle: bsStyle,
      __source: {
        fileName: DropdownButton_jsxFileName,
        lineNumber: 33
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Toggle, _extends({}, toggleProps, {
      bsSize: bsSize,
      bsStyle: bsStyle,
      __source: {
        fileName: DropdownButton_jsxFileName,
        lineNumber: 34
      },
      __self: this
    }), title), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Menu, {
      __source: {
        fileName: DropdownButton_jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, children));
  };

  return DropdownButton;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

DropdownButton.propTypes = DropdownButton_propTypes;
/* harmony default export */ const src_DropdownButton = (DropdownButton);
;// ./src/Fade.js




var _fadeStyles,
    Fade_jsxFileName = "/Users/harrison/react-bootstrap/src/Fade.js";






var Fade_propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: (prop_types_default()).bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: (prop_types_default()).bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: (prop_types_default()).bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: (prop_types_default()).number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: (prop_types_default()).func,

  /**
   * Callback fired after the has component faded in
   */
  onEntered: (prop_types_default()).func,

  /**
   * Callback fired before the component fades out
   */
  onExit: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: (prop_types_default()).func,

  /**
   * Callback fired after the component has faded out
   */
  onExited: (prop_types_default()).func
};
var Fade_defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[ENTERING] = 'in', _fadeStyles[ENTERED] = 'in', _fadeStyles);

var Fade =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Fade, _React$Component);

  function Fade(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.childRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    return _this;
  }

  var _proto = Fade.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var ref = function ref(c) {
      _this2.childRef.current = c;
    };

    ref = utils_createChainedFunction(children.props.ref, ref);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Transition, _extends({}, props, {
      nodeRef: this.childRef,
      __source: {
        fileName: Fade_jsxFileName,
        lineNumber: 96
      },
      __self: this
    }), function (status, innerProps) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, _extends({}, innerProps, {
        ref: ref,
        className: classnames_default()('fade', className, children.props.className, fadeStyles[status])
      }));
    });
  };

  return Fade;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Fade.propTypes = Fade_propTypes;
Fade.defaultProps = Fade_defaultProps;
/* harmony default export */ const src_Fade = (Fade);
;// ./src/Form.js



var Form_jsxFileName = "/Users/harrison/react-bootstrap/src/Form.js";





var Form_propTypes = {
  horizontal: (prop_types_default()).bool,
  inline: (prop_types_default()).bool,
  componentClass: (elementType_default())
};
var Form_defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form'
};

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Form, _React$Component);

  function Form() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Form.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        horizontal = _this$props.horizontal,
        inline = _this$props.inline,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["horizontal", "inline", "componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = [];

    if (horizontal) {
      classes.push(prefix(bsProps, 'horizontal'));
    }

    if (inline) {
      classes.push(prefix(bsProps, 'inline'));
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Form_jsxFileName,
        lineNumber: 41
      },
      __self: this
    }));
  };

  return Form;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Form.propTypes = Form_propTypes;
Form.defaultProps = Form_defaultProps;
/* harmony default export */ const src_Form = (bsClass('form', Form));
;// ./src/FormControlFeedback.js



var FormControlFeedback_jsxFileName = "/Users/harrison/react-bootstrap/src/FormControlFeedback.js";





var FormControlFeedback_defaultProps = {
  bsRole: 'feedback'
};

var FormControlFeedback =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormControlFeedback, _React$Component);

  function FormControlFeedback() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormControlFeedback.prototype;

  _proto.getGlyph = function getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';

      case 'warning':
        return 'warning-sign';

      case 'error':
        return 'remove';

      default:
        return null;
    }
  };

  _proto.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, elementProps) {
    var glyph = this.getGlyph(formGroup && formGroup.validationState);

    if (!glyph) {
      return null;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Glyphicon, _extends({}, elementProps, {
      glyph: glyph,
      className: classnames_default()(className, classes),
      __source: {
        fileName: FormControlFeedback_jsxFileName,
        lineNumber: 33
      },
      __self: this
    }));
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(this.context, className, classes, elementProps);
    }

    var child = external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, _extends({}, elementProps, {
      className: classnames_default()(child.props.className, className, classes)
    }));
  };

  return FormControlFeedback;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

FormControlFeedback.defaultProps = FormControlFeedback_defaultProps;
FormControlFeedback.contextType = src_FormGroupContext;
/* harmony default export */ const src_FormControlFeedback = (bsClass('form-control-feedback', FormControlFeedback));
;// ./src/FormControlStatic.js



var FormControlStatic_jsxFileName = "/Users/harrison/react-bootstrap/src/FormControlStatic.js";




var FormControlStatic_propTypes = {
  componentClass: (elementType_default())
};
var FormControlStatic_defaultProps = {
  componentClass: 'p'
};

var FormControlStatic =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormControlStatic, _React$Component);

  function FormControlStatic() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormControlStatic.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: FormControlStatic_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return FormControlStatic;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

FormControlStatic.propTypes = FormControlStatic_propTypes;
FormControlStatic.defaultProps = FormControlStatic_defaultProps;
/* harmony default export */ const src_FormControlStatic = (bsClass('form-control-static', FormControlStatic));
;// ./src/FormControl.js



var FormControl_jsxFileName = "/Users/harrison/react-bootstrap/src/FormControl.js";










var FormControl_propTypes = {
  componentClass: (elementType_default()),

  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: (prop_types_default()).string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: (prop_types_default()).string,

  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormControl inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: (prop_types_default()).func
};
var FormControl_defaultProps = {
  componentClass: 'input'
};

var FormControl =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormControl, _React$Component);

  function FormControl() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormControl.prototype;

  _proto.render = function render() {
    var formGroup = this.context;
    var controlId = formGroup && formGroup.controlId;

    var _this$props = this.props,
        Component = _this$props.componentClass,
        type = _this$props.type,
        _this$props$id = _this$props.id,
        id = _this$props$id === void 0 ? controlId : _this$props$id,
        inputRef = _this$props.inputRef,
        className = _this$props.className,
        bsSize = _this$props.bsSize,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "type", "id", "inputRef", "className", "bsSize"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

     false ? 0 : void 0; // input[type="file"] should not have .form-control.

    var classes;

    if (type !== 'file') {
      classes = getClassSet(bsProps);
    } // If user provides a size, make sure to append it to classes as input-
    // e.g. if bsSize is small, it will append input-sm


    if (bsSize) {
      var size = SIZE_MAP[bsSize] || bsSize;
      classes[prefix({
        bsClass: 'input'
      }, size)] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      type: type,
      id: id,
      ref: inputRef,
      className: classnames_default()(className, classes),
      __source: {
        fileName: FormControl_jsxFileName,
        lineNumber: 79
      },
      __self: this
    }));
  };

  return FormControl;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

FormControl.propTypes = FormControl_propTypes;
FormControl.defaultProps = FormControl_defaultProps;
FormControl.contextType = src_FormGroupContext;
FormControl.Feedback = src_FormControlFeedback;
FormControl.Static = src_FormControlStatic;
/* harmony default export */ const src_FormControl = (bsClass('form-control', bsSizes([Size.SMALL, Size.LARGE], FormControl)));
;// ./src/FormGroup.js



var FormGroup_jsxFileName = "/Users/harrison/react-bootstrap/src/FormGroup.js";







var FormGroup_propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: (prop_types_default()).string,
  validationState: prop_types_default().oneOf(['success', 'warning', 'error', null])
};

var FormGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormGroup, _React$Component);

  function FormGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormGroup.prototype;

  _proto.hasFeedback = function hasFeedback(children) {
    var _this = this;

    return ValidComponentChildren.some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this.hasFeedback(child.props.children);
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        validationState = _this$props.validationState,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["validationState", "className", "children"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['controlId']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var classes = _extends({}, getClassSet(bsProps), {
      'has-feedback': this.hasFeedback(children)
    });

    if (validationState) {
      classes["has-" + validationState] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_FormGroupContext.Provider, {
      value: {
        controlId: this.props.controlId,
        validationState: validationState
      },
      __source: {
        fileName: FormGroup_jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: FormGroup_jsxFileName,
        lineNumber: 49
      },
      __self: this
    }), children));
  };

  return FormGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

FormGroup.propTypes = FormGroup_propTypes;
/* harmony default export */ const src_FormGroup = (bsClass('form-group', bsSizes([Size.LARGE, Size.SMALL], FormGroup)));
;// ./src/Grid.js



var Grid_jsxFileName = "/Users/harrison/react-bootstrap/src/Grid.js";





var Grid_propTypes = {
  /**
   * Turn any fixed-width grid layout into a full-width layout by this property.
   *
   * Adds `container-fluid` class.
   */
  fluid: (prop_types_default()).bool,

  /**
   * You can use a custom element for this component
   */
  componentClass: (elementType_default())
};
var Grid_defaultProps = {
  componentClass: 'div',
  fluid: false
};

var Grid =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Grid, _React$Component);

  function Grid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        fluid = _this$props.fluid,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["fluid", "componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = prefix(bsProps, fluid && 'fluid');
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Grid_jsxFileName,
        lineNumber: 39
      },
      __self: this
    }));
  };

  return Grid;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Grid.propTypes = Grid_propTypes;
Grid.defaultProps = Grid_defaultProps;
/* harmony default export */ const src_Grid = (bsClass('container', Grid));
;// ./src/HelpBlock.js



var HelpBlock_jsxFileName = "/Users/harrison/react-bootstrap/src/HelpBlock.js";




var HelpBlock =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(HelpBlock, _React$Component);

  function HelpBlock() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = HelpBlock.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: HelpBlock_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }));
  };

  return HelpBlock;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_HelpBlock = (bsClass('help-block', HelpBlock));
;// ./src/Image.js



var Image_jsxFileName = "/Users/harrison/react-bootstrap/src/Image.js";




var Image_propTypes = {
  /**
   * Sets image as responsive image
   */
  responsive: (prop_types_default()).bool,

  /**
   * Sets image shape as rounded
   */
  rounded: (prop_types_default()).bool,

  /**
   * Sets image shape as circle
   */
  circle: (prop_types_default()).bool,

  /**
   * Sets image shape as thumbnail
   */
  thumbnail: (prop_types_default()).bool
};
var Image_defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false
};

var Image =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Image, _React$Component);

  function Image() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Image.prototype;

  _proto.render = function render() {
    var _classes;

    var _this$props = this.props,
        responsive = _this$props.responsive,
        rounded = _this$props.rounded,
        circle = _this$props.circle,
        thumbnail = _this$props.thumbnail,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["responsive", "rounded", "circle", "thumbnail", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (_classes = {}, _classes[prefix(bsProps, 'responsive')] = responsive, _classes[prefix(bsProps, 'rounded')] = rounded, _classes[prefix(bsProps, 'circle')] = circle, _classes[prefix(bsProps, 'thumbnail')] = thumbnail, _classes);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("img", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Image_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }));
  };

  return Image;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Image.propTypes = Image_propTypes;
Image.defaultProps = Image_defaultProps;
/* harmony default export */ const src_Image = (bsClass('img', Image));
;// ./src/InputGroupAddon.js



var InputGroupAddon_jsxFileName = "/Users/harrison/react-bootstrap/src/InputGroupAddon.js";




var InputGroupAddon =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroupAddon, _React$Component);

  function InputGroupAddon() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroupAddon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: InputGroupAddon_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }));
  };

  return InputGroupAddon;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_InputGroupAddon = (bsClass('input-group-addon', InputGroupAddon));
;// ./src/InputGroupButton.js



var InputGroupButton_jsxFileName = "/Users/harrison/react-bootstrap/src/InputGroupButton.js";




var InputGroupButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroupButton, _React$Component);

  function InputGroupButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroupButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: InputGroupButton_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }));
  };

  return InputGroupButton;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_InputGroupButton = (bsClass('input-group-btn', InputGroupButton));
;// ./src/InputGroup.js



var InputGroup_jsxFileName = "/Users/harrison/react-bootstrap/src/InputGroup.js";







var InputGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputGroup, _React$Component);

  function InputGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: InputGroup_jsxFileName,
        lineNumber: 22
      },
      __self: this
    }));
  };

  return InputGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

InputGroup.Addon = src_InputGroupAddon;
InputGroup.Button = src_InputGroupButton;
/* harmony default export */ const src_InputGroup = (bsClass('input-group', bsSizes([Size.LARGE, Size.SMALL], InputGroup)));
;// ./src/Jumbotron.js



var Jumbotron_jsxFileName = "/Users/harrison/react-bootstrap/src/Jumbotron.js";




var Jumbotron_propTypes = {
  componentClass: (elementType_default())
};
var Jumbotron_defaultProps = {
  componentClass: 'div'
};

var Jumbotron =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Jumbotron, _React$Component);

  function Jumbotron() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Jumbotron.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Jumbotron_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return Jumbotron;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Jumbotron.propTypes = Jumbotron_propTypes;
Jumbotron.defaultProps = Jumbotron_defaultProps;
/* harmony default export */ const src_Jumbotron = (bsClass('jumbotron', Jumbotron));
;// ./src/Label.js




var Label_jsxFileName = "/Users/harrison/react-bootstrap/src/Label.js";





var Label =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Label, _React$Component);

  function Label() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Label.prototype;

  _proto.hasContent = function hasContent(children) {
    var result = false;
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });
    return result;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), {
      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Label_jsxFileName,
        lineNumber: 41
      },
      __self: this
    }), children);
  };

  return Label;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_Label = (bsClass('label', bsStyles(values_default()(State).concat([Style.DEFAULT, Style.PRIMARY]), Style.DEFAULT, Label)));
;// ./src/ListGroupItem.js




var ListGroupItem_jsxFileName = "/Users/harrison/react-bootstrap/src/ListGroupItem.js";





var ListGroupItem_propTypes = {
  active: (prop_types_default()).any,
  disabled: (prop_types_default()).any,
  header: (prop_types_default()).node,
  listItem: (prop_types_default()).bool,
  onClick: (prop_types_default()).func,
  href: (prop_types_default()).string,
  type: (prop_types_default()).string
};
var ListGroupItem_defaultProps = {
  listItem: false
};

var ListGroupItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListGroupItem, _React$Component);

  function ListGroupItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ListGroupItem.prototype;

  _proto.renderHeader = function renderHeader(header, headingClassName) {
    if (external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(header)) {
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(header, {
        className: classnames_default()(header.props.className, headingClassName)
      });
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("h4", {
      className: headingClassName,
      __source: {
        fileName: ListGroupItem_jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, header);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        disabled = _this$props.disabled,
        className = _this$props.className,
        header = _this$props.header,
        listItem = _this$props.listItem,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["active", "disabled", "className", "header", "listItem", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), {
      active: active,
      disabled: disabled
    });

    var Component;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = classnames_default()(className, classes); // TODO: Deprecate `header` prop.

    if (header) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
        __source: {
          fileName: ListGroupItem_jsxFileName,
          lineNumber: 76
        },
        __self: this
      }), this.renderHeader(header, prefix(bsProps, 'heading')), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("p", {
        className: prefix(bsProps, 'text'),
        __source: {
          fileName: ListGroupItem_jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, children));
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      __source: {
        fileName: ListGroupItem_jsxFileName,
        lineNumber: 84
      },
      __self: this
    }), children);
  };

  return ListGroupItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ListGroupItem.propTypes = ListGroupItem_propTypes;
ListGroupItem.defaultProps = ListGroupItem_defaultProps;
/* harmony default export */ const src_ListGroupItem = (bsClass('list-group-item', bsStyles(values_default()(State), ListGroupItem)));
;// ./src/ListGroup.js



var ListGroup_jsxFileName = "/Users/harrison/react-bootstrap/src/ListGroup.js";






var ListGroup_propTypes = {
  /**
   * You can use a custom element type for this component.
   *
   * If not specified, it will be treated as `'li'` if every child is a
   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
   */
  componentClass: (elementType_default())
};

function getDefaultComponent(children) {
  if (!children) {
    // FIXME: This is the old behavior. Is this right?
    return 'div';
  }

  if (ValidComponentChildren.some(children, function (child) {
    return child.type !== src_ListGroupItem || child.props.href || child.props.onClick;
  })) {
    return 'div';
  }

  return 'ul';
}

var ListGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListGroup, _React$Component);

  function ListGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ListGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        _this$props$component = _this$props.componentClass,
        Component = _this$props$component === void 0 ? getDefaultComponent(children) : _this$props$component,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    var useListItem = Component === 'ul' && ValidComponentChildren.every(children, function (child) {
      return child.type === src_ListGroupItem;
    });
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ListGroup_jsxFileName,
        lineNumber: 59
      },
      __self: this
    }), useListItem ? ValidComponentChildren.map(children, function (child) {
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
        listItem: true
      });
    }) : children);
  };

  return ListGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ListGroup.propTypes = ListGroup_propTypes;
/* harmony default export */ const src_ListGroup = (bsClass('list-group', ListGroup));
;// ./src/MediaBody.js



var MediaBody_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaBody.js";






var MediaBody_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default().oneOf(['top', 'middle', 'bottom']),
  componentClass: (elementType_default())
};
var MediaBody_defaultProps = {
  componentClass: 'div'
};

var MediaBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaBody, _React$Component);

  function MediaBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        align = _this$props.align,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "align", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaBody_jsxFileName,
        lineNumber: 45
      },
      __self: this
    }));
  };

  return MediaBody;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

MediaBody.propTypes = MediaBody_propTypes;
MediaBody.defaultProps = MediaBody_defaultProps;
/* harmony default export */ const src_MediaBody = (bsClass('media-body', MediaBody));
;// ./src/MediaHeading.js



var MediaHeading_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaHeading.js";




var MediaHeading_propTypes = {
  componentClass: (elementType_default())
};
var MediaHeading_defaultProps = {
  componentClass: 'h4'
};

var MediaHeading =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaHeading, _React$Component);

  function MediaHeading() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaHeading.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaHeading_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return MediaHeading;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

MediaHeading.propTypes = MediaHeading_propTypes;
MediaHeading.defaultProps = MediaHeading_defaultProps;
/* harmony default export */ const src_MediaHeading = (bsClass('media-heading', MediaHeading));
;// ./src/MediaLeft.js



var MediaLeft_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaLeft.js";





var MediaLeft_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default().oneOf(['top', 'middle', 'bottom'])
};

var MediaLeft =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaLeft, _React$Component);

  function MediaLeft() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaLeft.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        align = _this$props.align,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["align", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaLeft_jsxFileName,
        lineNumber: 32
      },
      __self: this
    }));
  };

  return MediaLeft;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

MediaLeft.propTypes = MediaLeft_propTypes;
/* harmony default export */ const src_MediaLeft = (bsClass('media-left', MediaLeft));
;// ./src/MediaList.js



var MediaList_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaList.js";




var MediaList =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaList, _React$Component);

  function MediaList() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaList.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaList_jsxFileName,
        lineNumber: 13
      },
      __self: this
    }));
  };

  return MediaList;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_MediaList = (bsClass('media-list', MediaList));
;// ./src/MediaListItem.js



var MediaListItem_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaListItem.js";




var MediaListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaListItem, _React$Component);

  function MediaListItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaListItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaListItem_jsxFileName,
        lineNumber: 13
      },
      __self: this
    }));
  };

  return MediaListItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_MediaListItem = (bsClass('media', MediaListItem));
;// ./src/MediaRight.js



var MediaRight_jsxFileName = "/Users/harrison/react-bootstrap/src/MediaRight.js";





var MediaRight_propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: prop_types_default().oneOf(['top', 'middle', 'bottom'])
};

var MediaRight =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MediaRight, _React$Component);

  function MediaRight() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = MediaRight.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        align = _this$props.align,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["align", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-right-top`.
      classes[prefix(src_Media.defaultProps, align)] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: MediaRight_jsxFileName,
        lineNumber: 32
      },
      __self: this
    }));
  };

  return MediaRight;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

MediaRight.propTypes = MediaRight_propTypes;
/* harmony default export */ const src_MediaRight = (bsClass('media-right', MediaRight));
;// ./src/Media.js



var Media_jsxFileName = "/Users/harrison/react-bootstrap/src/Media.js";










var Media_propTypes = {
  componentClass: (elementType_default())
};
var Media_defaultProps = {
  componentClass: 'div'
};

var Media =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Media, _React$Component);

  function Media() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Media.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Media_jsxFileName,
        lineNumber: 29
      },
      __self: this
    }));
  };

  return Media;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Media.propTypes = Media_propTypes;
Media.defaultProps = Media_defaultProps;
Media.Heading = src_MediaHeading;
Media.Body = src_MediaBody;
Media.Left = src_MediaLeft;
Media.Right = src_MediaRight;
Media.List = src_MediaList;
Media.ListItem = src_MediaListItem;
/* harmony default export */ const src_Media = (bsClass('media', Media));
;// ./src/MenuItem.js




var MenuItem_jsxFileName = "/Users/harrison/react-bootstrap/src/MenuItem.js";







var MenuItem_propTypes = {
  /**
   * Highlight the menu item as active.
   */
  active: (prop_types_default()).bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: (prop_types_default()).bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: (prop_types_default()).bool,

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: (prop_types_default()).any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: (prop_types_default()).bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: (prop_types_default()).string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: (prop_types_default()).func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: (prop_types_default()).func
};
var MenuItem_defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

var MenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MenuItem, _React$Component);

  function MenuItem(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.handleClick = function handleClick(event) {
    var _this$props = this.props,
        href = _this$props.href,
        disabled = _this$props.disabled,
        onSelect = _this$props.onSelect,
        eventKey = _this$props.eventKey;

    if (!href || disabled) {
      event.preventDefault();
    }

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        divider = _this$props2.divider,
        header = _this$props2.header,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        style = _this$props2.style,
        props = _objectWithoutPropertiesLoose(_this$props2, ["active", "disabled", "divider", "header", "onClick", "className", "style"]);

     false ? 0 : void 0;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['eventKey', 'onSelect']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    if (divider) {
      // Forcibly blank out the children; separators shouldn't render any.
      elementProps.children = undefined;
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", _extends({}, elementProps, {
        role: "separator",
        className: classnames_default()(className, 'divider'),
        style: style,
        __source: {
          fileName: MenuItem_jsxFileName,
          lineNumber: 113
        },
        __self: this
      }));
    }

    if (header) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", _extends({}, elementProps, {
        role: "heading",
        className: classnames_default()(className, prefix(bsProps, 'header')),
        style: style,
        __source: {
          fileName: MenuItem_jsxFileName,
          lineNumber: 124
        },
        __self: this
      }));
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
      role: "presentation",
      className: classnames_default()(className, {
        active: active,
        disabled: disabled
      }),
      style: style,
      __source: {
        fileName: MenuItem_jsxFileName,
        lineNumber: 134
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, _extends({}, elementProps, {
      role: "menuitem",
      tabIndex: "-1",
      onClick: utils_createChainedFunction(onClick, this.handleClick),
      __source: {
        fileName: MenuItem_jsxFileName,
        lineNumber: 139
      },
      __self: this
    })));
  };

  return MenuItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

MenuItem.propTypes = MenuItem_propTypes;
MenuItem.defaultProps = MenuItem_defaultProps;
/* harmony default export */ const src_MenuItem = (bsClass('dropdown', MenuItem));
// EXTERNAL MODULE: ./node_modules/dom-helpers/events/index.js
var events = __webpack_require__(9287);
// EXTERNAL MODULE: ./node_modules/dom-helpers/ownerDocument.js
var dom_helpers_ownerDocument = __webpack_require__(1999);
var ownerDocument_default = /*#__PURE__*/__webpack_require__.n(dom_helpers_ownerDocument);
// EXTERNAL MODULE: ./node_modules/dom-helpers/util/inDOM.js
var inDOM = __webpack_require__(8647);
var inDOM_default = /*#__PURE__*/__webpack_require__.n(inDOM);
// EXTERNAL MODULE: ./node_modules/dom-helpers/util/scrollbarSize.js
var scrollbarSize = __webpack_require__(6065);
var scrollbarSize_default = /*#__PURE__*/__webpack_require__.n(scrollbarSize);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/isDocument.js
function isDocument(element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/isWindow.js

function isWindow(node) {
  if ('window' in node && node.window === node) return node;
  if (isDocument(node)) return node.defaultView || false;
  return false;
}
;// ./node_modules/react-overlays/esm/isOverflowing.js



function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
  var win = isWindow(node) || doc.defaultView;
  return doc.body.clientWidth < win.innerWidth;
}

function isOverflowing(container) {
  var win = isWindow(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}
;// ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  return extends_extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];

      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }

    return n;
  }, extends_extends.apply(null, arguments);
}


;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/activeElement.js

/**
 * Returns the actively focused element safely.
 *
 * @param doc the document to check
 */

function activeElement_activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  } // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>


  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}
// EXTERNAL MODULE: ./node_modules/react-overlays/node_modules/prop-types/index.js
var node_modules_prop_types = __webpack_require__(1933);
var node_modules_prop_types_default = /*#__PURE__*/__webpack_require__.n(node_modules_prop_types);
;// ./node_modules/@restart/hooks/esm/useMounted.js

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */

function useMounted() {
  const mounted = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(true);
  const isMounted = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(() => mounted.current);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}
;// ./node_modules/@restart/hooks/esm/useUpdatedRef.js

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */

function useUpdatedRef(value) {
  const valueRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(value);
  valueRef.current = value;
  return valueRef;
}
;// ./node_modules/@restart/hooks/esm/useWillUnmount.js


/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */

function useWillUnmount(fn) {
  const onUnmount = useUpdatedRef(fn);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => () => onUnmount.current(), []);
}
;// ./node_modules/@restart/hooks/esm/usePrevious.js

/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */

function usePrevious(value) {
  const ref = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/hasClass.js
/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/addClass.js

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/ownerWindow.js

/**
 * Returns the owner window of a given element.
 * 
 * @param node the element
 */

function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/getComputedStyle.js

/**
 * Returns one or all computed style properties of an element.
 * 
 * @param node the element
 * @param psuedoElement the style property
 */

function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/hyphenate.js
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/hyphenateStyle.js
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/isTransform.js
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/css.js




function css_style(node, property) {
  var css = '';
  var transforms = '';

  if (typeof property === 'string') {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
  }

  Object.keys(property).forEach(function (key) {
    var value = property[key];

    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += "transform: " + transforms + ";";
  }

  node.style.cssText += ";" + css;
}

/* harmony default export */ const css = (css_style);
;// ./node_modules/react-overlays/node_modules/dom-helpers/esm/scrollbarSize.js

var size;
function scrollbarSize_scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}
;// ./node_modules/react-overlays/esm/manageAriaHidden.js
var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, exclude, cb) {
  [].forEach.call(container.children, function (node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(hide, node) {
  if (!node) return;

  if (hide) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog,
      backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog,
      backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(false, node);
  });
}
;// ./node_modules/react-overlays/esm/ModalManager.js







function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }

    return false;
  });
  return idx;
}
/**
 * Proper state management for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */


var ModalManager =
/*#__PURE__*/
function () {
  function ModalManager(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$hideSiblingNodes = _ref.hideSiblingNodes,
        hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
        _ref$handleContainerO = _ref.handleContainerOverflow,
        handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

    this.hideSiblingNodes = void 0;
    this.handleContainerOverflow = void 0;
    this.modals = void 0;
    this.containers = void 0;
    this.data = void 0;
    this.scrollbarSize = void 0;
    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = scrollbarSize_scrollbarSize();
  }

  var _proto = ModalManager.prototype;

  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };

  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function (d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style = {
      overflow: 'hidden'
    }; // we are only interested in the actual `style` here
    // because we will override it

    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };

    if (containerState.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style.paddingRight = parseInt(css(container, 'paddingRight') || '0', 10) + this.scrollbarSize + "px";
    }

    css(container, style);
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    Object.assign(container.style, containerState.style);
  };

  _proto.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      hideSiblings(container, modal);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: isOverflowing(container)
    };

    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }

    data.classes.forEach(addClass.bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };

  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
    // clean up the container

    if (data.modals.length === 0) {
      data.classes.forEach(removeClass.bind(null, container));

      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        showSiblings(container, modal);
      }

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      var _data$modals = data.modals[data.modals.length - 1],
          backdrop = _data$modals.backdrop,
          dialog = _data$modals.dialog;
      ariaHidden(false, dialog);
      ariaHidden(false, backdrop);
    }
  };

  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
}();

/* harmony default export */ const esm_ModalManager = (ModalManager);
;// ./node_modules/react-overlays/esm/useWaitForDOMRef.js


var resolveContainerRef = function resolveContainerRef(ref) {
  var _ref;

  if (typeof document === 'undefined') return null;
  if (ref == null) return ownerDocument().body;
  if (typeof ref === 'function') ref = ref();
  if (ref && 'current' in ref) ref = ref.current;
  if ((_ref = ref) != null && _ref.nodeType) return ref || null;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(function () {
    return resolveContainerRef(ref);
  }),
      resolvedRef = _useState[0],
      setRef = _useState[1];

  if (!resolvedRef) {
    var earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    var nextRef = resolveContainerRef(ref);

    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}
;// ./node_modules/react-overlays/esm/Modal.js


/* eslint-disable @typescript-eslint/no-use-before-define, react/prop-types */














var manager;

function getManager() {
  if (!manager) manager = new esm_ModalManager();
  return manager;
}

function useModalManager(provided) {
  var modalManager = provided || getManager();
  var modal = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: function add(container, className) {
      return modalManager.add(modal.current, container, className);
    },
    remove: function remove() {
      return modalManager.remove(modal.current);
    },
    isTopModal: function isTopModal() {
      return modalManager.isTopModal(modal.current);
    },
    setDialogRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function (ref) {
      modal.current.backdrop = ref;
    }, [])
  });
}

var Modal =
/*#__PURE__*/
(0,external_root_React_commonjs2_react_commonjs_react_amd_react_.forwardRef)(function (_ref, ref) {
  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'dialog' : _ref$role,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      _ref$backdrop = _ref.backdrop,
      backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
      _ref$keyboard = _ref.keyboard,
      keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
      onBackdropClick = _ref.onBackdropClick,
      onEscapeKeyDown = _ref.onEscapeKeyDown,
      transition = _ref.transition,
      backdropTransition = _ref.backdropTransition,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
      _ref$enforceFocus = _ref.enforceFocus,
      enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus,
      _ref$restoreFocus = _ref.restoreFocus,
      restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
      restoreFocusOptions = _ref.restoreFocusOptions,
      renderDialog = _ref.renderDialog,
      _ref$renderBackdrop = _ref.renderBackdrop,
      renderBackdrop = _ref$renderBackdrop === void 0 ? function (props) {
    return (
      /*#__PURE__*/
      external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", props)
    );
  } : _ref$renderBackdrop,
      providedManager = _ref.manager,
      containerRef = _ref.container,
      containerClassName = _ref.containerClassName,
      onShow = _ref.onShow,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      onExit = _ref.onExit,
      onExited = _ref.onExited,
      onExiting = _ref.onExiting,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered,
      rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);

  var container = useWaitForDOMRef(containerRef);
  var modal = useModalManager(providedManager);
  var isMounted = useMounted();
  var prevShow = usePrevious(show);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!show),
      exited = _useState[0],
      setExited = _useState[1];

  var lastFocusRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)(null);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useImperativeHandle)(ref, function () {
    return modal;
  }, [modal]);

  if (canUseDOM && !prevShow && show) {
    lastFocusRef.current = activeElement_activeElement();
  }

  if (!transition && !show && !exited) {
    setExited(true);
  } else if (show && exited) {
    setExited(false);
  }

  var handleShow = useEventCallback(function () {
    modal.add(container, containerClassName);
    removeKeydownListenerRef.current = esm_listen(document, 'keydown', handleDocumentKeyDown);
    removeFocusListenerRef.current = esm_listen(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
    // and so steals focus from it
    function () {
      return setTimeout(handleEnforceFocus);
    }, true);

    if (onShow) {
      onShow();
    } // autofocus after onShow to not trigger a focus event for previous
    // modals before this one is shown.


    if (autoFocus) {
      var currentActiveElement = activeElement_activeElement(document);

      if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  var handleHide = useEventCallback(function () {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();

    if (restoreFocus) {
      var _lastFocusRef$current; // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)


      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  }); // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120
  // Show logic when:
  //  - show is `true` _and_ `container` has resolved

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!show || !container) return;
    handleShow();
  }, [show, container,
  /* should never change: */
  handleShow]); // Hide cleanup logic when:
  //  - `exited` switches to true
  //  - component unmounts;

  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  useWillUnmount(function () {
    handleHide();
  }); // --------------------------------

  var handleEnforceFocus = useEventCallback(function () {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }

    var currentActiveElement = activeElement_activeElement();

    if (modal.dialog && currentActiveElement && !contains_contains(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  var handleBackdropClick = useEventCallback(function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    onBackdropClick == null ? void 0 : onBackdropClick(e);

    if (backdrop === true) {
      onHide();
    }
  });
  var handleDocumentKeyDown = useEventCallback(function (e) {
    if (keyboard && (e.keyCode === 27 || e.key === 'Escape') && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);

      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  var removeFocusListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  var removeKeydownListenerRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();

  var handleHidden = function handleHidden() {
    setExited(true);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onExited == null ? void 0 : onExited.apply(void 0, args);
  };

  var Transition = transition;

  if (!container || !(show || Transition && !exited)) {
    return null;
  }

  var dialogProps = extends_extends({
    role: role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    'aria-modal': role === 'dialog' ? true : undefined
  }, rest, {
    style: style,
    className: className,
    tabIndex: -1
  });

  var dialog = renderDialog ? renderDialog(dialogProps) :
  /*#__PURE__*/
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", dialogProps,
  /*#__PURE__*/
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, {
    role: 'document'
  }));

  if (Transition) {
    dialog =
    /*#__PURE__*/
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
      appear: true,
      unmountOnExit: true,
      "in": !!show,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, dialog);
  }

  var backdropElement = null;

  if (backdrop) {
    var BackdropTransition = backdropTransition;
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });

    if (BackdropTransition) {
      backdropElement =
      /*#__PURE__*/
      external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(BackdropTransition, {
        appear: true,
        "in": !!show
      }, backdropElement);
    }
  }

  return (
    /*#__PURE__*/
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null,
    /*#__PURE__*/
    external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal(
    /*#__PURE__*/
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, backdropElement, dialog), container))
  );
});
var Modal_propTypes = {
  /**
   * Set the visibility of the Modal
   */
  show: (node_modules_prop_types_default()).bool,

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: (node_modules_prop_types_default()).any,

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: (node_modules_prop_types_default()).func,

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: (node_modules_prop_types_default()).func,

  /**
   * Include a backdrop component.
   */
  backdrop: node_modules_prop_types_default().oneOfType([(node_modules_prop_types_default()).bool, node_modules_prop_types_default().oneOf(['static'])]),

  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js static
   * renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: (node_modules_prop_types_default()).func,

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: (node_modules_prop_types_default()).func,

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   *
   * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
   */
  onEscapeKeyDown: (node_modules_prop_types_default()).func,

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: (node_modules_prop_types_default()).func,

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: (node_modules_prop_types_default()).string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: (node_modules_prop_types_default()).bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: (node_modules_prop_types_default()).elementType,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: (node_modules_prop_types_default()).elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: (node_modules_prop_types_default()).bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: (node_modules_prop_types_default()).bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: (node_modules_prop_types_default()).bool,

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: node_modules_prop_types_default().shape({
    preventScroll: (node_modules_prop_types_default()).bool
  }),

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: (node_modules_prop_types_default()).func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: (node_modules_prop_types_default()).func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: (node_modules_prop_types_default()).func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: (node_modules_prop_types_default()).func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: (node_modules_prop_types_default()).func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: (node_modules_prop_types_default()).func,

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: node_modules_prop_types_default().instanceOf(esm_ModalManager)
};
Modal.displayName = 'Modal';
Modal.propTypes = Modal_propTypes;
/* harmony default export */ const esm_Modal = (Object.assign(Modal, {
  Manager: esm_ModalManager
}));
;// ./src/ModalBody.js



var ModalBody_jsxFileName = "/Users/harrison/react-bootstrap/src/ModalBody.js";




var ModalBody_propTypes = {
  componentClass: (elementType_default())
};
var ModalBody_defaultProps = {
  componentClass: 'div'
};

var ModalBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalBody, _React$Component);

  function ModalBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ModalBody_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return ModalBody;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ModalBody.propTypes = ModalBody_propTypes;
ModalBody.defaultProps = ModalBody_defaultProps;
/* harmony default export */ const src_ModalBody = (bsClass('modal-body', ModalBody));
;// ./src/ModalContext.js

var ModalContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
ModalContext.displayName = 'ModalContext';
/* harmony default export */ const src_ModalContext = (ModalContext);
;// ./src/ModalDialog.js



var ModalDialog_jsxFileName = "/Users/harrison/react-bootstrap/src/ModalDialog.js";





var ModalDialog_propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: (prop_types_default()).string,

  /**
   * A method to run for the mousedown event on the dialog.
   */
  handleDialogMouseDown: (prop_types_default()).func
};

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalDialog, _React$Component);

  function ModalDialog() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalDialog.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        dialogClassName = _this$props.dialogClassName,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        handleDialogMouseDown = _this$props.handleDialogMouseDown,
        props = _objectWithoutPropertiesLoose(_this$props, ["dialogClassName", "className", "style", "children", "handleDialogMouseDown"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var bsClassName = prefix(bsProps);

    var modalStyle = _extends({
      display: 'block'
    }, style);

    var dialogClasses = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[prefix(bsProps, 'dialog')] = true, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      tabIndex: "-1",
      role: "dialog",
      style: modalStyle,
      className: classnames_default()(className, bsClassName),
      __source: {
        fileName: ModalDialog_jsxFileName,
        lineNumber: 49
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: classnames_default()(dialogClassName, dialogClasses),
      __source: {
        fileName: ModalDialog_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'content'),
      role: "document",
      onMouseDown: handleDialogMouseDown,
      __source: {
        fileName: ModalDialog_jsxFileName,
        lineNumber: 57
      },
      __self: this
    }, children)));
  };

  return ModalDialog;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ModalDialog.propTypes = ModalDialog_propTypes;
/* harmony default export */ const src_ModalDialog = (bsClass('modal', bsSizes([Size.LARGE, Size.SMALL], ModalDialog)));
;// ./src/ModalFooter.js



var ModalFooter_jsxFileName = "/Users/harrison/react-bootstrap/src/ModalFooter.js";




var ModalFooter_propTypes = {
  componentClass: (elementType_default())
};
var ModalFooter_defaultProps = {
  componentClass: 'div'
};

var ModalFooter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalFooter, _React$Component);

  function ModalFooter() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalFooter.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ModalFooter_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return ModalFooter;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ModalFooter.propTypes = ModalFooter_propTypes;
ModalFooter.defaultProps = ModalFooter_defaultProps;
/* harmony default export */ const src_ModalFooter = (bsClass('modal-footer', ModalFooter));
;// ./src/ModalHeader.js



var ModalHeader_jsxFileName = "/Users/harrison/react-bootstrap/src/ModalHeader.js";






 // TODO: `aria-label` should be `closeLabel`.

var ModalHeader_propTypes = {
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: (prop_types_default()).string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: (prop_types_default()).bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: (prop_types_default()).func
};
var ModalHeader_defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};

var ModalHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalHeader, _React$Component);

  function ModalHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        closeLabel = _this$props.closeLabel,
        closeButton = _this$props.closeButton,
        onHide = _this$props.onHide,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["closeLabel", "closeButton", "onHide", "className", "children"]);

    var modal = this.context;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ModalHeader_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }), closeButton && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_CloseButton, {
      label: closeLabel,
      onClick: utils_createChainedFunction(modal && modal.onHide, onHide),
      __source: {
        fileName: ModalHeader_jsxFileName,
        lineNumber: 58
      },
      __self: this
    }), children);
  };

  return ModalHeader;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ModalHeader.propTypes = ModalHeader_propTypes;
ModalHeader.defaultProps = ModalHeader_defaultProps;
ModalHeader.contextType = src_ModalContext;
/* harmony default export */ const src_ModalHeader = (bsClass('modal-header', ModalHeader));
;// ./src/ModalTitle.js



var ModalTitle_jsxFileName = "/Users/harrison/react-bootstrap/src/ModalTitle.js";




var ModalTitle_propTypes = {
  componentClass: (elementType_default())
};
var ModalTitle_defaultProps = {
  componentClass: 'h4'
};

var ModalTitle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ModalTitle, _React$Component);

  function ModalTitle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalTitle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: ModalTitle_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return ModalTitle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ModalTitle.propTypes = ModalTitle_propTypes;
ModalTitle.defaultProps = ModalTitle_defaultProps;
/* harmony default export */ const src_ModalTitle = (bsClass('modal-title', ModalTitle));
;// ./src/Modal.js




var Modal_jsxFileName = "/Users/harrison/react-bootstrap/src/Modal.js";






















var src_Modal_propTypes = _extends({}, esm_Modal.propTypes, src_ModalDialog.propTypes, {
  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: prop_types_default().oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: (prop_types_default()).string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: (prop_types_default()).bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: (prop_types_default()).bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: (elementType_default()),

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: (prop_types_default()).bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: (prop_types_default()).bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: (prop_types_default()).bool,

  /**
   * When `true` The modal will show itself.
   */
  show: (prop_types_default()).bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: (prop_types_default()).func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: (prop_types_default()).func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: (prop_types_default()).func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: (prop_types_default()).func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: (prop_types_default()).func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: (prop_types_default()).func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: (prop_types_default()).func
});

var Modal_defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  onHide: function onHide() {},
  renderBackdrop: function renderBackdrop(props) {
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, props, {
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 129
      },
      __self: this
    }));
  },
  animation: true,
  dialogComponentClass: src_ModalDialog
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Fade, _extends({}, props, {
    timeout: Modal_Modal.TRANSITION_DURATION,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 137
    },
    __self: this
  }));
}

function BackdropTransition(props) {
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Fade, _extends({}, props, {
    timeout: Modal_Modal.BACKDROP_TRANSITION_DURATION,
    __source: {
      fileName: Modal_jsxFileName,
      lineNumber: 141
    },
    __self: this
  }));
}
/* eslint-enable no-use-before-define */


var Modal_Modal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleDialogMouseDown = function () {
      _this._ignoreBackdropClick = true;
    };

    _this.handleEntering = _this.handleEntering.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleWindowResize = _this.handleWindowResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDialogClick = _this.handleDialogClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setModalRef = _this.setModalRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      style: {}
    };
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clean up the listener if we need to.
    this.handleExited();
  };

  _proto.setModalRef = function setModalRef(ref) {
    this._modal = ref;
  }; // We prevent the modal from closing during a drag by detecting where the
  // the click originates from. If it starts in the modal and then ends outside
  // don't close.


  _proto.handleDialogClick = function handleDialogClick(e) {
    if (e.target !== e.currentTarget || this._ignoreBackdropClick) {
      this._ignoreBackdropClick = false;
      return;
    }

    this.props.onHide();
  };

  _proto.handleEntering = function handleEntering() {
    // FIXME: This should work even when animation is disabled.
    events/* default.on */.Ay.on(window, 'resize', this.handleWindowResize);
    this.updateStyle();
  };

  _proto.handleExited = function handleExited() {
    // FIXME: This should work even when animation is disabled.
    events/* default.off */.Ay.off(window, 'resize', this.handleWindowResize);
  };

  _proto.handleWindowResize = function handleWindowResize() {
    this.updateStyle();
  };

  _proto.updateStyle = function updateStyle() {
    if (!(inDOM_default())) {
      return;
    }

    var dialogNode = this._modal.dialog;
    var dialogHeight = dialogNode.scrollHeight;
    var document = ownerDocument_default()(dialogNode);
    var bodyIsOverflowing = isOverflowing(document.body);
    var modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;
    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarSize_default()() : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? scrollbarSize_default()() : undefined
      }
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        backdrop = _this$props.backdrop,
        backdropClassName = _this$props.backdropClassName,
        animation = _this$props.animation,
        show = _this$props.show,
        Dialog = _this$props.dialogComponentClass,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        onEntering = _this$props.onEntering,
        onExited = _this$props.onExited,
        props = _objectWithoutPropertiesLoose(_this$props, ["backdrop", "backdropClassName", "animation", "show", "dialogComponentClass", "className", "style", "children", "onEntering", "onExited"]);

    var _splitComponentProps = splitComponentProps(props, esm_Modal),
        baseModalProps = _splitComponentProps[0],
        dialogProps = _splitComponentProps[1];

    var inClassName = show && !animation && 'in';
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_ModalContext.Provider, {
      value: {
        onHide: this.props.onHide
      },
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 248
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Modal, _extends({}, baseModalProps, {
      ref: this.setModalRef,
      show: show,
      containerClassName: prefix(props, 'open'),
      transition: animation ? DialogTransition : undefined,
      backdrop: backdrop,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: function renderBackdrop(backdropProps) {
        return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, backdropProps, {
          className: classnames_default()(prefix(props, 'backdrop'), backdropClassName, inClassName),
          __source: {
            fileName: Modal_jsxFileName,
            lineNumber: 258
          },
          __self: this
        }));
      },
      onEntering: utils_createChainedFunction(onEntering, this.handleEntering),
      onExited: utils_createChainedFunction(onExited, this.handleExited),
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 249
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Dialog, _extends({}, dialogProps, {
      style: _extends({}, this.state.style, style),
      className: classnames_default()(className, inClassName),
      onClick: backdrop === true ? this.handleDialogClick : null,
      handleDialogMouseDown: this.handleDialogMouseDown,
      __source: {
        fileName: Modal_jsxFileName,
        lineNumber: 270
      },
      __self: this
    }), children)));
  };

  return Modal;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Modal_Modal.propTypes = src_Modal_propTypes;
Modal_Modal.defaultProps = Modal_defaultProps;
Modal_Modal.Body = src_ModalBody;
Modal_Modal.Header = src_ModalHeader;
Modal_Modal.Title = src_ModalTitle;
Modal_Modal.Footer = src_ModalFooter;
Modal_Modal.Dialog = src_ModalDialog;
Modal_Modal.TRANSITION_DURATION = 300;
Modal_Modal.BACKDROP_TRANSITION_DURATION = 150;
/* harmony default export */ const src_Modal = (bsClass('modal', bsSizes([Size.LARGE, Size.SMALL], Modal_Modal)));
;// ./src/NavbarContext.js

var NavbarContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
NavbarContext.displayName = 'NavbarContext';
/* harmony default export */ const src_NavbarContext = (NavbarContext);
;// ./src/TabContainerContext.js

var TabContainerContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
TabContainerContext.displayName = 'TabContainerContext';
/* harmony default export */ const src_TabContainerContext = (TabContainerContext);
;// ./src/Nav.js



var Nav_jsxFileName = "/Users/harrison/react-bootstrap/src/Nav.js";








 // TODO: Should we expose `<NavItem>` as `<Nav.Item>`?
// TODO: This `bsStyle` is very unlike the others. Should we rename it?
// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

var Nav_propTypes = {
  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: (prop_types_default()).any,

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: (prop_types_default()).string,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: (prop_types_default()).bool,
  justified: (prop_types_default()).bool,

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: (prop_types_default()).func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: (prop_types_default()).string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: (prop_types_default()).bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: (prop_types_default()).bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: (prop_types_default()).bool
};
var Nav_defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

var Nav =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Nav, _React$Component);

  function Nav(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.containerRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    return _this;
  }

  var _proto = Nav.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    if (!this._needsRefocus) {
      return;
    }

    this._needsRefocus = false;
    var children = this.props.children;

    var _this$getActiveProps = this.getActiveProps(),
        activeKey = _this$getActiveProps.activeKey,
        activeHref = _this$getActiveProps.activeHref;

    var activeChild = ValidComponentChildren.find(children, function (child) {
      return _this2.isActive(child, activeKey, activeHref);
    });
    var childrenArray = ValidComponentChildren.toArray(children);
    var activeChildIndex = childrenArray.indexOf(activeChild);
    var childNodes = this.containerRef.current.children;
    var activeNode = childNodes && childNodes[activeChildIndex];

    if (!activeNode || !activeNode.firstChild) {
      return;
    }

    activeNode.firstChild.focus();
  };

  _proto.getActiveProps = function getActiveProps() {
    var tabContainer = this.props.tabContainerContext;

    if (tabContainer) {
       false ? 0 : void 0;
      return tabContainer;
    }

    return this.props;
  };

  _proto.getNextActiveChild = function getNextActiveChild(offset) {
    var _this3 = this;

    var children = this.props.children;
    var validChildren = children.filter(function (child) {
      return child.props.eventKey != null && !child.props.disabled;
    });

    var _this$getActiveProps2 = this.getActiveProps(),
        activeKey = _this$getActiveProps2.activeKey,
        activeHref = _this$getActiveProps2.activeHref;

    var activeChild = ValidComponentChildren.find(children, function (child) {
      return _this3.isActive(child, activeKey, activeHref);
    }); // This assumes the active child is not disabled.

    var activeChildIndex = validChildren.indexOf(activeChild);

    if (activeChildIndex === -1) {
      // Something has gone wrong. Select the first valid child we can find.
      return validChildren[0];
    }

    var nextIndex = activeChildIndex + offset;
    var numValidChildren = validChildren.length;

    if (nextIndex >= numValidChildren) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = numValidChildren - 1;
    }

    return validChildren[nextIndex];
  };

  _proto.getTabProps = function getTabProps(child, tabContainer, navRole, active, onSelect) {
    var _this4 = this;

    if (!tabContainer && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    var _child$props = child.props,
        id = _child$props.id,
        controls = _child$props['aria-controls'],
        eventKey = _child$props.eventKey,
        role = _child$props.role,
        onKeyDown = _child$props.onKeyDown,
        tabIndex = _child$props.tabIndex;

    if (tabContainer) {
       false ? 0 : void 0;
      id = tabContainer.getTabId(eventKey);
      controls = tabContainer.getPaneId(eventKey);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = utils_createChainedFunction(function (event) {
        return _this4.handleTabKeyDown(onSelect, event);
      }, onKeyDown);
      tabIndex = active ? tabIndex : -1;
    }

    return {
      id: id,
      role: role,
      onKeyDown: onKeyDown,
      'aria-controls': controls,
      tabIndex: tabIndex
    };
  };

  _proto.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
    var nextActiveChild;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = this.getNextActiveChild(-1);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = this.getNextActiveChild(1);
        break;

      default:
        // It was a different key; don't handle this keypress.
        return;
    }

    event.preventDefault();

    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey != null) {
      onSelect(nextActiveChild.props.eventKey);
    }

    this._needsRefocus = true;
  };

  _proto.isActive = function isActive(_ref, activeKey, activeHref) {
    var props = _ref.props;

    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    return props.active;
  };

  _proto.render = function render() {
    var _extends2,
        _this5 = this;

    var _this$props = this.props,
        stacked = _this$props.stacked,
        justified = _this$props.justified,
        onSelect = _this$props.onSelect,
        propsRole = _this$props.role,
        propsNavbar = _this$props.navbar,
        pullRight = _this$props.pullRight,
        pullLeft = _this$props.pullLeft,
        className = _this$props.className,
        children = _this$props.children,
        navbarContext = _this$props.navbarContext,
        tabContainerContext = _this$props.tabContainerContext,
        props = _objectWithoutPropertiesLoose(_this$props, ["stacked", "justified", "onSelect", "role", "navbar", "pullRight", "pullLeft", "className", "children", "navbarContext", "tabContainerContext"]);

    var tabContainer = tabContainerContext;
    var role = propsRole || (tabContainer ? 'tablist' : null);

    var _this$getActiveProps3 = this.getActiveProps(),
        activeKey = _this$getActiveProps3.activeKey,
        activeHref = _this$getActiveProps3.activeHref;

    delete props.activeKey; // Accessed via this.getActiveProps().

    delete props.activeHref; // Accessed via this.getActiveProps().

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

     false ? 0 : void 0;

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'stacked')] = stacked, _extends2[prefix(bsProps, 'justified')] = justified, _extends2));

    var navbar = propsNavbar != null ? propsNavbar : navbarContext;
    var pullLeftClassName;
    var pullRightClassName;

    if (navbar) {
      var navbarProps = navbarContext || {
        bsClass: 'navbar'
      };
      classes[prefix(navbarProps, 'nav')] = true;
      pullRightClassName = prefix(navbarProps, 'right');
      pullLeftClassName = prefix(navbarProps, 'left');
    } else {
      pullRightClassName = 'pull-right';
      pullLeftClassName = 'pull-left';
    }

    classes[pullRightClassName] = pullRight;
    classes[pullLeftClassName] = pullLeft;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", _extends({
      ref: this.containerRef
    }, elementProps, {
      role: role,
      className: classnames_default()(className, classes),
      __source: {
        fileName: Nav_jsxFileName,
        lineNumber: 314
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      var active = _this5.isActive(child, activeKey, activeHref);

      var childOnSelect = utils_createChainedFunction(child.props.onSelect, onSelect, navbar && navbar.onSelect, tabContainer && tabContainer.onSelect);
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, _extends({}, _this5.getTabProps(child, tabContainer, role, active, childOnSelect), {
        active: active,
        activeKey: activeKey,
        activeHref: activeHref,
        onSelect: childOnSelect
      }));
    }));
  };

  return Nav;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Nav.propTypes = Nav_propTypes;
Nav.defaultProps = Nav_defaultProps;

function NavWithContext(props) {
  var navbarContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_NavbarContext);
  var tabContainerContext = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_TabContainerContext);
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Nav, _extends({}, props, {
    navbarContext: navbarContext,
    tabContainerContext: tabContainerContext,
    __source: {
      fileName: Nav_jsxFileName,
      lineNumber: 356
    },
    __self: this
  }));
}

/* harmony default export */ const src_Nav = (bsClass('nav', bsStyles(['tabs', 'pills'], NavWithContext)));
;// ./src/NavbarBrand.js



var NavbarBrand_jsxFileName = "/Users/harrison/react-bootstrap/src/NavbarBrand.js";





var NavbarBrand =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarBrand, _React$Component);

  function NavbarBrand() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarBrand.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'brand');

    if (external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(children)) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(children, {
        className: classnames_default()(children.props.className, className, bsClassName)
      });
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", _extends({}, props, {
      className: classnames_default()(className, bsClassName),
      __source: {
        fileName: NavbarBrand_jsxFileName,
        lineNumber: 21
      },
      __self: this
    }), children);
  };

  return NavbarBrand;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavbarBrand.contextType = src_NavbarContext;
/* harmony default export */ const src_NavbarBrand = (NavbarBrand);
;// ./src/NavbarCollapse.js



var NavbarCollapse_jsxFileName = "/Users/harrison/react-bootstrap/src/NavbarCollapse.js";





var NavbarCollapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarCollapse, _React$Component);

  function NavbarCollapse() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarCollapse.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'collapse');
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Collapse, _extends({
      in: navbarProps.expanded
    }, props, {
      __source: {
        fileName: NavbarCollapse_jsxFileName,
        lineNumber: 15
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: bsClassName,
      __source: {
        fileName: NavbarCollapse_jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, children));
  };

  return NavbarCollapse;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavbarCollapse.contextType = src_NavbarContext;
/* harmony default export */ const src_NavbarCollapse = (NavbarCollapse);
;// ./src/NavbarHeader.js



var NavbarHeader_jsxFileName = "/Users/harrison/react-bootstrap/src/NavbarHeader.js";





var NavbarHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarHeader, _React$Component);

  function NavbarHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };
    var bsClassName = prefix(navbarProps, 'header');
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, props, {
      className: classnames_default()(className, bsClassName),
      __source: {
        fileName: NavbarHeader_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }));
  };

  return NavbarHeader;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavbarHeader.contextType = src_NavbarContext;
/* harmony default export */ const src_NavbarHeader = (NavbarHeader);
;// ./src/NavbarToggle.js



var NavbarToggle_jsxFileName = "/Users/harrison/react-bootstrap/src/NavbarToggle.js";






var NavbarToggle_propTypes = {
  onClick: (prop_types_default()).func,

  /**
   * The toggle content, if left empty it will render the default toggle (seen above).
   */
  children: (prop_types_default()).node
};

var NavbarToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavbarToggle, _React$Component);

  function NavbarToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavbarToggle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        onClick = _this$props.onClick,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onClick", "className", "children"]);

    var navbarProps = this.context || {
      bsClass: 'navbar'
    };

    var buttonProps = _extends({
      type: 'button'
    }, props, {
      onClick: utils_createChainedFunction(onClick, navbarProps.onToggle),
      className: classnames_default()(className, prefix(navbarProps, 'toggle'), !navbarProps.expanded && 'collapsed')
    });

    if (children) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("button", _extends({}, buttonProps, {
        __source: {
          fileName: NavbarToggle_jsxFileName,
          lineNumber: 34
        },
        __self: this
      }), children);
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("button", _extends({}, buttonProps, {
      __source: {
        fileName: NavbarToggle_jsxFileName,
        lineNumber: 38
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __source: {
        fileName: NavbarToggle_jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, "Toggle navigation"), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "icon-bar",
      __source: {
        fileName: NavbarToggle_jsxFileName,
        lineNumber: 40
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "icon-bar",
      __source: {
        fileName: NavbarToggle_jsxFileName,
        lineNumber: 41
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "icon-bar",
      __source: {
        fileName: NavbarToggle_jsxFileName,
        lineNumber: 42
      },
      __self: this
    }));
  };

  return NavbarToggle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavbarToggle.propTypes = NavbarToggle_propTypes;
NavbarToggle.contextType = src_NavbarContext;
/* harmony default export */ const src_NavbarToggle = (NavbarToggle);
;// ./src/Navbar.js




var Navbar_jsxFileName = "/Users/harrison/react-bootstrap/src/Navbar.js";
// TODO: Remove this pragma once we upgrade eslint-config-airbnb.

/* eslint-disable react/no-multi-comp */














var Navbar_propTypes = {
  /**
   * Create a fixed navbar along the top of the screen, that scrolls with the
   * page
   */
  fixedTop: (prop_types_default()).bool,

  /**
   * Create a fixed navbar along the bottom of the screen, that scrolls with
   * the page
   */
  fixedBottom: (prop_types_default()).bool,

  /**
   * Create a full-width navbar that scrolls away with the page
   */
  staticTop: (prop_types_default()).bool,

  /**
   * An alternative dark visual style for the Navbar
   */
  inverse: (prop_types_default()).bool,

  /**
   * Allow the Navbar to fluidly adjust to the page or container width, instead
   * of at the predefined screen breakpoints
   */
  fluid: (prop_types_default()).bool,

  /**
   * Set a custom element for this component.
   */
  componentClass: (elementType_default()),

  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @controllable expanded
   */
  onToggle: (prop_types_default()).func,

  /**
   * A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   *
   * For basic closing behavior after all `<Nav>` descendant onSelect events in
   * mobile viewports, try using collapseOnSelect.
   *
   * Note: If you are manually closing the navbar using this `OnSelect` prop,
   * ensure that you are setting `expanded` to false and not *toggling* between
   * true and false.
   */
  onSelect: (prop_types_default()).func,

  /**
   * Sets `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>`. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * The onSelect callback should be used instead for more complex operations
   * that need to be executed after the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: (prop_types_default()).bool,

  /**
   * Explicitly set the visiblity of the navbar body
   *
   * @controllable onToggle
   */
  expanded: (prop_types_default()).bool,
  role: (prop_types_default()).string
};
var Navbar_defaultProps = {
  componentClass: 'nav',
  fixedTop: false,
  fixedBottom: false,
  staticTop: false,
  inverse: false,
  fluid: false,
  collapseOnSelect: false
};

var Navbar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Navbar, _React$Component);

  function Navbar(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCollapse = _this.handleCollapse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Navbar.prototype;

  _proto.handleCollapse = function handleCollapse() {
    var _this$props = this.props,
        onToggle = _this$props.onToggle,
        expanded = _this$props.expanded;

    if (expanded) {
      onToggle(false);
    }
  };

  _proto.handleToggle = function handleToggle() {
    var _this$props2 = this.props,
        onToggle = _this$props2.onToggle,
        expanded = _this$props2.expanded;
    onToggle(!expanded);
  };

  _proto.render = function render() {
    var _extends2;

    var _this$props3 = this.props,
        Component = _this$props3.componentClass,
        fixedTop = _this$props3.fixedTop,
        fixedBottom = _this$props3.fixedBottom,
        staticTop = _this$props3.staticTop,
        inverse = _this$props3.inverse,
        fluid = _this$props3.fluid,
        className = _this$props3.className,
        children = _this$props3.children,
        props = _objectWithoutPropertiesLoose(_this$props3, ["componentClass", "fixedTop", "fixedBottom", "staticTop", "inverse", "fluid", "className", "children"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['expanded', 'onToggle', 'onSelect', 'collapseOnSelect']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1]; // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one


    if (elementProps.role === undefined && Component !== 'nav') {
      elementProps.role = 'navigation';
    }

    if (inverse) {
      bsProps.bsStyle = Style.INVERSE;
    }

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'fixed-top')] = fixedTop, _extends2[prefix(bsProps, 'fixed-bottom')] = fixedBottom, _extends2[prefix(bsProps, 'static-top')] = staticTop, _extends2));

    var _this$props4 = this.props,
        bsClass = _this$props4.bsClass,
        expanded = _this$props4.expanded,
        onSelect = _this$props4.onSelect,
        collapseOnSelect = _this$props4.collapseOnSelect;
    var navbarContext = {
      bsClass: bsClass,
      expanded: expanded,
      onToggle: this.handleToggle,
      onSelect: utils_createChainedFunction(onSelect, collapseOnSelect ? this.handleCollapse : null)
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_NavbarContext.Provider, {
      value: navbarContext,
      __source: {
        fileName: Navbar_jsxFileName,
        lineNumber: 186
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Navbar_jsxFileName,
        lineNumber: 187
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Grid, {
      fluid: fluid,
      __source: {
        fileName: Navbar_jsxFileName,
        lineNumber: 188
      },
      __self: this
    }, children)));
  };

  return Navbar;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Navbar.propTypes = Navbar_propTypes;
Navbar.defaultProps = Navbar_defaultProps;
bsClass('navbar', Navbar);
var UncontrollableNavbar = uncontrollable_default()(Navbar, {
  expanded: 'onToggle'
});

function createSimpleWrapper(tag, suffix, displayName) {
  var Wrapper = function Wrapper(_ref) {
    var _ref$componentClass = _ref.componentClass,
        Component = _ref$componentClass === void 0 ? tag : _ref$componentClass,
        className = _ref.className,
        _ref$pullRight = _ref.pullRight,
        pullRight = _ref$pullRight === void 0 ? false : _ref$pullRight,
        _ref$pullLeft = _ref.pullLeft,
        pullLeft = _ref$pullLeft === void 0 ? false : _ref$pullLeft,
        props = _objectWithoutPropertiesLoose(_ref, ["componentClass", "className", "pullRight", "pullLeft"]);

    var navbarProps = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useContext)(src_NavbarContext) || {
      bsClass: 'navbar'
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, props, {
      className: classnames_default()(className, prefix(navbarProps, suffix), pullRight && prefix(navbarProps, 'right'), pullLeft && prefix(navbarProps, 'left')),
      __source: {
        fileName: Navbar_jsxFileName,
        lineNumber: 213
      },
      __self: this
    }));
  };

  Wrapper.displayName = displayName;
  Wrapper.propTypes = {
    componentClass: (elementType_default()),
    pullRight: (prop_types_default()).bool,
    pullLeft: (prop_types_default()).bool
  };
  return Wrapper;
}

UncontrollableNavbar.Brand = src_NavbarBrand;
UncontrollableNavbar.Header = src_NavbarHeader;
UncontrollableNavbar.Toggle = src_NavbarToggle;
UncontrollableNavbar.Collapse = src_NavbarCollapse;
UncontrollableNavbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
UncontrollableNavbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
UncontrollableNavbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink'); // Set bsStyles here so they can be overridden.

/* harmony default export */ const src_Navbar = (bsStyles([Style.DEFAULT, Style.INVERSE], Style.DEFAULT, UncontrollableNavbar));
;// ./src/NavDropdown.js



var NavDropdown_jsxFileName = "/Users/harrison/react-bootstrap/src/NavDropdown.js";







var NavDropdown_propTypes = _extends({}, src_Dropdown.propTypes, {
  // Toggle props.
  title: (prop_types_default()).node.isRequired,
  noCaret: (prop_types_default()).bool,
  active: (prop_types_default()).bool,
  activeKey: (prop_types_default()).any,
  activeHref: (prop_types_default()).string,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: (prop_types_default()).node
});

var NavDropdown =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavDropdown, _React$Component);

  function NavDropdown() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavDropdown.prototype;

  _proto.isActive = function isActive(_ref, activeKey, activeHref) {
    var _this = this;

    var props = _ref.props;

    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    if (ValidComponentChildren.some(props.children, function (child) {
      return _this.isActive(child, activeKey, activeHref);
    })) {
      return true;
    }

    return props.active;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        title = _this$props.title,
        activeKey = _this$props.activeKey,
        activeHref = _this$props.activeHref,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["title", "activeKey", "activeHref", "className", "style", "children"]);

    var active = this.isActive(this, activeKey, activeHref);
    delete props.active; // Accessed via this.isActive().

    delete props.eventKey; // Accessed via this.isActive().

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        toggleProps = _splitComponentProps[1]; // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.


    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, _extends({}, dropdownProps, {
      componentClass: "li",
      className: classnames_default()(className, {
        active: active
      }),
      style: style,
      __source: {
        fileName: NavDropdown_jsxFileName,
        lineNumber: 71
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Toggle, _extends({}, toggleProps, {
      useAnchor: true,
      __source: {
        fileName: NavDropdown_jsxFileName,
        lineNumber: 77
      },
      __self: this
    }), title), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Menu, {
      __source: {
        fileName: NavDropdown_jsxFileName,
        lineNumber: 81
      },
      __self: this
    }, ValidComponentChildren.map(children, function (child) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
        active: _this2.isActive(child, activeKey, activeHref)
      });
    })));
  };

  return NavDropdown;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavDropdown.propTypes = NavDropdown_propTypes;
/* harmony default export */ const src_NavDropdown = (NavDropdown);
;// ./src/NavItem.js




var NavItem_jsxFileName = "/Users/harrison/react-bootstrap/src/NavItem.js";





var NavItem_propTypes = {
  active: (prop_types_default()).bool,
  disabled: (prop_types_default()).bool,
  role: (prop_types_default()).string,
  href: (prop_types_default()).string,
  onClick: (prop_types_default()).func,
  onSelect: (prop_types_default()).func,
  eventKey: (prop_types_default()).any
};
var NavItem_defaultProps = {
  active: false,
  disabled: false
};

var NavItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NavItem, _React$Component);

  function NavItem(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = NavItem.prototype;

  _proto.handleClick = function handleClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        disabled = _this$props.disabled,
        onClick = _this$props.onClick,
        className = _this$props.className,
        style = _this$props.style,
        props = _objectWithoutPropertiesLoose(_this$props, ["active", "disabled", "onClick", "className", "style"]);

    delete props.onSelect;
    delete props.eventKey; // These are injected down by `<Nav>` for building `<SubNav>`s.

    delete props.activeKey;
    delete props.activeHref;

    if (!props.role) {
      if (props.href === '#') {
        props.role = 'button';
      }
    } else if (props.role === 'tab') {
      props['aria-selected'] = active;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
      role: "presentation",
      className: classnames_default()(className, {
        active: active,
        disabled: disabled
      }),
      style: style,
      __source: {
        fileName: NavItem_jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, _extends({}, props, {
      disabled: disabled,
      onClick: utils_createChainedFunction(onClick, this.handleClick),
      __source: {
        fileName: NavItem_jsxFileName,
        lineNumber: 72
      },
      __self: this
    })));
  };

  return NavItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

NavItem.propTypes = NavItem_propTypes;
NavItem.defaultProps = NavItem_defaultProps;
/* harmony default export */ const src_NavItem = (NavItem);
;// ./node_modules/@restart/hooks/esm/useCallbackRef.js

/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */

function useCallbackRef() {
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(null);
}
;// ./node_modules/@restart/hooks/esm/useMergedRefs.js


const toFnRef = ref => !ref || typeof ref === 'function' ? ref : value => {
  ref.current = value;
};

function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return value => {
    if (a) a(value);
    if (b) b(value);
  };
}
/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */

function useMergedRefs(refA, refB) {
  return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}

/* harmony default export */ const esm_useMergedRefs = (useMergedRefs);
;// ./node_modules/@popperjs/core/lib/enums.js
var enums_top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [enums_top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements =
/*#__PURE__*/
basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var enums_placements =
/*#__PURE__*/
[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
;// ./node_modules/@restart/hooks/esm/useSafeState.js


/**
 * `useSafeState` takes the return value of a `useState` hook and wraps the
 * setter to prevent updates onces the component has unmounted. Can used
 * with `useMergeState` and `useStateAsync` as well
 *
 * @param state The return value of a useStateHook
 *
 * ```ts
 * const [show, setShow] = useSafeState(useState(true));
 * ```
 */

function useSafeState(state) {
  const isMounted = useMounted();
  return [state[0], (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(nextState => {
    if (!isMounted()) return;
    return state[1](nextState);
  }, [isMounted, state[1]])];
}

/* harmony default export */ const esm_useSafeState = (useSafeState);
;// ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js


function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}


;// ./node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
;// ./node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/contains.js

function dom_utils_contains_contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js

function getComputedStyle_getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
;// ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js








function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle_getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle_getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle_getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle_getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle_getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
;// ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
;// ./node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
;// ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
;// ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
;// ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
;// ./node_modules/@popperjs/core/lib/modifiers/arrow.js








 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? enums_top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!dom_utils_contains_contains(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_arrow = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});
;// ./node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
}
;// ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = enums_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle_getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === enums_top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_computeStyles = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});
;// ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function eventListeners_effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const eventListeners = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: eventListeners_effect,
  data: {}
});
;// ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
;// ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var getOppositeVariationPlacement_hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return getOppositeVariationPlacement_hash[matched];
  });
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js




function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle_getComputedStyle(body || html).direction === 'rtl') {
    x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle_getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}
;// ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}
;// ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js















function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle_getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && dom_utils_contains_contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
;// ./node_modules/@popperjs/core/lib/utils/computeOffsets.js




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case enums_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
;// ./node_modules/@popperjs/core/lib/utils/detectOverflow.js








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [enums_top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
;// ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
;// ./node_modules/@popperjs/core/lib/modifiers/flip.js






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [enums_top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_flip = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});
;// ./node_modules/@popperjs/core/lib/modifiers/hide.js



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [enums_top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_hide = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});
;// ./node_modules/@popperjs/core/lib/modifiers/offset.js

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = enums_placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_offset = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});
;// ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_popperOffsets = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});
;// ./node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
;// ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? enums_top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? enums_top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [enums_top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_preventOverflow = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});
;// ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js




function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
;// ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
;// ./node_modules/@popperjs/core/lib/utils/orderModifiers.js
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
;// ./node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
;// ./node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
;// ./node_modules/@popperjs/core/lib/createPopper.js









var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper =
/*#__PURE__*/
(/* unused pure expression or super */ null && (popperGenerator())); // eslint-disable-next-line import/no-unused-modules


;// ./node_modules/react-overlays/esm/popper.js









 // For the common JS build we will turn this file into a bundle with no imports.
// This is b/c the Popper lib is all esm files, and would break in a common js only environment

var popper_createPopper = popperGenerator({
  defaultModifiers: [modifiers_hide, modifiers_popperOffsets, modifiers_computeStyles, eventListeners, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow]
});

;// ./node_modules/react-overlays/esm/usePopper.js






var initialPopperStyles = function initialPopperStyles(position) {
  return {
    position: position,
    top: '0',
    left: '0',
    opacity: '0',
    pointerEvents: 'none'
  };
};

var disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false
}; // In order to satisfy the current usage of options, including undefined

var ariaDescribedByModifier = {
  name: 'ariaDescribedBy',
  enabled: true,
  phase: 'afterWrite',
  effect: function effect(_ref) {
    var state = _ref.state;
    return function () {
      var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper;

      if ('removeAttribute' in reference) {
        var ids = (reference.getAttribute('aria-describedby') || '').split(',').filter(function (id) {
          return id.trim() !== popper.id;
        });
        if (!ids.length) reference.removeAttribute('aria-describedby');else reference.setAttribute('aria-describedby', ids.join(','));
      }
    };
  },
  fn: function fn(_ref2) {
    var _popper$getAttribute;

    var state = _ref2.state;
    var _state$elements2 = state.elements,
        popper = _state$elements2.popper,
        reference = _state$elements2.reference;
    var role = (_popper$getAttribute = popper.getAttribute('role')) == null ? void 0 : _popper$getAttribute.toLowerCase();

    if (popper.id && role === 'tooltip' && 'setAttribute' in reference) {
      var ids = reference.getAttribute('aria-describedby');

      if (ids && ids.split(',').indexOf(popper.id) !== -1) {
        return;
      }

      reference.setAttribute('aria-describedby', ids ? ids + "," + popper.id : popper.id);
    }
  }
};
var EMPTY_MODIFIERS = [];
/**
 * Position an element relative some reference element using Popper.js
 *
 * @param referenceElement
 * @param popperElement
 * @param {object}      options
 * @param {object=}     options.modifiers Popper.js modifiers
 * @param {boolean=}    options.enabled toggle the popper functionality on/off
 * @param {string=}     options.placement The popper element placement relative to the reference element
 * @param {string=}     options.strategy the positioning strategy
 * @param {boolean=}    options.eventsEnabled have Popper listen on window resize events to reposition the element
 * @param {function=}   options.onCreate called when the popper is created
 * @param {function=}   options.onUpdate called when the popper is updated
 *
 * @returns {UsePopperState} The popper state
 */

function usePopper(referenceElement, popperElement, _temp) {
  var _ref3 = _temp === void 0 ? {} : _temp,
      _ref3$enabled = _ref3.enabled,
      enabled = _ref3$enabled === void 0 ? true : _ref3$enabled,
      _ref3$placement = _ref3.placement,
      placement = _ref3$placement === void 0 ? 'bottom' : _ref3$placement,
      _ref3$strategy = _ref3.strategy,
      strategy = _ref3$strategy === void 0 ? 'absolute' : _ref3$strategy,
      _ref3$modifiers = _ref3.modifiers,
      modifiers = _ref3$modifiers === void 0 ? EMPTY_MODIFIERS : _ref3$modifiers,
      config = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_ref3, ["enabled", "placement", "strategy", "modifiers"]);

  var popperInstanceRef = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useRef)();
  var update = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    var _popperInstanceRef$cu;

    (_popperInstanceRef$cu = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu.update();
  }, []);
  var forceUpdate = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useCallback)(function () {
    var _popperInstanceRef$cu2;

    (_popperInstanceRef$cu2 = popperInstanceRef.current) == null ? void 0 : _popperInstanceRef$cu2.forceUpdate();
  }, []);

  var _useSafeState = esm_useSafeState((0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)({
    placement: placement,
    update: update,
    forceUpdate: forceUpdate,
    attributes: {},
    styles: {
      popper: initialPopperStyles(strategy),
      arrow: {}
    }
  })),
      popperState = _useSafeState[0],
      setState = _useSafeState[1];

  var updateModifier = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useMemo)(function () {
    return {
      name: 'updateStateModifier',
      enabled: true,
      phase: 'write',
      requires: ['computeStyles'],
      fn: function fn(_ref4) {
        var state = _ref4.state;
        var styles = {};
        var attributes = {};
        Object.keys(state.elements).forEach(function (element) {
          styles[element] = state.styles[element];
          attributes[element] = state.attributes[element];
        });
        setState({
          state: state,
          styles: styles,
          attributes: attributes,
          update: update,
          forceUpdate: forceUpdate,
          placement: state.placement
        });
      }
    };
  }, [update, forceUpdate, setState]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!popperInstanceRef.current || !enabled) return;
    popperInstanceRef.current.setOptions({
      placement: placement,
      strategy: strategy,
      modifiers: [].concat(modifiers, [updateModifier, disabledApplyStylesModifier])
    }); // intentionally NOT re-running on new modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy, placement, updateModifier, enabled]);
  (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useEffect)(function () {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    popperInstanceRef.current = popper_createPopper(referenceElement, popperElement, extends_extends({}, config, {
      placement: placement,
      strategy: strategy,
      modifiers: [].concat(modifiers, [ariaDescribedByModifier, updateModifier])
    }));
    return function () {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;
        setState(function (s) {
          return extends_extends({}, s, {
            attributes: {},
            styles: {
              popper: initialPopperStyles(strategy)
            }
          });
        });
      }
    }; // This is only run once to _create_ the popper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, referenceElement, popperElement]);
  return popperState;
}

/* harmony default export */ const esm_usePopper = (usePopper);
;// ./node_modules/react-overlays/esm/mergeOptionsWithPopperConfig.js

function toModifierMap(modifiers) {
  var result = {};

  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  } // eslint-disable-next-line no-unused-expressions


  modifiers == null ? void 0 : modifiers.forEach(function (m) {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map) {
  if (map === void 0) {
    map = {};
  }

  if (Array.isArray(map)) return map;
  return Object.keys(map).map(function (k) {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig(_ref) {
  var _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;

  var enabled = _ref.enabled,
      enableEvents = _ref.enableEvents,
      placement = _ref.placement,
      flip = _ref.flip,
      offset = _ref.offset,
      fixed = _ref.fixed,
      containerPadding = _ref.containerPadding,
      arrowElement = _ref.arrowElement,
      _ref$popperConfig = _ref.popperConfig,
      popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig;
  var modifiers = toModifierMap(popperConfig.modifiers);
  return extends_extends({}, popperConfig, {
    placement: placement,
    enabled: enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray(extends_extends({}, modifiers, {
      eventListeners: {
        enabled: enableEvents
      },
      preventOverflow: extends_extends({}, modifiers.preventOverflow, {
        options: containerPadding ? extends_extends({
          padding: containerPadding
        }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options
      }),
      offset: {
        options: extends_extends({
          offset: offset
        }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options)
      },
      arrow: extends_extends({}, modifiers.arrow, {
        enabled: !!arrowElement,
        options: extends_extends({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, {
          element: arrowElement
        })
      }),
      flip: extends_extends({
        enabled: !!flip
      }, modifiers.flip)
    }))
  });
}
;// ./node_modules/react-overlays/esm/Overlay.js












/**
 * Built on top of `Popper.js`, the overlay component is
 * great for custom tooltip overlays.
 */

var Overlay =
/*#__PURE__*/
external_root_React_commonjs2_react_commonjs_react_amd_react_default().forwardRef(function (props, outerRef) {
  var flip = props.flip,
      offset = props.offset,
      placement = props.placement,
      _props$containerPaddi = props.containerPadding,
      containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi,
      _props$popperConfig = props.popperConfig,
      popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig,
      Transition = props.transition;

  var _useCallbackRef = useCallbackRef(),
      rootElement = _useCallbackRef[0],
      attachRef = _useCallbackRef[1];

  var _useCallbackRef2 = useCallbackRef(),
      arrowElement = _useCallbackRef2[0],
      attachArrowRef = _useCallbackRef2[1];

  var mergedRef = esm_useMergedRefs(attachRef, outerRef);
  var container = useWaitForDOMRef(props.container);
  var target = useWaitForDOMRef(props.target);

  var _useState = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.useState)(!props.show),
      exited = _useState[0],
      setExited = _useState[1];

  var _usePopper = esm_usePopper(target, rootElement, mergeOptionsWithPopperConfig({
    placement: placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip: flip,
    offset: offset,
    arrowElement: arrowElement,
    popperConfig: popperConfig
  })),
      styles = _usePopper.styles,
      attributes = _usePopper.attributes,
      popper = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_usePopper, ["styles", "attributes"]);

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }

  var handleHidden = function handleHidden() {
    setExited(true);

    if (props.onExited) {
      props.onExited.apply(props, arguments);
    }
  }; // Don't un-render the overlay while it's transitioning out.


  var mountOverlay = props.show || Transition && !exited;
  esm_useRootClose(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  var child = props.children(extends_extends({}, popper, {
    show: !!props.show,
    props: extends_extends({}, attributes.popper, {
      style: styles.popper,
      ref: mergedRef
    }),
    arrowProps: extends_extends({}, attributes.arrow, {
      style: styles.arrow,
      ref: attachArrowRef
    })
  }));

  if (Transition) {
    var onExit = props.onExit,
        onExiting = props.onExiting,
        onEnter = props.onEnter,
        onEntering = props.onEntering,
        onEntered = props.onEntered;
    child =
    /*#__PURE__*/
    external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
      "in": props.show,
      appear: true,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, child);
  }

  return container ?
  /*#__PURE__*/
  external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal(child, container) : null;
});
Overlay.displayName = 'Overlay';
Overlay.propTypes = {
  /**
   * Set the visibility of the Overlay
   */
  show: (node_modules_prop_types_default()).bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: node_modules_prop_types_default().oneOf(enums_placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: (node_modules_prop_types_default()).any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: (node_modules_prop_types_default()).any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: (node_modules_prop_types_default()).bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   update: () => void,
   *   forceUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *     [string]: string | number,
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     [string]: string | number,
   *   },
   * }) => React.Element}
   */
  children: (node_modules_prop_types_default()).func.isRequired,

  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: (node_modules_prop_types_default()).number,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: (node_modules_prop_types_default()).object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: (node_modules_prop_types_default()).bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: node_modules_prop_types_default().oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: (node_modules_prop_types_default()).bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (props.rootClose) {
      var _PropTypes$func;

      return (_PropTypes$func = (node_modules_prop_types_default()).func).isRequired.apply(_PropTypes$func, [props].concat(args));
    }

    return node_modules_prop_types_default().func.apply((node_modules_prop_types_default()), [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  // @ts-ignore
  transition: (node_modules_prop_types_default()).elementType,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: (node_modules_prop_types_default()).func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: (node_modules_prop_types_default()).func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: (node_modules_prop_types_default()).func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: (node_modules_prop_types_default()).func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: (node_modules_prop_types_default()).func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: (node_modules_prop_types_default()).func
};
/* harmony default export */ const esm_Overlay = (Overlay);
;// ./src/Overlay.js



var Overlay_jsxFileName = "/Users/harrison/react-bootstrap/src/Overlay.js";







var Overlay_propTypes = _extends({}, esm_Overlay.propTypes, {
  /**
   * Set the visibility of the Overlay
   */
  show: (prop_types_default()).bool,

  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: (prop_types_default()).bool,

  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: (prop_types_default()).func,

  /**
   * Use animation
   */
  animation: prop_types_default().oneOfType([(prop_types_default()).bool, (elementType_default())]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: (prop_types_default()).func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: (prop_types_default()).func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: (prop_types_default()).func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: (prop_types_default()).func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: (prop_types_default()).func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: (prop_types_default()).func,

  /**
   * Sets the direction of the Overlay.
   */
  placement: prop_types_default().oneOf(['top', 'right', 'bottom', 'left'])
});

var Overlay_defaultProps = {
  animation: src_Fade,
  rootClose: false,
  show: false,
  placement: 'right'
};

var Overlay_Overlay =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Overlay, _React$Component);

  function Overlay() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Overlay.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        animation = _this$props.animation,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["animation", "children"]);

    var transition = animation === true ? src_Fade : animation || null;
    var child;

    if (!transition) {
      child = (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, {
        className: classnames_default()(children.props.className, 'in')
      });
    } else {
      child = children;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(esm_Overlay, _extends({}, props, {
      target: null,
      transition: transition,
      __source: {
        fileName: Overlay_jsxFileName,
        lineNumber: 91
      },
      __self: this
    }), function (_ref) {
      var overlayProps = _ref.props;
      return (// TODO do I need to do something with these other props?
        // return cloneElement(children, {
        //   ref: overlayProps.ref,
        //   className: transition ? children.props.className : classNames(children.props.className, 'in'),
        //   placement,
        //   style: {...children.props.style, ...overlayProps.style},
        // })
        external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
          ref: overlayProps.ref,
          style: {
            display: 'content'
          },
          __source: {
            fileName: Overlay_jsxFileName,
            lineNumber: 100
          },
          __self: this
        }, child)
      );
    });
  };

  return Overlay;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Overlay_Overlay.propTypes = Overlay_propTypes;
Overlay_Overlay.defaultProps = Overlay_defaultProps;
/* harmony default export */ const src_Overlay = (Overlay_Overlay);
// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js
var is_array = __webpack_require__(4683);
var is_array_default = /*#__PURE__*/__webpack_require__.n(is_array);
;// ./src/OverlayTrigger.js





var OverlayTrigger_jsxFileName = "/Users/harrison/react-bootstrap/src/OverlayTrigger.js";







/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */

function isOneOf(one, of) {
  if (is_array_default()(of)) {
    return of.indexOf(one) >= 0;
  }

  return one === of;
}

var triggerType = prop_types_default().oneOf(['click', 'hover', 'focus']);

var OverlayTrigger_propTypes = _extends({}, src_Overlay.propTypes, {
  /**
   * Specify which action or actions trigger Overlay visibility
   */
  trigger: prop_types_default().oneOfType([triggerType, prop_types_default().arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: (prop_types_default()).number,

  /**
   * A millisecond delay amount before showing the Overlay once triggered.
   */
  delayShow: (prop_types_default()).number,

  /**
   * A millisecond delay amount before hiding the Overlay once triggered.
   */
  delayHide: (prop_types_default()).number,
  // FIXME: This should be `defaultShow`.

  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultOverlayShown: (prop_types_default()).bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: (prop_types_default()).node.isRequired,

  /**
   * @private
   */
  onBlur: (prop_types_default()).func,

  /**
   * @private
   */
  onClick: (prop_types_default()).func,

  /**
   * @private
   */
  onFocus: (prop_types_default()).func,

  /**
   * @private
   */
  onMouseOut: (prop_types_default()).func,

  /**
   * @private
   */
  onMouseOver: (prop_types_default()).func,
  // Overridden props from `<Overlay>`.

  /**
   * @private
   */
  target: prop_types_default().oneOf([null]),

  /**
   * @private
   */
  onHide: prop_types_default().oneOf([null]),

  /**
   * @private
   */
  show: prop_types_default().oneOf([null])
});

var OverlayTrigger_defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
};

var OverlayTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(OverlayTrigger, _React$Component);

  function OverlayTrigger(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDelayedShow = _this.handleDelayedShow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDelayedHide = _this.handleDelayedHide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHide = _this.handleHide.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.handleMouseOver = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedShow, e, 'fromElement');
    };

    _this.handleMouseOut = function (e) {
      return _this.handleMouseOverOut(_this.handleDelayedHide, e, 'toElement');
    };

    _this.state = {
      show: props.defaultOverlayShown
    };
    _this.triggerRef = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createRef();
    return _this;
  }

  var _proto = OverlayTrigger.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  };

  _proto.handleDelayedHide = function handleDelayedHide() {
    var _this2 = this;

    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.show || this._hoverHideDelay != null) {
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(function () {
      _this2._hoverHideDelay = null;

      _this2.hide();
    }, delay);
  };

  _proto.handleDelayedShow = function handleDelayedShow() {
    var _this3 = this;

    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.show || this._hoverShowDelay != null) {
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(function () {
      _this3._hoverShowDelay = null;

      _this3.show();
    }, delay);
  };

  _proto.handleHide = function handleHide() {
    this.hide();
  }; // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.


  _proto.handleMouseOverOut = function handleMouseOverOut(handler, e, relatedNative) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !contains_default()(target, related)) {
      handler(e);
    }
  };

  _proto.handleToggle = function handleToggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  };

  _proto.hide = function hide() {
    this.setState({
      show: false
    });
  };

  _proto.makeOverlay = function makeOverlay(overlay, props) {
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Overlay, _extends({}, props, {
      show: this.state.show,
      onHide: this.handleHide,
      target: this.triggerRef,
      __source: {
        fileName: OverlayTrigger_jsxFileName,
        lineNumber: 208
      },
      __self: this
    }), overlay);
  };

  _proto.show = function show() {
    this.setState({
      show: true
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        trigger = _this$props.trigger,
        overlay = _this$props.overlay,
        children = _this$props.children,
        onBlur = _this$props.onBlur,
        onClick = _this$props.onClick,
        onFocus = _this$props.onFocus,
        onMouseOut = _this$props.onMouseOut,
        onMouseOver = _this$props.onMouseOver,
        props = _objectWithoutPropertiesLoose(_this$props, ["trigger", "overlay", "children", "onBlur", "onClick", "onFocus", "onMouseOut", "onMouseOver"]);

    delete props.delay;
    delete props.delayShow;
    delete props.delayHide;
    delete props.defaultOverlayShown;
    var child = external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children);
    var childProps = child.props;
    var triggerProps = {};

    if (this.state.show) {
      triggerProps['aria-describedby'] = overlay.props.id;
    } // FIXME: The logic here for passing through handlers on this component is
    // inconsistent. We shouldn't be passing any of these props through.


    triggerProps.onClick = utils_createChainedFunction(childProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      triggerProps.onClick = utils_createChainedFunction(triggerProps.onClick, this.handleToggle);
    }

    if (isOneOf('hover', trigger)) {
       false ? 0 : void 0;
      triggerProps.onMouseOver = utils_createChainedFunction(childProps.onMouseOver, onMouseOver, this.handleMouseOver);
      triggerProps.onMouseOut = utils_createChainedFunction(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = utils_createChainedFunction(childProps.onFocus, onFocus, this.handleDelayedShow);
      triggerProps.onBlur = utils_createChainedFunction(childProps.onBlur, onBlur, this.handleDelayedHide);
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Fragment, null, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      ref: this.triggerRef,
      style: {
        display: 'content'
      },
      __source: {
        fileName: OverlayTrigger_jsxFileName,
        lineNumber: 297
      },
      __self: this
    }, (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, triggerProps)), external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default().createPortal(this.makeOverlay(overlay, props), document.body));
  };

  return OverlayTrigger;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

OverlayTrigger.propTypes = OverlayTrigger_propTypes;
OverlayTrigger.defaultProps = OverlayTrigger_defaultProps;
/* harmony default export */ const src_OverlayTrigger = (OverlayTrigger);
;// ./src/PageHeader.js



var PageHeader_jsxFileName = "/Users/harrison/react-bootstrap/src/PageHeader.js";




var PageHeader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PageHeader, _React$Component);

  function PageHeader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PageHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: PageHeader_jsxFileName,
        lineNumber: 14
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("h1", {
      __source: {
        fileName: PageHeader_jsxFileName,
        lineNumber: 15
      },
      __self: this
    }, children));
  };

  return PageHeader;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_PageHeader = (bsClass('page-header', PageHeader));
;// ./src/PagerItem.js




var PagerItem_jsxFileName = "/Users/harrison/react-bootstrap/src/PagerItem.js";





var PagerItem_propTypes = {
  disabled: (prop_types_default()).bool,
  previous: (prop_types_default()).bool,
  next: (prop_types_default()).bool,
  onClick: (prop_types_default()).func,
  onSelect: (prop_types_default()).func,
  eventKey: (prop_types_default()).any
};
var PagerItem_defaultProps = {
  disabled: false,
  previous: false,
  next: false
};

var PagerItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PagerItem, _React$Component);

  function PagerItem(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = PagerItem.prototype;

  _proto.handleSelect = function handleSelect(e) {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        onSelect = _this$props.onSelect,
        eventKey = _this$props.eventKey;

    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, e);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        previous = _this$props2.previous,
        next = _this$props2.next,
        onClick = _this$props2.onClick,
        className = _this$props2.className,
        style = _this$props2.style,
        props = _objectWithoutPropertiesLoose(_this$props2, ["disabled", "previous", "next", "onClick", "className", "style"]);

    delete props.onSelect;
    delete props.eventKey;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
      className: classnames_default()(className, {
        disabled: disabled,
        previous: previous,
        next: next
      }),
      style: style,
      __source: {
        fileName: PagerItem_jsxFileName,
        lineNumber: 58
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SafeAnchor, _extends({}, props, {
      disabled: disabled,
      onClick: utils_createChainedFunction(onClick, this.handleSelect),
      __source: {
        fileName: PagerItem_jsxFileName,
        lineNumber: 62
      },
      __self: this
    })));
  };

  return PagerItem;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PagerItem.propTypes = PagerItem_propTypes;
PagerItem.defaultProps = PagerItem_defaultProps;
/* harmony default export */ const src_PagerItem = (PagerItem);
;// ./src/utils/deprecationWarning.js


var warned = {};

function deprecationWarning(oldname, newname, link) {
  var message;

  if (typeof oldname === 'object') {
    message = oldname.message;
  } else {
    message = oldname + " is deprecated. Use " + newname + " instead.";

    if (link) {
      message += "\nYou can read more about it at " + link;
    }
  }

  if (warned[message]) {
    return;
  }

   false ? 0 : void 0;
  warned[message] = true;
}

deprecationWarning.wrapper = function (Component) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(DeprecatedComponent, _Component);

      function DeprecatedComponent() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = DeprecatedComponent.prototype;

      _proto.componentWillMount = function componentWillMount() {
        deprecationWarning.apply(void 0, args);

        if (_Component.prototype.componentWillMount) {
          var _Component$prototype$;

          for (var _len2 = arguments.length, methodArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            methodArgs[_key2] = arguments[_key2];
          }

          (_Component$prototype$ = _Component.prototype.componentWillMount).call.apply(_Component$prototype$, [this].concat(methodArgs));
        }
      };

      return DeprecatedComponent;
    }(Component)
  );
};

/* harmony default export */ const utils_deprecationWarning = (deprecationWarning);
function _resetWarned() {
  warned = {};
}
;// ./src/PageItem.js


/* harmony default export */ const PageItem = (utils_deprecationWarning.wrapper(src_PagerItem, '`<PageItem>`', '`<Pager.Item>`'));
;// ./src/Pager.js



var Pager_jsxFileName = "/Users/harrison/react-bootstrap/src/Pager.js";







var Pager_propTypes = {
  onSelect: (prop_types_default()).func
};

var Pager =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Pager, _React$Component);

  function Pager() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Pager.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        onSelect = _this$props.onSelect,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["onSelect", "className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Pager_jsxFileName,
        lineNumber: 22
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
        onSelect: utils_createChainedFunction(child.props.onSelect, onSelect)
      });
    }));
  };

  return Pager;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Pager.propTypes = Pager_propTypes;
Pager.Item = src_PagerItem;
/* harmony default export */ const src_Pager = (bsClass('pager', Pager));
;// ./src/PaginationItem.js



var PaginationItem_jsxFileName = "/Users/harrison/react-bootstrap/src/PaginationItem.js";

/* eslint-disable react/no-multi-comp */




var PaginationItem_propTypes = {
  eventKey: (prop_types_default()).any,
  className: (prop_types_default()).string,
  onSelect: (prop_types_default()).func,
  disabled: (prop_types_default()).bool,
  active: (prop_types_default()).bool,
  activeLabel: (prop_types_default()).string.isRequired
};
var PaginationItem_defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
function PaginationItem(_ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["active", "disabled", "className", "style", "activeLabel", "children"]);

  var Component = active || disabled ? 'span' : src_SafeAnchor;
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", {
    style: style,
    className: classnames_default()(className, {
      active: active,
      disabled: disabled
    }),
    __source: {
      fileName: PaginationItem_jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({
    disabled: disabled
  }, props, {
    __source: {
      fileName: PaginationItem_jsxFileName,
      lineNumber: 35
    },
    __self: this
  }), children, active && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
    className: "sr-only",
    __source: {
      fileName: PaginationItem_jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, activeLabel)));
}
PaginationItem.propTypes = PaginationItem_propTypes;
PaginationItem.defaultProps = PaginationItem_defaultProps;

function createButton(name, defaultValue, label) {
  var _class, _temp;

  if (label === void 0) {
    label = name;
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          disabled = _this$props.disabled,
          children = _this$props.children,
          className = _this$props.className,
          props = _objectWithoutPropertiesLoose(_this$props, ["disabled", "children", "className"]);

      var Component = disabled ? 'span' : src_SafeAnchor;
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("li", _extends({
        "aria-label": label,
        className: classnames_default()(className, {
          disabled: disabled
        })
      }, props, {
        __source: {
          fileName: PaginationItem_jsxFileName,
          lineNumber: 55
        },
        __self: this
      }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, {
        __source: {
          fileName: PaginationItem_jsxFileName,
          lineNumber: 60
        },
        __self: this
      }, children || defaultValue));
    };

    return _class;
  }((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component), _class.displayName = name, _class.propTypes = {
    disabled: (prop_types_default()).bool
  }, _temp;
}

var First = createButton('First', "\xAB");
var Prev = createButton('Prev', "\u2039");
var Ellipsis = createButton('Ellipsis', "\u2026", 'More');
var Next = createButton('Next', "\u203A");
var Last = createButton('Last', "\xBB");
;// ./src/Pagination.js



var Pagination_jsxFileName = "/Users/harrison/react-bootstrap/src/Pagination.js";





var Pagination =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Pagination, _React$Component);

  function Pagination() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("ul", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Pagination_jsxFileName,
        lineNumber: 22
      },
      __self: this
    }), children);
  };

  return Pagination;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

bsClass('pagination', Pagination);
Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PaginationItem;
Pagination.Next = Next;
Pagination.Last = Last;
/* harmony default export */ const src_Pagination = (Pagination);
;// ./src/PanelContext.js

var PanelContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
PanelContext.displayName = 'PanelContext';
/* harmony default export */ const src_PanelContext = (PanelContext);
;// ./src/PanelCollapse.js


var PanelCollapse_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelCollapse.js";





var PanelCollapse_propTypes = {
  /**
   * Callback fired before the component expands
   */
  onEnter: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to expand
   */
  onEntering: (prop_types_default()).func,

  /**
   * Callback fired after the component has expanded
   */
  onEntered: (prop_types_default()).func,

  /**
   * Callback fired before the component collapses
   */
  onExit: (prop_types_default()).func,

  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: (prop_types_default()).func,

  /**
   * Callback fired after the component has collapsed
   */
  onExited: (prop_types_default()).func
};

var PanelCollapse =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelCollapse, _React$Component);

  function PanelCollapse() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelCollapse.prototype;

  _proto.render = function render() {
    var children = this.props.children;

    var _ref = this.context || {},
        headingId = _ref.headingId,
        bodyId = _ref.bodyId,
        _bsClass = _ref.bsClass,
        expanded = _ref.expanded;

    var _splitBsProps = splitBsProps(this.props),
        bsProps = _splitBsProps[0],
        props = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId && bodyId) {
      props.id = bodyId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Collapse, _extends({
      in: expanded
    }, props, {
      __source: {
        fileName: PanelCollapse_jsxFileName,
        lineNumber: 52
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'collapse'),
      __source: {
        fileName: PanelCollapse_jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, children));
  };

  return PanelCollapse;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelCollapse.propTypes = PanelCollapse_propTypes;
PanelCollapse.contextType = src_PanelContext;
/* harmony default export */ const src_PanelCollapse = (bsClass('panel', PanelCollapse));
;// ./src/PanelBody.js


var PanelBody_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelBody.js";






var PanelBody_propTypes = {
  /**
   * A convenience prop that renders a Collapse component around the Body for
   * situations when the parent Panel only contains a single Panel.Body child.
   *
   * renders:
   * ```jsx
   * <Panel.Collapse>
   *  <Panel.Body />
   * </Panel.Collapse>
   * ```
   */
  collapsible: (prop_types_default()).bool.isRequired
};
var PanelBody_defaultProps = {
  collapsible: false
};

var PanelBody =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelBody, _React$Component);

  function PanelBody() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelBody.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        collapsible = _this$props.collapsible;

    var _ref = this.context || {},
        _bsClass = _ref.bsClass;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(this.props, ['collapsible']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;
    var body = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'body')),
      __source: {
        fileName: PanelBody_jsxFileName,
        lineNumber: 38
      },
      __self: this
    }), children);

    if (collapsible) {
      body = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PanelCollapse, {
        __source: {
          fileName: PanelBody_jsxFileName,
          lineNumber: 44
        },
        __self: this
      }, body);
    }

    return body;
  };

  return PanelBody;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelBody.propTypes = PanelBody_propTypes;
PanelBody.defaultProps = PanelBody_defaultProps;
PanelBody.contextType = src_PanelContext;
/* harmony default export */ const src_PanelBody = (bsClass('panel', PanelBody));
// EXTERNAL MODULE: ./node_modules/react-prop-types/lib/elementType.js
var lib_elementType = __webpack_require__(4976);
;// ./src/PanelHeading.js



var PanelHeading_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelHeading.js";





var PanelHeading_propTypes = {
  componentClass: lib_elementType/* default */.A
};
var PanelHeading_defaultProps = {
  componentClass: 'div'
};

var PanelHeading =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelHeading, _React$Component);

  function PanelHeading() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelHeading.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "componentClass"]);

    var _ref = this.context || {},
        headingId = _ref.headingId,
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = headingId;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'heading')),
      __source: {
        fileName: PanelHeading_jsxFileName,
        lineNumber: 35
      },
      __self: this
    }), children);
  };

  return PanelHeading;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelHeading.propTypes = PanelHeading_propTypes;
PanelHeading.defaultProps = PanelHeading_defaultProps;
PanelHeading.contextType = src_PanelContext;
/* harmony default export */ const src_PanelHeading = (bsClass('panel', PanelHeading));
;// ./src/PanelToggle.js




var PanelToggle_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelToggle.js";







var PanelToggle_propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: (prop_types_default()).func,

  /**
   * You can use a custom element for this component
   */
  componentClass: lib_elementType/* default */.A
};
var PanelToggle_defaultProps = {
  componentClass: src_SafeAnchor
};

var PanelToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelToggle, _React$Component);

  function PanelToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = PanelToggle.prototype;

  _proto.handleToggle = function handleToggle(event) {
    var _ref = this.context || {},
        onToggle = _ref.onToggle;

    if (onToggle) {
      onToggle(event);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onClick = _this$props.onClick,
        className = _this$props.className,
        componentClass = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["onClick", "className", "componentClass"]);

    var _ref2 = this.context || {},
        expanded = _ref2.expanded,
        bodyId = _ref2.bodyId;

    var Component = componentClass;
    props.onClick = utils_createChainedFunction(onClick, this.handleToggle);
    props['aria-expanded'] = expanded;
    props.className = classnames_default()(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, props, {
      __source: {
        fileName: PanelToggle_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }));
  };

  return PanelToggle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelToggle.propTypes = PanelToggle_propTypes;
PanelToggle.defaultProps = PanelToggle_defaultProps;
PanelToggle.contextType = src_PanelContext;
/* harmony default export */ const src_PanelToggle = (PanelToggle);
;// ./src/PanelTitle.js



var PanelTitle_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelTitle.js";







var PanelTitle_propTypes = {
  componentClass: lib_elementType/* default */.A,

  /**
   * A convenience prop that renders the Panel.Title as a panel collapse toggle component
   * for the common use-case.
   */
  toggle: (prop_types_default()).bool
};
var PanelTitle_defaultProps = {
  componentClass: 'div'
};

var PanelTitle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelTitle, _React$Component);

  function PanelTitle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelTitle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        toggle = _this$props.toggle,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "toggle", "componentClass"]);

    var _ref = this.context || {},
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (toggle) {
      children = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PanelToggle, {
        __source: {
          fileName: PanelTitle_jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, children);
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'title')),
      __source: {
        fileName: PanelTitle_jsxFileName,
        lineNumber: 43
      },
      __self: this
    }), children);
  };

  return PanelTitle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelTitle.propTypes = PanelTitle_propTypes;
PanelTitle.defaultProps = PanelTitle_defaultProps;
PanelTitle.contextType = src_PanelContext;
/* harmony default export */ const src_PanelTitle = (bsClass('panel', PanelTitle));
;// ./src/PanelFooter.js


var PanelFooter_jsxFileName = "/Users/harrison/react-bootstrap/src/PanelFooter.js";





var PanelFooter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PanelFooter, _React$Component);

  function PanelFooter() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PanelFooter.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className;

    var _ref = this.context || {},
        _bsClass = _ref.bsClass;

    var _splitBsProps = splitBsProps(this.props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    bsProps.bsClass = _bsClass || bsProps.bsClass;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'footer')),
      __source: {
        fileName: PanelFooter_jsxFileName,
        lineNumber: 16
      },
      __self: this
    }), children);
  };

  return PanelFooter;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

PanelFooter.contextType = src_PanelContext;
/* harmony default export */ const src_PanelFooter = (bsClass('panel', PanelFooter));
;// ./src/Panel.js




var Panel_jsxFileName = "/Users/harrison/react-bootstrap/src/Panel.js";















var has = Object.prototype.hasOwnProperty;

var defaultGetId = function defaultGetId(id, type) {
  return id ? id + "--" + type : null;
};

var Panel_propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: (prop_types_default()).bool,

  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: (prop_types_default()).func,
  eventKey: (prop_types_default()).any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: (prop_types_default()).string
};

var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Panel, _React$Component);

  function Panel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleToggle = function (e) {
      var panelGroup = _this.context;
      var expanded = !_this.getExpanded();

      if (panelGroup && panelGroup.onToggle) {
        panelGroup.onToggle(_this.props.eventKey, expanded, e);
      } else {
        _this.props.onToggle(expanded, e);
      }
    };

    return _this;
  }

  var _proto = Panel.prototype;

  _proto.getExpanded = function getExpanded() {
    var panelGroup = this.context;

    if (panelGroup && has.call(panelGroup, 'activeKey')) {
       false ? 0 : void 0;
      return panelGroup.activeKey === this.props.eventKey;
    }

    return !!this.props.expanded;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(this.props, ['onToggle', 'eventKey', 'expanded']),
        bsProps = _splitBsPropsAndOmit[0],
        props = _splitBsPropsAndOmit[1];

    var _this$props2 = this.props,
        eventKey = _this$props2.eventKey,
        id = _this$props2.id;
    var idKey = eventKey == null ? id : eventKey;
    var ids;

    if (idKey !== null) {
      var panelGroup = this.context;
      var getId = panelGroup && panelGroup.getId || defaultGetId;
      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    var panelContext = _extends({}, ids, {
      bsClass: this.props.bsClass,
      expanded: this.getExpanded(),
      onToggle: this.handleToggle
    });

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_PanelContext.Provider, {
      value: panelContext,
      __source: {
        fileName: Panel_jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, props, {
      className: classnames_default()(className, getClassSet(bsProps)),
      __source: {
        fileName: Panel_jsxFileName,
        lineNumber: 111
      },
      __self: this
    }), children));
  };

  return Panel;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Panel.propTypes = Panel_propTypes;
Panel.contextType = src_PanelGroupContext;
var UncontrolledPanel = uncontrollable_default()(bsClass('panel', bsStyles(values_default()(State).concat([Style.DEFAULT, Style.PRIMARY]), Style.DEFAULT, Panel)), {
  expanded: 'onToggle'
});

assign_default()(UncontrolledPanel, {
  Heading: src_PanelHeading,
  Title: src_PanelTitle,
  Body: src_PanelBody,
  Footer: src_PanelFooter,
  Toggle: src_PanelToggle,
  Collapse: src_PanelCollapse
});

/* harmony default export */ const src_Panel = (UncontrolledPanel);
;// ./src/Popover.js



var Popover_jsxFileName = "/Users/harrison/react-bootstrap/src/Popover.js";





var Popover_propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: prop_types_default().oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "left" position value for the Popover.
   */
  positionLeft: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * Title content
   */
  title: (prop_types_default()).node
};
var Popover_defaultProps = {
  placement: 'right'
};

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Popover, _React$Component);

  function Popover() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popover.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        placement = _this$props.placement,
        positionTop = _this$props.positionTop,
        positionLeft = _this$props.positionLeft,
        arrowOffsetTop = _this$props.arrowOffsetTop,
        arrowOffsetLeft = _this$props.arrowOffsetLeft,
        title = _this$props.title,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "title", "className", "style", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

    var outerStyle = _extends({
      display: 'block',
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "tooltip",
      className: classnames_default()(className, classes),
      style: outerStyle,
      __source: {
        fileName: Popover_jsxFileName,
        lineNumber: 91
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: "arrow",
      style: arrowStyle,
      __source: {
        fileName: Popover_jsxFileName,
        lineNumber: 97
      },
      __self: this
    }), title && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("h3", {
      className: prefix(bsProps, 'title'),
      __source: {
        fileName: Popover_jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, title), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'content'),
      __source: {
        fileName: Popover_jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, children));
  };

  return Popover;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Popover.propTypes = Popover_propTypes;
Popover.defaultProps = Popover_defaultProps;
/* harmony default export */ const src_Popover = (bsClass('popover', Popover));
;// ./src/ProgressBar.js




var ProgressBar_jsxFileName = "/Users/harrison/react-bootstrap/src/ProgressBar.js";







var ROUND_PRECISION = 1000;
/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */

function getInvalidChildError(children) {
  var error = null;
  external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.forEach(children, function (child) {
    if (error) {
      return;
    }
    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */


    var element = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(ProgressBar, {
      __source: {
        fileName: ProgressBar_jsxFileName,
        lineNumber: 35
      },
      __self: this
    });
    if (child.type === element.type) return;
    var childIdentifier = external_root_React_commonjs2_react_commonjs_react_amd_react_default().isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = "Children of ProgressBar can contain only ProgressBar " + ("components. Found " + childIdentifier + ".");
  });
  return error;
}

var ProgressBar_propTypes = {
  min: (prop_types_default()).number,
  now: (prop_types_default()).number,
  max: (prop_types_default()).number,
  label: (prop_types_default()).node,
  srOnly: (prop_types_default()).bool,
  striped: (prop_types_default()).bool,
  active: (prop_types_default()).bool,
  children: (prop_types_default()).node,

  /**
   * @private
   */
  isChild: (prop_types_default()).bool
};
var ProgressBar_defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ProgressBar, _React$Component);

  function ProgressBar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressBar.prototype;

  _proto.renderProgressBar = function renderProgressBar(_ref) {
    var _extends2;

    var min = _ref.min,
        now = _ref.now,
        max = _ref.max,
        label = _ref.label,
        srOnly = _ref.srOnly,
        striped = _ref.striped,
        active = _ref.active,
        className = _ref.className,
        style = _ref.style,
        props = _objectWithoutPropertiesLoose(_ref, ["min", "now", "max", "label", "srOnly", "striped", "active", "className", "style"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {
      active: active
    }, _extends2[prefix(bsProps, 'striped')] = active || striped, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "progressbar",
      className: classnames_default()(className, classes),
      style: _extends({
        width: getPercentage(now, min, max) + "%"
      }, style),
      "aria-valuenow": now,
      "aria-valuemin": min,
      "aria-valuemax": max,
      __source: {
        fileName: ProgressBar_jsxFileName,
        lineNumber: 101
      },
      __self: this
    }), srOnly ? external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("span", {
      className: "sr-only",
      __source: {
        fileName: ProgressBar_jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, label) : label);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isChild = _this$props.isChild,
        props = _objectWithoutPropertiesLoose(_this$props, ["isChild"]);

    if (isChild) {
      return this.renderProgressBar(props);
    }

    var min = props.min,
        now = props.now,
        max = props.max,
        label = props.label,
        srOnly = props.srOnly,
        striped = props.striped,
        active = props.active,
        bsClass = props.bsClass,
        bsStyle = props.bsStyle,
        className = props.className,
        children = props.children,
        wrapperProps = _objectWithoutPropertiesLoose(props, ["min", "now", "max", "label", "srOnly", "striped", "active", "bsClass", "bsStyle", "className", "children"]);

    var childError = children ? getInvalidChildError(children) : null;

    if (childError) {
       false ? 0 : void 0;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, wrapperProps, {
      className: classnames_default()(className, 'progress'),
      __source: {
        fileName: ProgressBar_jsxFileName,
        lineNumber: 143
      },
      __self: this
    }), children ? ValidComponentChildren.map(children, function (child) {
      return (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(child, {
        isChild: true
      });
    }) : this.renderProgressBar({
      min: min,
      now: now,
      max: max,
      label: label,
      srOnly: srOnly,
      striped: striped,
      active: active,
      bsClass: bsClass,
      bsStyle: bsStyle
    }));
  };

  return ProgressBar;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ProgressBar.propTypes = ProgressBar_propTypes;
ProgressBar.defaultProps = ProgressBar_defaultProps;
/* harmony default export */ const src_ProgressBar = (bsClass('progress-bar', bsStyles(values_default()(State), ProgressBar)));
;// ./src/Radio.js



var Radio_jsxFileName = "/Users/harrison/react-bootstrap/src/Radio.js";

/* eslint-disable jsx-a11y/label-has-for */





var Radio_propTypes = {
  inline: (prop_types_default()).bool,
  disabled: (prop_types_default()).bool,
  title: (prop_types_default()).string,

  /**
   * Only valid if `inline` is not set.
   */
  validationState: prop_types_default().oneOf(['success', 'warning', 'error', null]),

  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Radio inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: (prop_types_default()).func
};
var Radio_defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

var Radio =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Radio, _React$Component);

  function Radio() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        inline = _this$props.inline,
        disabled = _this$props.disabled,
        validationState = _this$props.validationState,
        inputRef = _this$props.inputRef,
        className = _this$props.className,
        style = _this$props.style,
        title = _this$props.title,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["inline", "disabled", "validationState", "inputRef", "className", "style", "title", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var input = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", _extends({}, elementProps, {
      ref: inputRef,
      type: "radio",
      disabled: disabled,
      __source: {
        fileName: Radio_jsxFileName,
        lineNumber: 56
      },
      __self: this
    }));

    if (inline) {
      var _classes2;

      var _classes = (_classes2 = {}, _classes2[prefix(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2); // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.


       false ? 0 : void 0;
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", {
        className: classnames_default()(className, _classes),
        style: style,
        title: title,
        __source: {
          fileName: Radio_jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, input, children);
    }

    var classes = _extends({}, getClassSet(bsProps), {
      disabled: disabled
    });

    if (validationState) {
      classes["has-" + validationState] = true;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: classnames_default()(className, classes),
      style: style,
      __source: {
        fileName: Radio_jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("label", {
      title: title,
      __source: {
        fileName: Radio_jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, input, children));
  };

  return Radio;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Radio.propTypes = Radio_propTypes;
Radio.defaultProps = Radio_defaultProps;
/* harmony default export */ const src_Radio = (bsClass('radio', Radio));
;// ./src/ResponsiveEmbed.js



var ResponsiveEmbed_jsxFileName = "/Users/harrison/react-bootstrap/src/ResponsiveEmbed.js";




 // TODO: This should probably take a single `aspectRatio` prop.

var ResponsiveEmbed_propTypes = {
  /**
   * This component requires a single child element
   */
  children: (prop_types_default()).element.isRequired,

  /**
   * 16by9 aspect ratio
   */
  a16by9: (prop_types_default()).bool,

  /**
   * 4by3 aspect ratio
   */
  a4by3: (prop_types_default()).bool
};
var ResponsiveEmbed_defaultProps = {
  a16by9: false,
  a4by3: false
};

var ResponsiveEmbed =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ResponsiveEmbed, _React$Component);

  function ResponsiveEmbed() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ResponsiveEmbed.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        a16by9 = _this$props.a16by9,
        a4by3 = _this$props.a4by3,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["a16by9", "a4by3", "className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

     false ? 0 : void 0;
     false ? 0 : void 0;

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, '16by9')] = a16by9, _extends2[prefix(bsProps, '4by3')] = a4by3, _extends2));

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: classnames_default()(classes),
      __source: {
        fileName: ResponsiveEmbed_jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, (0,external_root_React_commonjs2_react_commonjs_react_amd_react_.cloneElement)(children, _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'item'))
    })));
  };

  return ResponsiveEmbed;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ResponsiveEmbed.propTypes = ResponsiveEmbed_propTypes;
ResponsiveEmbed.defaultProps = ResponsiveEmbed_defaultProps;
/* harmony default export */ const src_ResponsiveEmbed = (bsClass('embed-responsive', ResponsiveEmbed));
;// ./src/Row.js



var Row_jsxFileName = "/Users/harrison/react-bootstrap/src/Row.js";




var Row_propTypes = {
  componentClass: (elementType_default())
};
var Row_defaultProps = {
  componentClass: 'div'
};

var Row =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Row, _React$Component);

  function Row() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Row_jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  return Row;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Row.propTypes = Row_propTypes;
Row.defaultProps = Row_defaultProps;
/* harmony default export */ const src_Row = (bsClass('row', Row));
;// ./src/SplitToggle.js


var SplitToggle_jsxFileName = "/Users/harrison/react-bootstrap/src/SplitToggle.js";



var SplitToggle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SplitToggle, _React$Component);

  function SplitToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SplitToggle.prototype;

  _proto.render = function render() {
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_DropdownToggle, _extends({}, this.props, {
      useAnchor: false,
      noCaret: false,
      __source: {
        fileName: SplitToggle_jsxFileName,
        lineNumber: 7
      },
      __self: this
    }));
  };

  return SplitToggle;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

SplitToggle.defaultProps = src_DropdownToggle.defaultProps;
/* harmony default export */ const src_SplitToggle = (SplitToggle);
;// ./src/SplitButton.js



var SplitButton_jsxFileName = "/Users/harrison/react-bootstrap/src/SplitButton.js";







var SplitButton_propTypes = _extends({}, src_Dropdown.propTypes, {
  // Toggle props.
  bsStyle: (prop_types_default()).string,
  bsSize: (prop_types_default()).string,
  href: (prop_types_default()).string,
  onClick: (prop_types_default()).func,

  /**
   * The content of the split button.
   */
  title: (prop_types_default()).node.isRequired,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: (prop_types_default()).string,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: (prop_types_default()).node
});

var SplitButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SplitButton, _React$Component);

  function SplitButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SplitButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsSize = _this$props.bsSize,
        bsStyle = _this$props.bsStyle,
        title = _this$props.title,
        toggleLabel = _this$props.toggleLabel,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["bsSize", "bsStyle", "title", "toggleLabel", "children"]);

    var _splitComponentProps = splitComponentProps(props, src_Dropdown.ControlledComponent),
        dropdownProps = _splitComponentProps[0],
        buttonProps = _splitComponentProps[1];

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown, _extends({}, dropdownProps, {
      bsSize: bsSize,
      bsStyle: bsStyle,
      __source: {
        fileName: SplitButton_jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Button, _extends({}, buttonProps, {
      disabled: props.disabled,
      bsSize: bsSize,
      bsStyle: bsStyle,
      __source: {
        fileName: SplitButton_jsxFileName,
        lineNumber: 51
      },
      __self: this
    }), title), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_SplitToggle, {
      "aria-label": toggleLabel || title,
      bsSize: bsSize,
      bsStyle: bsStyle,
      __source: {
        fileName: SplitButton_jsxFileName,
        lineNumber: 59
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Dropdown.Menu, {
      __source: {
        fileName: SplitButton_jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, children));
  };

  return SplitButton;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

SplitButton.propTypes = SplitButton_propTypes;
SplitButton.Toggle = src_SplitToggle;
/* harmony default export */ const src_SplitButton = (SplitButton);
;// ./src/TabContainer.js


var TabContainer_jsxFileName = "/Users/harrison/react-bootstrap/src/TabContainer.js";




var TAB = 'tab';
var PANE = 'pane';
var TabContainer_idPropType = prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]);
var TabContainer_propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: function id(props) {
    var error = null;

    if (!props.generateChildId) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      error = TabContainer_idPropType.apply(void 0, [props].concat(args));

      if (!error && !props.id) {
        error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
      }
    }

    return error;
  },

  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: (prop_types_default()).func,

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: (prop_types_default()).func,

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: (prop_types_default()).any
};

var TabContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabContainer, _React$Component);

  function TabContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabContainer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    var _this$props2 = this.props,
        activeKey = _this$props2.activeKey,
        onSelect = _this$props2.onSelect,
        generateChildId = _this$props2.generateChildId,
        id = _this$props2.id;

    var getId = generateChildId || function (key, type) {
      return id ? id + "-" + type + "-" + key : null;
    };

    var tabContainerContext = {
      activeKey: activeKey,
      onSelect: onSelect,
      getTabId: function getTabId(key) {
        return getId(key, TAB);
      },
      getPaneId: function getPaneId(key) {
        return getId(key, PANE);
      }
    };
    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContainerContext.Provider, {
      value: tabContainerContext,
      __source: {
        fileName: TabContainer_jsxFileName,
        lineNumber: 84
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(external_root_React_commonjs2_react_commonjs_react_amd_react_default().Children.only(children), props));
  };

  return TabContainer;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

TabContainer.propTypes = TabContainer_propTypes;
/* harmony default export */ const src_TabContainer = (uncontrollable_default()(TabContainer, {
  activeKey: 'onSelect'
}));
;// ./src/TabContentContext.js

var TabContentContext = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createContext(undefined);
TabContentContext.displayName = 'TabContentContext';
/* harmony default export */ const src_TabContentContext = (TabContentContext);
;// ./src/TabContent.js




var TabContent_jsxFileName = "/Users/harrison/react-bootstrap/src/TabContent.js";







var TabContent_propTypes = {
  componentClass: (elementType_default()),

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: prop_types_default().oneOfType([(prop_types_default()).bool, (elementType_default())]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: (prop_types_default()).bool
};
var TabContent_defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

var TabContent =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabContent, _React$Component);

  function TabContent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handlePaneEnter = _this.handlePaneEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePaneExited = _this.handlePaneExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.

    _this.state = {
      activeKey: null,
      activeChild: null
    };
    return _this;
  }

  var _proto = TabContent.prototype;

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({
        activeKey: null,
        activeChild: null
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.isUnmounted = true;
  };

  _proto.getContainerActiveKey = function getContainerActiveKey() {
    var tabContainer = this.context;
    return tabContainer && tabContainer.activeKey;
  };

  _proto.handlePaneEnter = function handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    } // It's possible that this child should be transitioning out.


    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });
    return true;
  };

  _proto.handlePaneExited = function handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(function (_ref) {
      var activeChild = _ref.activeChild;

      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.componentClass,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["componentClass", "className"]);

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['animation', 'mountOnEnter', 'unmountOnExit']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var _this$props2 = this.props,
        bsClass = _this$props2.bsClass,
        animation = _this$props2.animation,
        mountOnEnter = _this$props2.mountOnEnter,
        unmountOnExit = _this$props2.unmountOnExit;
    var stateActiveKey = this.state.activeKey;
    var containerActiveKey = this.getContainerActiveKey();
    var activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
    var exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;
    var tabContentContext = {
      bsClass: bsClass,
      animation: animation,
      activeKey: activeKey,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit,
      onPaneEnter: this.handlePaneEnter,
      onPaneExited: this.handlePaneExited,
      exiting: exiting
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContentContext.Provider, {
      value: tabContentContext,
      __source: {
        fileName: TabContent_jsxFileName,
        lineNumber: 139
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, prefix(bsProps, 'content')),
      __source: {
        fileName: TabContent_jsxFileName,
        lineNumber: 140
      },
      __self: this
    })));
  };

  return TabContent;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

TabContent.propTypes = TabContent_propTypes;
TabContent.defaultProps = TabContent_defaultProps;
TabContent.contextType = src_TabContainerContext;
/* harmony default export */ const src_TabContent = (bsClass('tab', TabContent));
;// ./src/TabPane.js




var TabPane_jsxFileName = "/Users/harrison/react-bootstrap/src/TabPane.js";










var TabPane_propTypes = {
  /**
   * Uniquely identify the `<TabPane>` among its siblings.
   */
  eventKey: (prop_types_default()).any,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: prop_types_default().oneOfType([(prop_types_default()).bool, (elementType_default())]),

  /** @private * */
  id: (prop_types_default()).string,

  /** @private * */
  'aria-labelledby': (prop_types_default()).string,

  /**
   * If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   */
  bsClass: (prop_types_default()).string,

  /**
   * Transition onEnter callback when animation is not `false`
   */
  onEnter: (prop_types_default()).func,

  /**
   * Transition onEntering callback when animation is not `false`
   */
  onEntering: (prop_types_default()).func,

  /**
   * Transition onEntered callback when animation is not `false`
   */
  onEntered: (prop_types_default()).func,

  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: (prop_types_default()).func,

  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: (prop_types_default()).func,

  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: (prop_types_default()).func,

  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: (prop_types_default()).bool
};

var TabPane =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TabPane, _React$Component);

  function TabPane(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleEnter = _this.handleEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.in = false;
    return _this;
  }

  var _proto = TabPane.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.shouldBeIn()) {
      // In lieu of the action event firing.
      this.handleEnter();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.in) {
      if (!this.shouldBeIn()) {
        // We shouldn't be active any more. Notify the parent.
        this.handleExited();
      }
    } else if (this.shouldBeIn()) {
      // We are the active child. Notify the parent.
      this.handleEnter();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.in) {
      // In lieu of the action event firing.
      this.handleExited();
    }
  };

  _proto.getAnimation = function getAnimation() {
    if (this.props.animation != null) {
      return this.props.animation;
    }

    var tabContent = this.context;
    return tabContent && tabContent.animation;
  };

  _proto.handleEnter = function handleEnter() {
    var tabContent = this.context;

    if (!tabContent) {
      return;
    }

    this.in = tabContent.onPaneEnter(this, this.props.eventKey);
  };

  _proto.handleExited = function handleExited() {
    var tabContent = this.context;

    if (!tabContent) {
      return;
    }

    tabContent.onPaneExited(this);
    this.in = false;
  };

  _proto.isActive = function isActive() {
    var tabContent = this.context;
    var activeKey = tabContent && tabContent.activeKey;
    return this.props.eventKey === activeKey;
  };

  _proto.shouldBeIn = function shouldBeIn() {
    return this.getAnimation() && this.isActive();
  };

  _proto.renderPane = function renderPane(tabContainer) {
    var _this$props = this.props,
        eventKey = _this$props.eventKey,
        className = _this$props.className,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        onExited = _this$props.onExited,
        propsMountOnEnter = _this$props.mountOnEnter,
        propsUnmountOnExit = _this$props.unmountOnExit,
        props = _objectWithoutPropertiesLoose(_this$props, ["eventKey", "className", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit"]);

    var tabContent = this.context;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(props, ['animation']),
        bsProps = _splitBsPropsAndOmit[0],
        elementProps = _splitBsPropsAndOmit[1];

    var active = this.isActive();
    var animation = this.getAnimation();
    var mountOnEnter = propsMountOnEnter != null ? propsMountOnEnter : tabContent && tabContent.mountOnEnter;
    var unmountOnExit = propsUnmountOnExit != null ? propsUnmountOnExit : tabContent && tabContent.unmountOnExit;

    if (!active && !animation && unmountOnExit) {
      return null;
    }

    var Transition = animation === true ? src_Fade : animation || null;

    if (tabContent) {
      bsProps.bsClass = prefix(tabContent, 'pane');
    }

    var classes = _extends({}, getClassSet(bsProps), {
      active: active
    });

    if (tabContainer) {
       false ? 0 : void 0;
      elementProps.id = tabContainer.getPaneId(eventKey);
      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
    }

    var pane = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "tabpanel",
      "aria-hidden": !active,
      className: classnames_default()(className, classes),
      __source: {
        fileName: TabPane_jsxFileName,
        lineNumber: 222
      },
      __self: this
    }));

    if (Transition) {
      var exiting = tabContent && tabContent.exiting;
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Transition, {
        in: active && !exiting,
        onEnter: utils_createChainedFunction(this.handleEnter, onEnter),
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: utils_createChainedFunction(this.handleExited, onExited),
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        __source: {
          fileName: TabPane_jsxFileName,
          lineNumber: 234
        },
        __self: this
      }, pane);
    }

    return pane;
  };

  _proto.render = function render() {
    var _this2 = this;

    // Read the `<TabContainer>` context so we can generate accessible ids, then
    // override it with `null` so `<Nav>`s in `<TabPane>`s don't conflict with
    // the top level one.
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContainerContext.Consumer, {
      __source: {
        fileName: TabPane_jsxFileName,
        lineNumber: 258
      },
      __self: this
    }, function (tabContainer) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContainerContext.Provider, {
        value: null,
        __source: {
          fileName: TabPane_jsxFileName,
          lineNumber: 260
        },
        __self: this
      }, _this2.renderPane(tabContainer));
    });
  };

  return TabPane;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

TabPane.propTypes = TabPane_propTypes;
TabPane.contextType = src_TabContentContext;
/* harmony default export */ const src_TabPane = (bsClass('tab-pane', TabPane));
;// ./src/Tab.js


var Tab_jsxFileName = "/Users/harrison/react-bootstrap/src/Tab.js";






var Tab_propTypes = _extends({}, src_TabPane.propTypes, {
  disabled: (prop_types_default()).bool,
  title: (prop_types_default()).node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: (prop_types_default()).string
});

var Tab =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    var props = _extends({}, this.props); // These props are for the parent `<Tabs>` rather than the `<TabPane>`.


    delete props.title;
    delete props.disabled;
    delete props.tabClassName;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabPane, _extends({}, props, {
      __source: {
        fileName: Tab_jsxFileName,
        lineNumber: 30
      },
      __self: this
    }));
  };

  return Tab;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Tab.propTypes = Tab_propTypes;
Tab.Container = src_TabContainer;
Tab.Content = src_TabContent;
Tab.Pane = src_TabPane;
/* harmony default export */ const src_Tab = (Tab);
;// ./src/Table.js



var Table_jsxFileName = "/Users/harrison/react-bootstrap/src/Table.js";




var Table_propTypes = {
  striped: (prop_types_default()).bool,
  bordered: (prop_types_default()).bool,
  condensed: (prop_types_default()).bool,
  hover: (prop_types_default()).bool,
  responsive: (prop_types_default()).bool
};
var Table_defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false
};

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Table, _React$Component);

  function Table() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        striped = _this$props.striped,
        bordered = _this$props.bordered,
        condensed = _this$props.condensed,
        hover = _this$props.hover,
        responsive = _this$props.responsive,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["striped", "bordered", "condensed", "hover", "responsive", "className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[prefix(bsProps, 'striped')] = striped, _extends2[prefix(bsProps, 'bordered')] = bordered, _extends2[prefix(bsProps, 'condensed')] = condensed, _extends2[prefix(bsProps, 'hover')] = hover, _extends2));

    var table = external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("table", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Table_jsxFileName,
        lineNumber: 51
      },
      __self: this
    }));

    if (responsive) {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
        className: prefix(bsProps, 'responsive'),
        __source: {
          fileName: Table_jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, table);
    }

    return table;
  };

  return Table;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Table.propTypes = Table_propTypes;
Table.defaultProps = Table_defaultProps;
/* harmony default export */ const src_Table = (bsClass('table', Table));
;// ./src/Tabs.js



var Tabs_jsxFileName = "/Users/harrison/react-bootstrap/src/Tabs.js";











var Tabs_TabContainer = src_TabContainer.ControlledComponent;
var Tabs_propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: (prop_types_default()).any,

  /**
   * Navigation style
   */
  bsStyle: prop_types_default().oneOf(['tabs', 'pills']),

  /**
   * Sets a default animation strategy. Use `false` to disable, `true`
   * to enable the default `<Fade>` animation, or a react-transition-group
   * v2 `<Transition/>` component.
   */
  animation: prop_types_default().oneOfType([(prop_types_default()).bool, (elementType_default())]),
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: (prop_types_default()).func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: (prop_types_default()).bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: (prop_types_default()).bool
};
var Tabs_defaultProps = {
  bsStyle: 'tabs',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;
  ValidComponentChildren.forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tabs, _React$Component);

  function Tabs() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tabs.prototype;

  _proto.renderTab = function renderTab(child) {
    var _child$props = child.props,
        title = _child$props.title,
        eventKey = _child$props.eventKey,
        disabled = _child$props.disabled,
        tabClassName = _child$props.tabClassName;

    if (title == null) {
      return null;
    }

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_NavItem, {
      eventKey: eventKey,
      disabled: disabled,
      className: tabClassName,
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 91
      },
      __self: this
    }, title);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        onSelect = _this$props.onSelect,
        animation = _this$props.animation,
        mountOnEnter = _this$props.mountOnEnter,
        unmountOnExit = _this$props.unmountOnExit,
        bsClass = _this$props.bsClass,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        _this$props$activeKey = _this$props.activeKey,
        activeKey = _this$props$activeKey === void 0 ? getDefaultActiveKey(children) : _this$props$activeKey,
        props = _objectWithoutPropertiesLoose(_this$props, ["id", "onSelect", "animation", "mountOnEnter", "unmountOnExit", "bsClass", "className", "style", "children", "activeKey"]);

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Tabs_TabContainer, {
      id: id,
      activeKey: activeKey,
      onSelect: onSelect,
      className: className,
      style: style,
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 120
      },
      __self: this
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Nav, _extends({}, props, {
      role: "tablist",
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 121
      },
      __self: this
    }), ValidComponentChildren.map(children, this.renderTab)), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_TabContent, {
      bsClass: bsClass,
      animation: animation,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit,
      __source: {
        fileName: Tabs_jsxFileName,
        lineNumber: 125
      },
      __self: this
    }, children)));
  };

  return Tabs;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Tabs.propTypes = Tabs_propTypes;
Tabs.defaultProps = Tabs_defaultProps;
bsClass('tab', Tabs);
/* harmony default export */ const src_Tabs = (uncontrollable_default()(Tabs, {
  activeKey: 'onSelect'
}));
;// ./src/Thumbnail.js



var Thumbnail_jsxFileName = "/Users/harrison/react-bootstrap/src/Thumbnail.js";

/* eslint-disable jsx-a11y/alt-text */





var Thumbnail_propTypes = {
  /**
   * src property that is passed down to the image inside this component
   */
  src: (prop_types_default()).string,

  /**
   * alt property that is passed down to the image inside this component
   */
  alt: (prop_types_default()).string,

  /**
   * href property that is passed down to the image inside this component
   */
  href: (prop_types_default()).string,

  /**
   * onError callback that is passed down to the image inside this component
   */
  onError: (prop_types_default()).func,

  /**
   * onLoad callback that is passed down to the image inside this component
   */
  onLoad: (prop_types_default()).func
};

var Thumbnail =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Thumbnail, _React$Component);

  function Thumbnail() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Thumbnail.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        src = _this$props.src,
        alt = _this$props.alt,
        onError = _this$props.onError,
        onLoad = _this$props.onLoad,
        className = _this$props.className,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["src", "alt", "onError", "onLoad", "className", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var Component = elementProps.href ? src_SafeAnchor : 'div';
    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(Component, _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Thumbnail_jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("img", _extends({
      src: src,
      alt: alt,
      onError: onError,
      onLoad: onLoad
    }, {
      __source: {
        fileName: Thumbnail_jsxFileName,
        lineNumber: 51
      },
      __self: this
    })), children && external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: "caption",
      __source: {
        fileName: Thumbnail_jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, children));
  };

  return Thumbnail;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Thumbnail.propTypes = Thumbnail_propTypes;
/* harmony default export */ const src_Thumbnail = (bsClass('thumbnail', Thumbnail));
;// ./src/ToggleButton.js



var ToggleButton_jsxFileName = "/Users/harrison/react-bootstrap/src/ToggleButton.js";



var ToggleButton_propTypes = {
  /**
   * The `<input>` `type`
   * @type {[type]}
   */
  type: prop_types_default().oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: (prop_types_default()).string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>`` automatically
   */
  checked: (prop_types_default()).bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: (prop_types_default()).bool,

  /**
   * [onChange description]
   */
  onChange: (prop_types_default()).func,

  /**
   * The value of the input, and unique identifier in the ToggleButtonGroup
   */
  value: (prop_types_default()).any.isRequired
};

var ToggleButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ToggleButton, _React$Component);

  function ToggleButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ToggleButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        name = _this$props.name,
        checked = _this$props.checked,
        type = _this$props.type,
        onChange = _this$props.onChange,
        value = _this$props.value,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "name", "checked", "type", "onChange", "value"]);

    var disabled = props.disabled;
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_Button, _extends({}, props, {
      active: !!checked,
      componentClass: "label",
      __source: {
        fileName: ToggleButton_jsxFileName,
        lineNumber: 53
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("input", {
      name: name,
      type: type,
      autoComplete: "off",
      value: value,
      checked: !!checked,
      disabled: !!disabled,
      onChange: onChange,
      __source: {
        fileName: ToggleButton_jsxFileName,
        lineNumber: 54
      },
      __self: this
    }), children);
  };

  return ToggleButton;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ToggleButton.propTypes = ToggleButton_propTypes;
/* harmony default export */ const src_ToggleButton = (ToggleButton);
;// ./src/ToggleButtonGroup.js



var ToggleButtonGroup_jsxFileName = "/Users/harrison/react-bootstrap/src/ToggleButtonGroup.js";








var ToggleButtonGroup_propTypes = {
  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: (prop_types_default()).string,

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value: (prop_types_default()).any,

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable values
   */
  onChange: (prop_types_default()).func,

  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: prop_types_default().oneOf(['checkbox', 'radio']).isRequired
};
var ToggleButtonGroup_defaultProps = {
  type: 'radio'
};

var ToggleButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ToggleButtonGroup, _React$Component);

  function ToggleButtonGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ToggleButtonGroup.prototype;

  _proto.getValues = function getValues() {
    var value = this.props.value;
    return value == null ? [] : [].concat(value);
  };

  _proto.handleToggle = function handleToggle(value) {
    var _this$props = this.props,
        type = _this$props.type,
        onChange = _this$props.onChange;
    var values = this.getValues();
    var isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) {
        onChange(value);
      }

      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== value;
      }));
    } else {
      onChange(values.concat([value]));
    }
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        type = _this$props2.type,
        name = _this$props2.name,
        props = _objectWithoutPropertiesLoose(_this$props2, ["children", "type", "name"]);

    var values = this.getValues();
    !(type !== 'radio' || !!name) ?  false ? 0 : browser_default()(false) : void 0;
    delete props.onChange;
    delete props.value; // the data attribute is required b/c twbs css uses it in the selector

    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement(src_ButtonGroup, _extends({}, props, {
      "data-toggle": "buttons",
      __source: {
        fileName: ToggleButtonGroup_jsxFileName,
        lineNumber: 87
      },
      __self: this
    }), ValidComponentChildren.map(children, function (child) {
      var _child$props = child.props,
          value = _child$props.value,
          onChange = _child$props.onChange;

      var handler = function handler() {
        return _this.handleToggle(value);
      };

      return external_root_React_commonjs2_react_commonjs_react_amd_react_default().cloneElement(child, {
        type: type,
        name: child.name || name,
        checked: values.indexOf(value) !== -1,
        onChange: utils_createChainedFunction(onChange, handler)
      });
    }));
  };

  return ToggleButtonGroup;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

ToggleButtonGroup.propTypes = ToggleButtonGroup_propTypes;
ToggleButtonGroup.defaultProps = ToggleButtonGroup_defaultProps;
var UncontrolledToggleButtonGroup = uncontrollable_default()(ToggleButtonGroup, {
  value: 'onChange'
});
UncontrolledToggleButtonGroup.Button = src_ToggleButton;
/* harmony default export */ const src_ToggleButtonGroup = (UncontrolledToggleButtonGroup);
;// ./src/Tooltip.js



var Tooltip_jsxFileName = "/Users/harrison/react-bootstrap/src/Tooltip.js";





var Tooltip_propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y_default()(prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: prop_types_default().oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string]),

  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: prop_types_default().oneOfType([(prop_types_default()).number, (prop_types_default()).string])
};
var Tooltip_defaultProps = {
  placement: 'right'
};

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Tooltip, _React$Component);

  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _extends2;

    var _this$props = this.props,
        placement = _this$props.placement,
        positionTop = _this$props.positionTop,
        positionLeft = _this$props.positionLeft,
        arrowOffsetTop = _this$props.arrowOffsetTop,
        arrowOffsetLeft = _this$props.arrowOffsetLeft,
        className = _this$props.className,
        style = _this$props.style,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "className", "style", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

    var outerStyle = _extends({
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      role: "tooltip",
      className: classnames_default()(className, classes),
      style: outerStyle,
      __source: {
        fileName: Tooltip_jsxFileName,
        lineNumber: 84
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'arrow'),
      style: arrowStyle,
      __source: {
        fileName: Tooltip_jsxFileName,
        lineNumber: 90
      },
      __self: this
    }), external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", {
      className: prefix(bsProps, 'inner'),
      __source: {
        fileName: Tooltip_jsxFileName,
        lineNumber: 92
      },
      __self: this
    }, children));
  };

  return Tooltip;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

Tooltip.propTypes = Tooltip_propTypes;
Tooltip.defaultProps = Tooltip_defaultProps;
/* harmony default export */ const src_Tooltip = (bsClass('tooltip', Tooltip));
;// ./src/Well.js



var Well_jsxFileName = "/Users/harrison/react-bootstrap/src/Well.js";





var Well =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Well, _React$Component);

  function Well() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Well.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["className"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = getClassSet(bsProps);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default().createElement("div", _extends({}, elementProps, {
      className: classnames_default()(className, classes),
      __source: {
        fileName: Well_jsxFileName,
        lineNumber: 19
      },
      __self: this
    }));
  };

  return Well;
}((external_root_React_commonjs2_react_commonjs_react_amd_react_default()).Component);

/* harmony default export */ const src_Well = (bsClass('well', bsSizes([Size.LARGE, Size.SMALL], Well)));
;// ./src/utils/index.js






;// ./src/index.js














































































































































})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});