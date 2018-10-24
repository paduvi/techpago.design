import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { Range } from 'ace-code-editor/lib/ace/range';
import { Button, Radio, Icon, Divider, Tooltip } from 'antd';
import MarkdownRenderer from './MarkdownRenderer';
import LatexDialog from './LatexDialog';
import ImageDialog from './ImageDialog';
import VideoDialog from './VideoDialog';
import LinkDialog from './LinkDialog';

import sampleMarkdownUrl from './sample.md';
import 'brace/mode/markdown';
import 'brace/theme/solarized_light';

class RichMarkdownEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: props.defaultMode || 1, /* 0: edit, 1: preview*/
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
            linkDialogVisible: false,
        };
    }

    static defaultProps = {
        defaultValue: null
    }

    async componentDidMount() {
        if (this.state.content === null) {
            const response = await fetch(sampleMarkdownUrl);
            const content = await response.text();
            return this.setState({ content });
        }
    }

    onLoad = (editor) => {
        this.editor = editor;
    }

    onChange = (newValue) => {
        this.setState({ content: newValue }, () => this.props.onChange && this.props.onChange(newValue));
    }

    onSelectionChange = (e) => {
        const offset = e.$isEmpty ? 1 : 0;

        let order = 0;
        if (e.anchor.row > e.lead.row) {
            order = 1;
        }
        if (e.anchor.row === e.lead.row && e.anchor.column > e.lead.column) {
            order = 1;
        }
        const newSelectedRange = {
            start: {
                row: (order === 0 ? e.anchor.row : e.lead.row) + offset,
                col: order === 0 ? e.anchor.column : e.lead.column
            },
            end: {
                row: (order === 0 ? e.lead.row : e.anchor.row) + offset,
                col: order === 0 ? e.lead.column : e.anchor.column
            }
        };

        this.setState({
            selectedRange: newSelectedRange
        });
    }

    addMark = (e, startSymbol, endSymbol) => {
        if (!endSymbol) {
            endSymbol = startSymbol;
        }
        e.preventDefault();
        const { content, selectedRange } = this.state;

        let sameRow = false;
        if (selectedRange.end.row === selectedRange.start.row) {
            sameRow = true;
        }

        const newRows = [];

        content.split("\n").forEach((line, row) => {
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
                const { col } = selectedRange.end;
                line = line.slice(0, col) + endSymbol;
            }
            if (row === selectedRange.start.row) {
                const { col } = selectedRange.start;
                line = startSymbol + line.slice(col);
            }
            newRows.push(line);
        });
        this.replaceContent(newRows.join('\n'));
    }

    handleChangeMode = (e) => {
        e.preventDefault();
        this.setState(({ mode }) => ({
            mode: (mode + 1) % 2
        }));
    }

    replaceContent = (text) => {
        const { selectedRange } = this.state;
        const range = new Range(selectedRange.start.row, selectedRange.start.col, selectedRange.end.row, selectedRange.end.col);

        this.editor.env.document.replace(range, text);
    }

    render() {
        const { mode, content, latexDialogVisible, imageDialogVisible, videoDialogVisible, linkDialogVisible } = this.state;
        const {editorStyle, rendererStyle, style} = this.props;
        return (
            <Fragment>
                <LatexDialog
                    visible={latexDialogVisible}
                    closeModal={
                        (text) => {
                            this.setState({
                                latexDialogVisible: false
                            });
                            if (text) {
                                this.replaceContent(text);
                            }
                        }
                    }
                />
                <ImageDialog
                    visible={imageDialogVisible}
                    closeModal={
                        (text) => {
                            this.setState({
                                imageDialogVisible: false
                            });
                            if (text) {
                                this.replaceContent(text);
                            }
                        }
                    }
                />
                <VideoDialog
                    visible={videoDialogVisible}
                    closeModal={
                        (text) => {
                            this.setState({
                                videoDialogVisible: false
                            });
                            if (text) {
                                this.replaceContent(text);
                            }
                        }
                    }
                />
                <LinkDialog
                    visible={linkDialogVisible}
                    closeModal={
                        (text) => {
                            this.setState({
                                linkDialogVisible: false
                            });
                            if (text) {
                                this.replaceContent(text);
                            }
                        }
                    }
                />
                {content && (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: mode === 1 ? "space-between" : "center",
                            ...style
                        }}
                    >
                        <div
                            style={{
                                maxWidth: 700,
                                width: mode === 0 ? '90%' : '50%',
                                marginRight: mode === 0 ? 0 : '1em',
                            }}
                        >
                            <div style={{
                                border: '1px solid #FFF',
                                borderRadius: '10px 10px 0 0',
                                background: '#FFF',
                                padding: '0 0 0 5px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                ...editorStyle
                            }}>
                                <div>
                                    <Tooltip title="Bold">
                                        <Button icon="bold" style={{ border: 'none' }} onClick={e => this.addMark(e, "**")} />
                                    </Tooltip>
                                    <Tooltip title="Italic">
                                        <Button icon="italic" style={{ border: 'none' }} onClick={e => this.addMark(e, "*")} />
                                    </Tooltip>
                                    <Tooltip title="Strike Through">
                                        <Button icon="strikethrough" style={{ border: 'none' }} onClick={e => this.addMark(e, "~~")} />
                                    </Tooltip>
                                    <Divider type="vertical" />
                                    <Tooltip title="Link">
                                        <Button icon="link" style={{ border: 'none' }} onClick={() => this.setState({ linkDialogVisible: true })} />
                                    </Tooltip>
                                    <Tooltip title="Image">
                                        <Button icon="picture" style={{ border: 'none' }} onClick={() => this.setState({ imageDialogVisible: true })} />
                                    </Tooltip>
                                    <Tooltip title="Video">
                                        <Button icon="youtube" style={{ border: 'none' }} onClick={() => this.setState({ videoDialogVisible: true })} />
                                    </Tooltip>
                                    <Tooltip title="Latex">
                                        <Button icon="calculator" style={{ border: 'none' }} onClick={() => this.setState({ latexDialogVisible: true })} />
                                    </Tooltip>
                                    <Divider type="vertical" />
                                    <Tooltip title="Blockquote">
                                        <Button icon="message" style={{ border: 'none' }} onClick={e => this.addMark(e, "<blockquote>", "</blockquote>")} />
                                    </Tooltip>
                                    <Tooltip title="Code">
                                        <Button icon="code" style={{ border: 'none' }} onClick={e => this.addMark(e, "`")} />
                                    </Tooltip>
                                    <Divider type="vertical" />
                                </div>
                                <div>
                                    <Radio.Button checked={mode === 1}
                                        style={{ border: 'none' }}
                                    >
                                        <Tooltip title={`Preview ${mode === 0 ? "On" : "Off"}`} >
                                            <Icon type="eye" onClick={this.handleChangeMode} />
                                        </Tooltip>
                                    </Radio.Button>
                                </div>
                            </div>
                            <AceEditor
                                mode="markdown"
                                theme="solarized_light"
                                width={null}
                                height={'425px'}
                                onLoad={this.onLoad}
                                onChange={this.onChange}
                                onSelectionChange={this.onSelectionChange}
                                value={content}
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                wrapEnabled={true}
                                highlightActiveLine={true}
                                editorProps={{ $blockScrolling: true }}
                                style={{
                                    border: '1px solid #FFF',
                                    borderRadius: '0 0 10px 10px'
                                }}
                            />
                        </div>
                        <div
                            style={{
                                display: mode === 0 ? 'none' : 'block',
                                marginLeft: '1em',
                                width: '50%',
                                height: 460,
                                overflow: 'auto',
                                padding: '1em',
                                textAlign: 'left',
                                background: '#FFF',
                                ...rendererStyle
                            }}
                        >
                            <MarkdownRenderer source={this.state.content} />
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

RichMarkdownEditor.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    defaultMode: PropTypes.number,
    editorStyle: PropTypes.object,
    rendererStyle: PropTypes.object,
    style: PropTypes.object,
};

export default RichMarkdownEditor;