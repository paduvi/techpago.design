"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style/css");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/message/style/css");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var VideoDialog =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VideoDialog, _PureComponent);

  function VideoDialog(props) {
    var _this;

    _classCallCheck(this, VideoDialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoDialog).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "preprocess", function (e) {
      var url = _this.urlInput.current.input.value.trim();

      if (!url) {
        _message2.default.error('Chưa nhập link của video');

        return;
      }

      return _this.handleCloseModel(e, "![{video}](".concat(url, ")"));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCloseModel", function (e, content) {
      e.preventDefault();
      _this.urlInput.current.input.value = "";

      _this.props.closeModal(content);
    });

    _this.urlInput = _react.default.createRef();
    return _this;
  }

  _createClass(VideoDialog, [{
    key: "render",
    value: function render() {
      var visible = this.props.visible;
      return _react.default.createElement(_modal.default, {
        title: "Video Dialog",
        centered: true,
        visible: visible,
        onOk: this.preprocess,
        onCancel: this.handleCloseModel
      }, _react.default.createElement(_input.default, {
        ref: this.urlInput,
        placeholder: "URL"
      }));
    }
  }]);

  return VideoDialog;
}(_react.PureComponent);

VideoDialog.propTypes = {
  visible: _propTypes.default.bool.isRequired,
  closeModal: _propTypes.default.func.isRequired
};
var _default = VideoDialog;
exports.default = _default;