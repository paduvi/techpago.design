import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';

const { TextArea } = Input;

class LatexDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    preprocess = (e) => {
        const text = this.input.current.textAreaRef.value.trim();

        if (!text) {
            message.error("Chưa nhập đoạn mã latex");
            return;
        }

        return this.handleCloseModel(e, "$" + text + "$");
    }

    handleCloseModel = (e, content) => {
        e.preventDefault();

        this.input.current.textAreaRef.value = "";
        this.props.closeModal(content);
    }

    render() {
        const { visible } = this.props;
        return (
            <Modal
                title="Latex Dialog"
                centered
                visible={visible}
                onOk={this.preprocess}
                onCancel={this.handleCloseModel}
            >
                <TextArea ref={this.input} autosize={{ minRows: 2, maxRows: 6 }} />
            </Modal>
        );
    }
}

LatexDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default LatexDialog;