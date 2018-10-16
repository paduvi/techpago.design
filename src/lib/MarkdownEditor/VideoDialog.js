import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';

class VideoDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.urlInput = React.createRef();
    }

    preprocess = (e) => {
        const url = this.urlInput.current.input.value.trim();

        if (!url) {
            message.error('Chưa nhập link của video');
            return;
        }

        return this.handleCloseModel(e, `![{video}](${url})`);
    }

    handleCloseModel = (e, content) => {
        e.preventDefault();

        this.urlInput.current.input.value = "";
        this.props.closeModal(content);
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                title="Video Dialog"
                centered
                visible={visible}
                onOk={this.preprocess}
                onCancel={this.handleCloseModel}
            >
                <Input ref={this.urlInput} placeholder="URL" />
            </Modal>
        );
    }
}

VideoDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default VideoDialog;