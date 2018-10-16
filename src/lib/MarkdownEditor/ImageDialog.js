import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Divider, message } from 'antd';

class ImageDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.altInput = React.createRef();
        this.urlInput = React.createRef();
    }

    preprocess = (e) => {
        const altText = this.altInput.current.input.value.trim();
        const url = this.urlInput.current.input.value.trim();

        if (!altText) {
            message.error('Chưa nhập đoạn text mô tả bức ảnh');
            return;
        }

        if (altText.startsWith("{video}")) {
            message.error(<>Không được sử dụng từ khóa <code>{'{video}'}</code> trong đoạn mô tả</>);
            return;
        }

        if (!url) {
            message.error('Chưa nhập link của bức ảnh');
            return;
        }

        return this.handleCloseModel(e, `![${altText}](${url})`);
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
                title="Image Dialog"
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

ImageDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ImageDialog;