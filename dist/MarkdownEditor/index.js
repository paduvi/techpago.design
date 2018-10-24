"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/icon/style/css");

var _icon = _interopRequireDefault(require("antd/es/icon"));

require("antd/es/divider/style/css");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAce = _interopRequireDefault(require("react-ace"));

var _range = require("ace-code-editor/lib/ace/range");

var _MarkdownRenderer = _interopRequireDefault(require("./MarkdownRenderer"));

var _LatexDialog = _interopRequireDefault(require("./LatexDialog"));

var _ImageDialog = _interopRequireDefault(require("./ImageDialog"));

var _VideoDialog = _interopRequireDefault(require("./VideoDialog"));

var _LinkDialog = _interopRequireDefault(require("./LinkDialog"));

var _sample = _interopRequireDefault(require("./sample.md"));

require("brace/mode/markdown");

require("brace/theme/solarized_light");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RichMarkdownEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(RichMarkdownEditor, _Component);

  function RichMarkdownEditor(props) {
    var _this;

    _classCallCheck(this, RichMarkdownEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichMarkdownEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLoad", function (editor) {
      _this.editor = editor;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue) {
      _this.setState({
        content: newValue
      }, function () {
        return _this.props.onChange && _this.props.onChange(newValue);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectionChange", function (e) {
      var offset = e.$isEmpty ? 1 : 0;
      var order = 0;

      if (e.anchor.row > e.lead.row) {
        order = 1;
      }

      if (e.anchor.row === e.lead.row && e.anchor.column > e.lead.column) {
        order = 1;
      }

      var newSelectedRange = {
        start: {
          row: (order === 0 ? e.anchor.row : e.lead.row) + offset,
          col: order === 0 ? e.anchor.column : e.lead.column
        },
        end: {
          row: (order === 0 ? e.lead.row : e.anchor.row) + offset,
          col: order === 0 ? e.lead.column : e.anchor.column
        }
      };

      _this.setState({
        selectedRange: newSelectedRange
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addMark", function (e, startSymbol, endSymbol) {
      if (!endSymbol) {
        endSymbol = startSymbol;
      }

      e.preventDefault();
      var _this$state = _this.state,
          content = _this$state.content,
          selectedRange = _this$state.selectedRange;
      var sameRow = false;

      if (selectedRange.end.row === selectedRange.start.row) {
        sameRow = true;
      }

      var newRows = [];
      content.split("\n").forEach(function (line, row) {
        if (row > selectedRange.end.row || row < selectedRange.start.row) {
          return;
        }

        if (!sameRow && row < selectedRange.end.row && row > selectedRange.start.row) {
          if (line.trim()) {
            line = startSymbol + line + endSymbol;
          }

          newRows.push(line);
          return;
        }

        if (row === selectedRange.end.row) {
          var col = selectedRange.end.col;
          line = line.slice(0, col) + endSymbol;
        }

        if (row === selectedRange.start.row) {
          var _col = selectedRange.start.col;
          line = startSymbol + line.slice(_col);
        }

        newRows.push(line);
      });

      _this.replaceContent(newRows.join('\n'));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeMode", function (e) {
      e.preventDefault();

      _this.setState(function (_ref) {
        var mode = _ref.mode;
        return {
          mode: (mode + 1) % 2
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "replaceContent", function (text) {
      var selectedRange = _this.state.selectedRange;
      var range = new _range.Range(selectedRange.start.row, selectedRange.start.col, selectedRange.end.row, selectedRange.end.col);

      _this.editor.env.document.replace(range, text);
    });

    _this.state = {
      mode: props.defaultMode || 1,

      /* 0: edit, 1: preview*/
      content: props.defaultValue,
      selectedRange: {
        start: {
          row: 0,
          col: 0
        },
        end: {
          row: 0,
          col: 0
        }
      },
      latexDialogVisible: false,
      imageDialogVisible: false,
      videoDialogVisible: false,
      linkDialogVisible: false
    };
    return _this;
  }

  _createClass(RichMarkdownEditor, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var response, content;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.state.content === null)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 3;
                return fetch(_sample.default);

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                content = _context.sent;
                return _context.abrupt("return", this.setState({
                  content: content
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          mode = _this$state2.mode,
          content = _this$state2.content,
          latexDialogVisible = _this$state2.latexDialogVisible,
          imageDialogVisible = _this$state2.imageDialogVisible,
          videoDialogVisible = _this$state2.videoDialogVisible,
          linkDialogVisible = _this$state2.linkDialogVisible;
      var _this$props = this.props,
          editorStyle = _this$props.editorStyle,
          rendererStyle = _this$props.rendererStyle,
          style = _this$props.style;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_LatexDialog.default, {
        visible: latexDialogVisible,
        closeModal: function closeModal(text) {
          _this2.setState({
            latexDialogVisible: false
          });

          if (text) {
            _this2.replaceContent(text);
          }
        }
      }), _react.default.createElement(_ImageDialog.default, {
        visible: imageDialogVisible,
        closeModal: function closeModal(text) {
          _this2.setState({
            imageDialogVisible: false
          });

          if (text) {
            _this2.replaceContent(text);
          }
        }
      }), _react.default.createElement(_VideoDialog.default, {
        visible: videoDialogVisible,
        closeModal: function closeModal(text) {
          _this2.setState({
            videoDialogVisible: false
          });

          if (text) {
            _this2.replaceContent(text);
          }
        }
      }), _react.default.createElement(_LinkDialog.default, {
        visible: linkDialogVisible,
        closeModal: function closeModal(text) {
          _this2.setState({
            linkDialogVisible: false
          });

          if (text) {
            _this2.replaceContent(text);
          }
        }
      }), content && _react.default.createElement("div", {
        style: _objectSpread({
          display: "flex",
          flexDirection: "row",
          justifyContent: mode === 1 ? "space-between" : "center"
        }, style)
      }, _react.default.createElement("div", {
        style: {
          maxWidth: 700,
          width: mode === 0 ? '90%' : '50%',
          marginRight: mode === 0 ? 0 : '1em'
        }
      }, _react.default.createElement("div", {
        style: _objectSpread({
          border: '1px solid #FFF',
          borderRadius: '10px 10px 0 0',
          background: '#FFF',
          padding: '0 0 0 5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }, editorStyle)
      }, _react.default.createElement("div", null, _react.default.createElement(_tooltip.default, {
        title: "Bold"
      }, _react.default.createElement(_button.default, {
        icon: "bold",
        style: {
          border: 'none'
        },
        onClick: function onClick(e) {
          return _this2.addMark(e, "**");
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Italic"
      }, _react.default.createElement(_button.default, {
        icon: "italic",
        style: {
          border: 'none'
        },
        onClick: function onClick(e) {
          return _this2.addMark(e, "*");
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Strike Through"
      }, _react.default.createElement(_button.default, {
        icon: "strikethrough",
        style: {
          border: 'none'
        },
        onClick: function onClick(e) {
          return _this2.addMark(e, "~~");
        }
      })), _react.default.createElement(_divider.default, {
        type: "vertical"
      }), _react.default.createElement(_tooltip.default, {
        title: "Link"
      }, _react.default.createElement(_button.default, {
        icon: "link",
        style: {
          border: 'none'
        },
        onClick: function onClick() {
          return _this2.setState({
            linkDialogVisible: true
          });
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Image"
      }, _react.default.createElement(_button.default, {
        icon: "picture",
        style: {
          border: 'none'
        },
        onClick: function onClick() {
          return _this2.setState({
            imageDialogVisible: true
          });
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Video"
      }, _react.default.createElement(_button.default, {
        icon: "youtube",
        style: {
          border: 'none'
        },
        onClick: function onClick() {
          return _this2.setState({
            videoDialogVisible: true
          });
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Latex"
      }, _react.default.createElement(_button.default, {
        icon: "calculator",
        style: {
          border: 'none'
        },
        onClick: function onClick() {
          return _this2.setState({
            latexDialogVisible: true
          });
        }
      })), _react.default.createElement(_divider.default, {
        type: "vertical"
      }), _react.default.createElement(_tooltip.default, {
        title: "Blockquote"
      }, _react.default.createElement(_button.default, {
        icon: "message",
        style: {
          border: 'none'
        },
        onClick: function onClick(e) {
          return _this2.addMark(e, "<blockquote>", "</blockquote>");
        }
      })), _react.default.createElement(_tooltip.default, {
        title: "Code"
      }, _react.default.createElement(_button.default, {
        icon: "code",
        style: {
          border: 'none'
        },
        onClick: function onClick(e) {
          return _this2.addMark(e, "`");
        }
      })), _react.default.createElement(_divider.default, {
        type: "vertical"
      })), _react.default.createElement("div", null, _react.default.createElement(_radio.default.Button, {
        checked: mode === 1,
        style: {
          border: 'none'
        }
      }, _react.default.createElement(_tooltip.default, {
        title: "Preview ".concat(mode === 0 ? "On" : "Off")
      }, _react.default.createElement(_icon.default, {
        type: "eye",
        onClick: this.handleChangeMode
      }))))), _react.default.createElement(_reactAce.default, {
        mode: "markdown",
        theme: "solarized_light",
        width: null,
        height: '425px',
        onLoad: this.onLoad,
        onChange: this.onChange,
        onSelectionChange: this.onSelectionChange,
        value: content,
        fontSize: 14,
        showPrintMargin: true,
        showGutter: true,
        wrapEnabled: true,
        highlightActiveLine: true,
        editorProps: {
          $blockScrolling: true
        },
        style: {
          border: '1px solid #FFF',
          borderRadius: '0 0 10px 10px'
        }
      })), _react.default.createElement("div", {
        style: _objectSpread({
          display: mode === 0 ? 'none' : 'block',
          marginLeft: '1em',
          width: '50%',
          height: 460,
          overflow: 'auto',
          padding: '1em',
          textAlign: 'left',
          background: '#FFF'
        }, rendererStyle)
      }, _react.default.createElement(_MarkdownRenderer.default, {
        source: this.state.content
      }))));
    }
  }]);

  return RichMarkdownEditor;
}(_react.Component);

_defineProperty(RichMarkdownEditor, "defaultProps", {
  defaultValue: null
});

RichMarkdownEditor.propTypes = {
  defaultValue: _propTypes.default.string,
  onChange: _propTypes.default.func,
  defaultMode: _propTypes.default.number,
  editorStyle: _propTypes.default.object,
  rendererStyle: _propTypes.default.object,
  style: _propTypes.default.object
};
var _default = RichMarkdownEditor;
exports.default = _default;