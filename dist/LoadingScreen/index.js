"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _loadingImage = _interopRequireDefault(require("./loading-image.gif"));

var _loadingLine = _interopRequireDefault(require("./loading-line.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var styles = {
  layout: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  wrapper: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 30,
    textAlign: 'center',
    maxWidth: 800
  },
  wrapperModal: {
    margin: 'auto',
    padding: 30,
    textAlign: 'center',
    maxWidth: 800,
    zIndex: 999
  },
  dotWrapper: {
    width: 20,
    display: 'inline-block',
    textAlign: 'left'
  }
};

var LoadingPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LoadingPage, _PureComponent);

  function LoadingPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoadingPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      dot: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "repeatDot", (0, _memoizeOne.default)(function (n) {
      return '.'.repeat(n);
    }));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      // componentDidMount is called by react when the component
      // has been rendered on the page. We can set the interval here:
      _this.timer = setInterval(_this.tick, 350);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      // This method is called immediately before the component is removed
      // from the page and destroyed. We can clear the interval here:
      if (_this.timer) {
        clearInterval(_this.timer);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tick", function () {
      _this.setState(function (prevState) {
        return {
          dot: (prevState.dot + 1) % 4
        };
      });
    });

    return _this;
  }

  _createClass(LoadingPage, [{
    key: "render",
    value: function render() {
      var dots = this.repeatDot(this.state.dot);
      var isModal = this.props.isModal;
      return _react.default.createElement("div", {
        style: isModal ? {} : styles.layout
      }, _react.default.createElement("div", {
        style: isModal ? styles.wrapperModal : styles.wrapper
      }, !isModal && _react.default.createElement("img", {
        alt: "logo",
        src: _loadingImage.default,
        style: {
          maxWidth: '30%',
          marginTop: 30
        }
      }), _react.default.createElement("p", {
        style: {
          display: 'block',
          color: '#25A69A',
          margin: 15
        }
      }, "Please wait for a while ", _react.default.createElement("span", {
        style: styles.dotWrapper
      }, dots)), _react.default.createElement("img", {
        alt: "loading-line'",
        src: _loadingLine.default,
        style: {
          margin: 30,
          maxWidth: '100%'
        }
      })));
    }
  }]);

  return LoadingPage;
}(_react.PureComponent);

_defineProperty(LoadingPage, "defaultProps", {
  isModal: false
});

LoadingPage.propTypes = {
  isModal: _propTypes.default.bool
};
var _default = LoadingPage;
exports.default = _default;