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

var _prismCore = _interopRequireDefault(require("prismjs/components/prism-core"));

require("prismjs/components/prism-clike");

require("prismjs/components/prism-c");

require("prismjs/components/prism-java");

require("prismjs/components/prism-javascript");

require("katex/dist/katex.min.css");

require("prismjs/themes/prism.css");

require("markdown-themes/css/github-theme.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var BlockCode = function BlockCode(_ref) {
  var value = _ref.value,
      language = _ref.language;
  var html;
  var cls; //console.log(props.value)

  try {
    //try to load prism component for language
    if (language in _prismCore.default.languages) {
      import("prismjs/components/prism-" + language);
    }

    html = _prismCore.default.highlight(value || "", _prismCore.default.languages[language]);
    cls = "language-".concat(language);
  } catch (er) {
    //if load failed, fall back to javascript
    // console.log(er.message + ": \"" + language + "\"");
    html = _prismCore.default.highlight(value || "", _prismCore.default.languages["js"]);
    cls = "language-js";
  }

  return _react.default.createElement("pre", {
    className: cls
  }, _react.default.createElement("code", {
    dangerouslySetInnerHTML: {
      __html: html
    },
    className: cls
  }));
};

var BlockMath = function BlockMath(_ref2) {
  var value = _ref2.value;
  return _react.default.createElement(ReactKatex.BlockMath, null, value);
};

var InlineMath = function InlineMath(_ref3) {
  var value = _ref3.value;
  return _react.default.createElement(ReactKatex.InlineMath, null, value);
};

var Media = function Media(_ref4) {
  var alt = _ref4.alt,
      src = _ref4.src;

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

var ParagraphRenderer = function ParagraphRenderer(_ref5) {
  var children = _ref5.children;
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
      image: Media,
      code: BlockCode
    })
  });

  return _react.default.createElement(_reactMarkdown.default, _extends({
    escapeHtml: false
  }, newProps));
};

BlockMath.propTypes = {
  value: _propTypes.default.string.isRequired
};
InlineMath.propTypes = {
  value: _propTypes.default.string.isRequired
};
BlockCode.propTypes = {
  value: _propTypes.default.string.isRequired,
  language: _propTypes.default.string
};
BlockCode.defaultProps = {
  value: '',
  language: 'js'
};
Media.propTypes = {
  alt: _propTypes.default.string,
  src: _propTypes.default.string.isRequired
};
var _default = MarkdownRenderer;
exports.default = _default;