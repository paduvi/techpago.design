import { Component, CSSProperties } from 'react';

export interface MarkdownEditorOptions {
    defaultValue?: string
    onchange?: (value: string) => void
    defaultMode?: number
    editorStyle?: CSSProperties
    rendererStyle?: CSSProperties
    style?: CSSProperties
}

export interface RichTextEditorOptions {
    defaultValue?: string
    onchange?: (value: string) => void
    placeholder?: string
    style?: CSSProperties
}

export interface LoadingScreenOptions {
    isModal?: boolean
    logo?: string
}

export interface NotFoundOptions {
    home?: string
}

export class MarkdownEditor extends Component<MarkdownEditorOptions, {}> { }
export class RichTextEditor extends Component<RichTextEditorOptions, {}> { }
export class LoadingScreen extends Component<LoadingScreenOptions, {}> { }
export class NotFound extends Component<NotFoundOptions, {}> { }