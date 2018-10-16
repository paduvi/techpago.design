"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _remarkMath = _interopRequireDefault(require("remark-math"));

var ReactKatex = _interopRequireWildcard(require("react-katex"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

require("bulma/css/bulma.min.css");

require("katex/dist/katex.min.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var BlockMath = function BlockMath(_ref) {
  var value = _ref.value;
  return _react.default.createElement(ReactKatex.BlockMath, null, value);
};

var InlineMath = function InlineMath(_ref2) {
  var value = _ref2.value;
  return _react.default.createElement(ReactKatex.InlineMath, null, value);
};

var Media = function Media(_ref3) {
  var alt = _ref3.alt,
      src = _ref3.src;

  if (!alt.startsWith('{video}')) {
    return _react.default.createElement("img", {
      alt: alt,
      src: src
    });
  }

  return _react.default.createElement("div", {
    style: {
      position: 'relative',
      paddingTop: '56.25%'
    }
  }, _react.default.createElement(_reactPlayer.default, {
    url: src,
    controls: true,
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    },
    width: "100%",
    height: "100%"
  }));
};

var ParagraphRenderer = function ParagraphRenderer(_ref4) {
  var children = _ref4.children;
  var hasVideo = !!children.find(function (child) {
    return _typeof(child) === 'object' && child.key && !!child.key.match(/image/g) && child.props.alt && child.props.alt.startsWith('{video}');
  });
  return hasVideo ? children : _react.default.createElement("p", null, children);
};

var MarkdownRenderer = function MarkdownRenderer(props) {
  var newProps = _objectSpread({}, props, {
    plugins: [_remarkMath.default],
    renderers: _objectSpread({}, props.renderers, {
      paragraph: ParagraphRenderer,
      math: BlockMath,
      inlineMath: InlineMath,
      image: Media
    })
  });

  return _react.default.createElement(_reactMarkdown.default, _extends({
    className: "content",
    escapeHtml: false
  }, newProps));
};

BlockMath.propTypes = {
  value: _propTypes.default.string.isRequired
};
InlineMath.propTypes = {
  value: _propTypes.default.string.isRequired
};
Media.propTypes = {
  alt: _propTypes.default.string,
  src: _propTypes.default.string.isRequired
};
var _default = MarkdownRenderer;
exports.default = _default;