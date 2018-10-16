"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _slateReact = require("slate-react");

var _isHotkey = require("is-hotkey");

var _components = require("./components");

var _serializer = _interopRequireDefault(require("./serializer"));

require("./index.css");

require("bulma/css/bulma.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Define the default node type.
 *
 * @type {String}
 */
var DEFAULT_NODE = 'paragraph';
/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

var isBoldHotkey = (0, _isHotkey.isKeyHotkey)('mod+b');
var isItalicHotkey = (0, _isHotkey.isKeyHotkey)('mod+i');
var isUnderlinedHotkey = (0, _isHotkey.isKeyHotkey)('mod+u');
var isCodeHotkey = (0, _isHotkey.isKeyHotkey)('mod+`');
/**
 * The rich text example.
 *
 * @type {Component}
 */

var RichTextEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RichTextEditor, _React$Component);

  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */
  function RichTextEditor(_props) {
    var _this;

    _classCallCheck(this, RichTextEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichTextEditor).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasMark", function (type) {
      var value = _this.state.value;
      return value.activeMarks.some(function (mark) {
        return mark.type === type;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasBlock", function (type) {
      var value = _this.state.value;
      return value.blocks.some(function (node) {
        return node.type === type;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ref", function (editor) {
      _this.editor = editor;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMarkButton", function (type, icon) {
      var isActive = _this.hasMark(type);

      return _react.default.createElement(_components.Button, {
        active: isActive,
        onMouseDown: function onMouseDown(event) {
          return _this.onClickMark(event, type);
        }
      }, _react.default.createElement(_components.Icon, null, icon));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderBlockButton", function (type, icon) {
      var isActive = _this.hasBlock(type);

      if (['numbered-list', 'bulleted-list'].includes(type)) {
        var value = _this.state.value;
        var parent = value.document.getParent(value.blocks.first().key);
        isActive = _this.hasBlock('list-item') && parent && parent.type === type;
      }

      return _react.default.createElement(_components.Button, {
        active: isActive,
        onMouseDown: function onMouseDown(event) {
          return _this.onClickBlock(event, type);
        }
      }, _react.default.createElement(_components.Icon, null, icon));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderNode", function (props, next) {
      var attributes = props.attributes,
          children = props.children,
          node = props.node;

      switch (node.type) {
        case 'block-quote':
          return _react.default.createElement("blockquote", attributes, children);

        case 'bulleted-list':
          return _react.default.createElement("ul", attributes, children);

        case 'heading-one':
          return _react.default.createElement("h1", attributes, children);

        case 'heading-two':
          return _react.default.createElement("h2", attributes, children);

        case 'list-item':
          return _react.default.createElement("li", attributes, children);

        case 'numbered-list':
          return _react.default.createElement("ol", attributes, children);

        default:
          return next();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMark", function (props, next) {
      var children = props.children,
          mark = props.mark,
          attributes = props.attributes;

      switch (mark.type) {
        case 'bold':
          return _react.default.createElement("strong", attributes, children);

        case 'code':
          return _react.default.createElement("code", attributes, children);

        case 'italic':
          return _react.default.createElement("em", attributes, children);

        case 'underlined':
          return _react.default.createElement("u", attributes, children);

        default:
          return next();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (_ref) {
      var value = _ref.value;

      _this.setState({
        value: value
      }, function () {
        _this.props.onChange && _this.props.onChange(_serializer.default.serialize(value));
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event, change, next) {
      var mark;

      if (isBoldHotkey(event)) {
        mark = 'bold';
      } else if (isItalicHotkey(event)) {
        mark = 'italic';
      } else if (isUnderlinedHotkey(event)) {
        mark = 'underlined';
      } else if (isCodeHotkey(event)) {
        mark = 'code';
      } else {
        return next();
      }

      event.preventDefault();
      change.toggleMark(mark);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickMark", function (event, type) {
      event.preventDefault();

      _this.editor.change(function (change) {
        change.toggleMark(type);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickBlock", function (event, type) {
      event.preventDefault();

      _this.editor.change(function (change) {
        var value = change.value;
        var document = value.document; // Handle everything but list buttons.

        if (type !== 'bulleted-list' && type !== 'numbered-list') {
          var isActive = _this.hasBlock(type);

          var isList = _this.hasBlock('list-item');

          if (isList) {
            change.setBlocks(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
          } else {
            change.setBlocks(isActive ? DEFAULT_NODE : type);
          }
        } else {
          // Handle the extra wrapping required for list buttons.
          var _isList = _this.hasBlock('list-item');

          var isType = value.blocks.some(function (block) {
            return !!document.getClosest(block.key, function (parent) {
              return parent.type === type;
            });
          });

          if (_isList && isType) {
            change.setBlocks(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
          } else if (_isList) {
            change.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
          } else {
            change.setBlocks('list-item').wrapBlock(type);
          }
        }
      });
    });

    _this.state = {
      value: _serializer.default.deserialize(_props.defaultValue || '')
    };
    return _this;
  }
  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */


  _createClass(RichTextEditor, [{
    key: "render",

    /**
     * Render.
     *
     * @return {Element}
     */
    value: function render() {
      return _react.default.createElement("div", {
        style: _objectSpread({}, styles.editor, this.props.style)
      }, _react.default.createElement(_components.Toolbar, null, this.renderMarkButton('bold', 'format_bold'), this.renderMarkButton('italic', 'format_italic'), this.renderMarkButton('underlined', 'format_underlined'), this.renderMarkButton('code', 'code'), this.renderBlockButton('heading-one', 'looks_one'), this.renderBlockButton('heading-two', 'looks_two'), this.renderBlockButton('block-quote', 'format_quote'), this.renderBlockButton('numbered-list', 'format_list_numbered'), this.renderBlockButton('bulleted-list', 'format_list_bulleted')), _react.default.createElement(_slateReact.Editor, {
        className: "content",
        spellCheck: true,
        autoFocus: true,
        placeholder: this.props.placeholder || "Enter some rich text...",
        ref: this.ref,
        value: this.state.value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        renderNode: this.renderNode,
        renderMark: this.renderMark
      }));
    }
  }]);

  return RichTextEditor;
}(_react.default.Component);

RichTextEditor.propTypes = {
  defaultValue: _propTypes.default.string,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  style: _propTypes.default.object
};
var styles = {
  editor: {
    color: 'rgb(17, 17, 17)',
    maxWidth: 700,
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgba(118, 143, 255, 0.1) 0px 16px 24px 0px',
    padding: '20px 40px 40px',
    margin: '20px auto',
    borderRadius: '4.5px',
    textAlign: 'left'
  }
};
/**
 * Export.
 */

var _default = RichTextEditor;
exports.default = _default;