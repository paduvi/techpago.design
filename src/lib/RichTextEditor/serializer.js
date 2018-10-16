import React from 'react';
import Html from 'slate-html-serializer';

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
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
    h6: 'heading-six',
};

/**
   * Tags to marks.
   *
   * @type {Object}
   */

const MARK_TAGS = {
    strong: 'bold',
    em: 'italic',
    u: 'underline',
    s: 'strikethrough',
    code: 'code',
};

/**
   * Serializer rules.
   *
   * @type {Array}
   */

const RULES = [
    {
        deserialize(el, next) {
            const mark = MARK_TAGS[el.tagName.toLowerCase()];

            if (mark) {
                return {
                    object: 'mark',
                    type: mark,
                    nodes: next(el.childNodes),
                };
            }
        },
        serialize(obj, children) {
            if (obj.object === 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <strong>{children}</strong>;
                    case 'italic':
                        return <em>{children}</em>;
                    case 'underline':
                        return <u>{children}</u>;
                    case 'strikethrough':
                        return <s>{children}</s>;
                    case 'code':
                        return <code>{children}</code>;
                    default:
                        return children;
                }
            }
        },
    },
    {
        deserialize(el, next) {
            const block = BLOCK_TAGS[el.tagName.toLowerCase()];

            if (block) {
                return {
                    object: 'block',
                    type: block,
                    nodes: next(el.childNodes),
                };
            }
        },
    },
    {
        // Special case for code blocks, which need to grab the nested childNodes.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() === 'pre') {
                const code = el.childNodes[0];
                const childNodes =
                    code && code.tagName.toLowerCase() === 'code'
                        ? code.childNodes
                        : el.childNodes;

                return {
                    object: 'block',
                    type: 'code',
                    nodes: next(childNodes),
                };
            }
        }
    },
    {
        // Special case for images, to grab their src.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() === 'img') {
                return {
                    object: 'block',
                    type: 'image',
                    nodes: next(el.childNodes),
                    data: {
                        src: el.getAttribute('src'),
                    },
                };
            }
        }
    },
    {
        // Special case for links, to grab their href.
        deserialize(el, next) {
            if (el.tagName.toLowerCase() === 'a') {
                return {
                    object: 'inline',
                    type: 'link',
                    nodes: next(el.childNodes),
                    data: {
                        href: el.getAttribute('href'),
                    },
                };
            }
        },
        serialize(obj, children) {
            if (obj.object === 'inline') {
                switch (obj.type) {
                    case 'link':
                        return (
                            <a href={obj.data.get('href')}>{children}</a>
                        );
                    default:
                        return children;
                }
            }
        },
    },
    {
        // Switch serialize to handle more blocks...
        serialize(obj, children) {
            if (obj.object === 'block') {
                switch (obj.type) {
                    case 'paragraph':
                        return <p>{children}</p>;
                    case 'image':
                        return (
                            <img alt='' src={obj.data.get('src')} />
                        );
                    case 'quote':
                        return <blockquote>{children}</blockquote>;
                    case 'code':
                        return (
                            <pre>
                                <code>{children}</code>
                            </pre>
                        );
                    case 'list-item':
                        return <li>{children}</li>;
                    case 'bulleted-list':
                        return <ul>{children}</ul>;
                    case 'numbered-list':
                        return <ol>{children}</ol>;
                    case 'heading-one':
                        return <h1>{children}</h1>;
                    case 'heading-two':
                        return <h2>{children}</h2>;
                    case 'heading-three':
                        return <h3>{children}</h3>;
                    case 'heading-four':
                        return <h4>{children}</h4>;
                    case 'heading-five':
                        return <h5>{children}</h5>;
                    case 'heading-six':
                        return <h6>{children}</h6>;
                    default:
                        return children;
                }
            }
        },
    }
];

/**
   * Create a new HTML serializer with `RULES`.
   *
   * @type {Html}
   */
const serializer = new Html({ rules: RULES });

export default serializer;