"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound(_ref) {
  var home = _ref.home;
  return _react.default.createElement("div", {
    className: "error-page error"
  }, _react.default.createElement("div", null, _react.default.createElement("h1", null, "404"), _react.default.createElement("div", {
    className: "desc"
  }, _react.default.createElement("h2", null, "This page could not be found. Are you got lost? Go ", _react.default.createElement(_reactRouterDom.Link, {
    to: home
  }, "Home")))));
};

NotFound.propTypes = {
  home: _propTypes.default.string
};
NotFound.defaultProps = {
  home: '/'
};
var _default = NotFound;
exports.default = _default;