"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slateHtmlSerializer = _interopRequireDefault(require("slate-html-serializer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tags to blocks.
 *
 * @type {Object}
 */
var BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six'
};
/**
   * Tags to marks.
   *
   * @type {Object}
   */

var MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code'
};
/**
   * Serializer rules.
   *
   * @type {Array}
   */

var RULES = [{
  deserialize: function deserialize(el, next) {
    var mark = MARK_TAGS[el.tagName.toLowerCase()];

    if (mark) {
      return {
        object: 'mark',
        type: mark,
        nodes: next(el.childNodes)
      };
    }
  },
  serialize: function serialize(obj, children) {
    if (obj.object === 'mark') {
      switch (obj.type) {
        case 'bold':
          return _react.default.createElement("strong", null, children);

        case 'italic':
          return _react.default.createElement("em", null, children);

        case 'underline':
          return _react.default.createElement("u", null, children);

        case 'strikethrough':
          return _react.default.createElement("s", null, children);

        case 'code':
          return _react.default.createElement("code", null, children);

        default:
          return children;
      }
    }
  }
}, {
  deserialize: function deserialize(el, next) {
    var block = BLOCK_TAGS[el.tagName.toLowerCase()];

    if (block) {
      return {
        object: 'block',
        type: block,
        nodes: next(el.childNodes)
      };
    }
  }
}, {
  // Special case for code blocks, which need to grab the nested childNodes.
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'pre') {
      var code = el.childNodes[0];
      var childNodes = code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes;
      return {
        object: 'block',
        type: 'code',
        nodes: next(childNodes)
      };
    }
  }
}, {
  // Special case for images, to grab their src.
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'img') {
      return {
        object: 'block',
        type: 'image',
        nodes: next(el.childNodes),
        data: {
          src: el.getAttribute('src')
        }
      };
    }
  }
}, {
  // Special case for links, to grab their href.
  deserialize: function deserialize(el, next) {
    if (el.tagName.toLowerCase() === 'a') {
      return {
        object: 'inline',
        type: 'link',
        nodes: next(el.childNodes),
        data: {
          href: el.getAttribute('href')
        }
      };
    }
  },
  serialize: function serialize(obj, children) {
    if (obj.object === 'inline') {
      switch (obj.type) {
        case 'link':
          return _react.default.createElement("a", {
            href: obj.data.get('href')
          }, children);

        default:
          return children;
      }
    }
  }
}, {
  // Switch serialize to handle more blocks...
  serialize: function serialize(obj, children) {
    if (obj.object === 'block') {
      switch (obj.type) {
        case 'paragraph':
          return _react.default.createElement("p", null, children);

        case 'image':
          return _react.default.createElement("img", {
            alt: "",
            src: obj.data.get('src')
          });

        case 'quote':
          return _react.default.createElement("blockquote", null, children);

        case 'code':
          return _react.default.createElement("pre", null, _react.default.createElement("code", null, children));

        case 'list-item':
          return _react.default.createElement("li", null, children);

        case 'bulleted-list':
          return _react.default.createElement("ul", null, children);

        case 'numbered-list':
          return _react.default.createElement("ol", null, children);

        case 'heading-one':
          return _react.default.createElement("h1", null, children);

        case 'heading-two':
          return _react.default.createElement("h2", null, children);

        case 'heading-three':
          return _react.default.createElement("h3", null, children);

        case 'heading-four':
          return _react.default.createElement("h4", null, children);

        case 'heading-five':
          return _react.default.createElement("h5", null, children);

        case 'heading-six':
          return _react.default.createElement("h6", null, children);

        default:
          return children;
      }
    }
  }
}];
/**
   * Create a new HTML serializer with `RULES`.
   *
   * @type {Html}
   */

var serializer = new _slateHtmlSerializer.default({
  rules: RULES
});
var _default = serializer;
exports.default = _default;