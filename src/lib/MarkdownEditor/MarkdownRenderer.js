import React from "react";
import PropTypes from 'prop-types';
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import * as ReactKatex from 'react-katex';
import ReactPlayer from 'react-player';
import Prism from "prismjs/components/prism-core";
//other languages depend on these
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-java";
//include javascript as default fallback
import "prismjs/components/prism-javascript";

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.css';
import 'markdown-themes/css/github-theme.css';
import './index.css';


const BlockCode = ({ value, language }) => {
    let html;
    let cls;
    //console.log(props.value)
    try {
        //try to load prism component for language
        if (language in Prism.languages) {
            import("prismjs/components/prism-" + language);
        }
        
        html = Prism.highlight(value || "", Prism.languages[language]);
        cls = `language-${language}`;
    } catch (er) {
        //if load failed, fall back to javascript
        // console.log(er.message + ": \"" + language + "\"");
        html = Prism.highlight(value || "", Prism.languages["js"]);
        cls = "language-js";
    }
    return (
        <pre className={cls}>
            <code
                dangerouslySetInnerHTML={{ __html: html }}
                className={cls}
            />
        </pre>
    );
};

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
            image: Media,
            code: BlockCode,
        }
    };
    return (
        <ReactMarkdown escapeHtml={false} {...newProps} />
    );
};

BlockMath.propTypes = {
    value: PropTypes.string.isRequired
};

InlineMath.propTypes = {
    value: PropTypes.string.isRequired
};

BlockCode.propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
};

BlockCode.defaultProps = {
    value: '',
    language: 'js'
};

Media.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired
};

export default MarkdownRenderer;