"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _PagerItem = _interopRequireDefault(require("./PagerItem"));
var _deprecationWarning = _interopRequireDefault(require("./utils/deprecationWarning"));
var _default = exports["default"] = _deprecationWarning["default"].wrapper(_PagerItem["default"], '`<PageItem>`', '`<Pager.Item>`');
module.exports = exports["default"];