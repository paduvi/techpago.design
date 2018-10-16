import React from "react";
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import * as ReactKatex from 'react-katex';
import ReactPlayer from 'react-player';

import 'bulma/css/bulma.min.css';
import 'katex/dist/katex.min.css';

const BlockMath = ({ value }) => <ReactKatex.BlockMath>{value}</ReactKatex.BlockMath>;
const InlineMath = ({ value }) => <ReactKatex.InlineMath>{value}</ReactKatex.InlineMath>;
const Media = ({ alt, src }) => {
    if (!alt.startsWith('{video}')) {
        return <img alt={alt} src={src} />;
    }
    return (
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
                url={src}
                controls={true}
                style={{ position: 'absolute', left: 0, top: 0 }}
                width='100%'
                height='100%'
            />
        </div>
    );
};
const ParagraphRenderer = ({ children }) => {
    const hasVideo = !!children.find(
        (child) => typeof child === 'object' && child.key && !!child.key.match(/image/g)
            && child.props.alt && child.props.alt.startsWith('{video}')
    );
    return hasVideo ? children : <p>{children}</p>;
};

const MarkdownRenderer = (props) => {
    const newProps = {
        ...props,
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...props.renderers,
            paragraph: ParagraphRenderer,
            math: BlockMath,
            inlineMath: InlineMath,
            image: Media
        }
    };
    return (
        <ReactMarkdown className="content" escapeHtml={false} {...newProps} />
    );
};

BlockMath.propTypes = {
    value: PropTypes.string.isRequired
};

InlineMath.propTypes = {
    value: PropTypes.string.isRequired
};

Media.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired
};

export default MarkdownRenderer;