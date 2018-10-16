import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Divider, message } from 'antd';

class LinkDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.altInput = React.createRef();
        this.urlInput = React.createRef();
    }

    preprocess = (e) => {
        const altText = this.altInput.current.input.value.trim();
        const url = this.urlInput.current.input.value.trim();

        if (!altText) {
            message.error('Chưa nhập đoạn text hiển thị');
            return;
        }

        if (!url) {
            message.error('Chưa nhập link');
            return;
        }

        return this.handleCloseModel(e, `[${altText}](${url})`);
    }


    handleCloseModel = (e, content) => {
        e.preventDefault();

        this.altInput.current.input.value = "";
        this.urlInput.current.input.value = "";
        this.props.closeModal(content);
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                title="Link Dialog"
                centered
                visible={visible}
                onOk={this.preprocess}
                onCancel={this.handleCloseModel}
            >
                <Input ref={this.urlInput} placeholder="URL" />
                <Divider style={{ visibility: "hidden" }} />
                <Input ref={this.altInput} placeholder="Alternate Text" />
            </Modal>
        );
    }
}

LinkDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default LinkDialog;